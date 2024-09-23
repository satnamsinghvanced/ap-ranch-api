import express from "express";
import upload from "../../../middleware/multer.js";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
import deleteFile from "../../helpers/deleteMedia.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { donate, partnerLogo, banner } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    // Insert into banner table
    const [bannerResult] = await connection.query(
      `INSERT INTO banners (bannerImage, logoImage, descriptions) VALUES (?, ?, ?)`,
      [banner.bannerImage, banner.logoImage, banner.descriptions]
    );
    const bannerId = bannerResult.insertId;

    // Insert associated partner logos
    for (const logo of partnerLogo) {
      await connection.query(
        `INSERT INTO partnerLogos (bannerId, logo) VALUES (?, ?)`,
        [bannerId, logo.logo]
      );
    }

    // Insert donate info
    await connection.query(
      `INSERT INTO donates (bannerId, text, buttonText, image) VALUES (?, ?, ?, ?)`,
      [bannerId, donate.text, donate.buttonText, donate.image]
    );
    await connection.commit();
    connection.release();
    console.log("Data inserted successfully");

    res.status(201).json({ message: "Data and images uploaded successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Fetch all banners
    const [banners] = await connection.query("SELECT * FROM banners");

    if (banners.length === 0) {
      connection.release();
      return res.status(404).json({ message: "No banners found" });
    }

    // Fetch all partner logos
    const [partnerLogos] = await connection.query("SELECT * FROM partnerLogos");

    // Fetch all donate information
    const [donates] = await connection.query("SELECT * FROM donates");

    connection.release();

    //Construct response object
    // const response = {
    //   banners,
    //   // services,
    //   partnerLogos,
    //   donates,
    // };
    const response = banners.map((banner) => {
      return {
        banner,
        // services: services.filter((service) => service.bannerId === banner.id),
        partnerLogos: partnerLogos.filter(
          (logo) => logo.bannerId === banner.id
        ),
        donate: donates.find((donate) => donate.bannerId === banner.id) || null, // assuming one-to-one relation for donate
      };
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.error("Error fetching data:", err);
  }
});

router.get("/detail", async (req, res) => {
  const { bannerId } = req.query;

  try {
    const connection = await pool.getConnection();

    // Fetch banner details
    const [bannerRows] = await connection.query(
      "SELECT * FROM banners WHERE id = ?",
      [bannerId]
    );

    if (bannerRows.length === 0) {
      connection.release();
      return res.status(404).json({ message: "Banner not found" });
    }

    const banner = bannerRows[0];

    // Fetch partner logos related to the banner
    const [partnerLogoRows] = await connection.query(
      "SELECT * FROM partnerLogos WHERE bannerId = ?",
      [bannerId]
    );

    // Fetch donate information
    const [donateRows] = await connection.query(
      "SELECT * FROM donates WHERE bannerId = ?",
      [bannerId]
    );

    connection.release();

    // Construct response object
    const response = {
      banner,
      // services: servicesRows,
      partnerLogo: partnerLogoRows,
      donate: donateRows.length > 0 ? donateRows[0] : null,
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.error("Error fetching data:", err);
  }
});

router.delete("/", auth, async (req, res) => {
  const { bannerId } = req.query;

  if (!bannerId) {
    return res.status(400).json({ msg: "Banner ID is required" });
  }
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [bannerData] = await connection.query(
      "SELECT * FROM banners WHERE id = ?",
      [bannerId]
    );
    if (bannerData.length === 0) {
      return res.status(200).json({ msg: "Banners Details not found" });
    }

    const filePath = bannerData[0].bannerImage;
    const logoPath = bannerData[0].logoImage;
    if (filePath) {
      await deleteFile(filePath);
    }
    if (logoPath) {
      await deleteFile(logoPath);
    }

    const [partnerLogoRows] = await connection.query(
      "SELECT * FROM partnerLogos WHERE bannerId = ?",
      [bannerId]
    );

    for (const logo of partnerLogoRows) {
      const filePath = logo.logo;
      await deleteFile(filePath);
    }

    const [donateRows] = await connection.query(
      "SELECT * FROM donates WHERE bannerId = ?",
      [bannerId]
    );
    const donateLogoPath = donateRows[0].image;

    if (donateLogoPath) {
      await deleteFile(donateLogoPath);
    }

    // Delete associated partner logos
    await connection.query("DELETE FROM partnerLogos WHERE bannerId = ?", [
      bannerId,
    ]);

    // Delete banner record
    await connection.query("DELETE FROM banners WHERE id = ?", [bannerId]);

    // Delete donate record
    await connection.query("DELETE FROM donates WHERE bannerId = ?", [
      bannerId,
    ]);
    await connection.commit();
    connection.release();

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.error("Error deleting record:", err);
  }
});

router.put("/", auth, async (req, res) => {
  const { bannerId } = req.query;
  if (!bannerId) {
    return res.status(400).json({ msg: "Banner ID is required" });
  }
  const { banner, partnerLogo, donate } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    const [bannerData] = await connection.query(
      "SELECT * FROM banners WHERE id = ?",
      [bannerId]
    );
    if (bannerData.length === 0) {
      return res.status(200).json({ msg: "Banners Details not found" });
    }

    const filePath = bannerData[0].bannerImage;
    const logoPath = bannerData[0].logoImage;
    if (filePath && filePath !== banner.bannerImage) {
      await deleteFile(filePath);
    }
    if (logoPath && logoPath !== banner.logoImage) {
      await deleteFile(logoPath);
    }

    const [partnerLogoRows] = await connection.query(
      "SELECT * FROM partnerLogos WHERE bannerId = ?",
      [bannerId]
    );

    const logoArray = partnerLogo.map((x) => x.logo);

    for (const logo of partnerLogoRows) {
      const filePath = logo.logo;
      if (!logoArray.includes(filePath)) {
        await deleteFile(filePath);
      }
    }

    const [donateRows] = await connection.query(
      "SELECT * FROM donates WHERE bannerId = ?",
      [bannerId]
    );
    const donateLogoPath = donateRows[0].image;

    if (donateLogoPath && donateLogoPath !== donate.image) {
      await deleteFile(donateLogoPath);
    }

    await connection.query(
      `UPDATE banners SET bannerImage = ?, logoImage = ?, descriptions = ? WHERE id = ?`,
      [banner.bannerImage, banner.logoImage, banner.descriptions, bannerId]
    );

    await connection.query("DELETE FROM partnerLogos WHERE bannerId = ?", [
      bannerId,
    ]);

    // Insert updated partner logos
    for (const logo of partnerLogo) {
      await connection.query(
        `INSERT INTO partnerLogos (bannerId, logo) VALUES (?, ?)`,
        [bannerId, logo.logo]
      );
    }

    // Update donate info
    await connection.query(
      `UPDATE donates SET text = ?, buttonText = ?, image = ? WHERE bannerId = ?`,
      [donate.text, donate.buttonText, donate.image, bannerId]
    );
    await connection.commit();
    connection.release();

    res.status(200).json({ message: "Record updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.error("Error updating record:", err);
  }
});

export default router;

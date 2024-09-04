import express from "express";
import { createTables } from "../../helpers/createTable.js";
import upload from "../../../middleware/multer.js";
import pool from "../../../db/index.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await createTables();
    const { donate, partnerLogo, banner } = req.body;
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    // Insert into banner table
    const [bannerResult] = await connection.query(
      `INSERT INTO banner (bannerImage, logoImage, descriptions) VALUES (?, ?, ?)`,
      [banner.bannerImage, banner.logoImage, banner.descriptions]
    );
    const bannerId = bannerResult.insertId;


    // Insert associated partner logos
    for (const logo of partnerLogo) {
      await connection.query(
        `INSERT INTO partnerLogo (bannerId, logo) VALUES (?, ?)`,
        [bannerId, logo.logo]
      );
    }

    // Insert donate info
    await connection.query(
      `INSERT INTO donate (bannerId, text, buttonText, image) VALUES (?, ?, ?, ?)`,
      [bannerId, donate.text, donate.buttonText, donate.image]
    );

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
    const [banners] = await connection.query("SELECT * FROM banner");

    if (banners.length === 0) {
      connection.release();
      return res.status(404).json({ message: "No banners found" });
    }

    // Fetch all partner logos
    const [partnerLogos] = await connection.query("SELECT * FROM partnerLogo");

    // Fetch all donate information
    const [donates] = await connection.query("SELECT * FROM donate");

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
      "SELECT * FROM banner WHERE id = ?",
      [bannerId]
    );

    if (bannerRows.length === 0) {
      connection.release();
      return res.status(404).json({ message: "Banner not found" });
    }

    const banner = bannerRows[0];


    // Fetch partner logos related to the banner
    const [partnerLogoRows] = await connection.query(
      "SELECT * FROM partnerLogo WHERE bannerId = ?",
      [bannerId]
    );

    // Fetch donate information
    const [donateRows] = await connection.query(
      "SELECT * FROM donate WHERE bannerId = ?",
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

router.delete("/", async (req, res) => {
  const { bannerId } = req.query;

  if (!bannerId) {
    return res.status(400).json({ msg: "Banner ID is required" });
  }
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    // Delete associated partner logos
    await connection.query("DELETE FROM partnerLogo WHERE bannerId = ?", [
      bannerId,
    ]);

    // Delete banner record
    await connection.query("DELETE FROM banner WHERE id = ?", [bannerId]);

    // Delete donate record
    await connection.query("DELETE FROM donate WHERE id = ?", [bannerId]);
    await connection.commit();
    connection.release();

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.error("Error deleting record:", err);
  }
});

router.put("/", async (req, res) => {
  const { bannerId } = req.query;
  if (!bannerId) {
    return res.status(400).json({ msg: "Banner ID is required" });
  }
  const { banner, partnerLogo, donate } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    // Update banner table
    await connection.query(
      `UPDATE banner SET bannerImage = ?, logoImage = ?, descriptions = ? WHERE id = ?`,
      [banner.bannerImage, banner.logoImage, banner.descriptions, bannerId]
    );

    await connection.query("DELETE FROM partnerLogo WHERE bannerId = ?", [
      bannerId,
    ]);

    // Insert updated partner logos
    for (const logo of partnerLogo) {
      await connection.query(
        `INSERT INTO partnerLogo (bannerId, logo) VALUES (?, ?)`,
        [bannerId, logo.logo]
      );
    }

    // Update donate info
    await connection.query(
      `UPDATE donate SET text = ?, buttonText = ?, image = ? WHERE id = ?`,
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

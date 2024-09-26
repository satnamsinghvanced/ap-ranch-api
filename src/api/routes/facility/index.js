import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
import deleteFile from "../../helpers/deleteMedia.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  let connection;
  try {
    const { name, image, facility } = req.body;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [facilityData] = await connection.query(
      `INSERT INTO facilities (name, image) VALUES (?, ?)`,
      [name, image]
    );
    const facilityId = facilityData.insertId;

    for (const facilityDetail of facility) {
      await connection.query(
        `INSERT INTO facilityDetails (facilityId, facilityName, facilityImage) VALUES (?, ?, ?)`,
        [facilityId, facilityDetail.facilityName, facilityDetail.facilityImage]
      );
    }
    await connection.commit();
    res.status(201).json({ message: "Data uploaded successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }finally {
    if (connection) connection.release();
  }
});

router.get("/", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [facilityData] = await connection.query("SELECT * FROM facilities");
    const [facilityDetails] = await connection.query(
      "SELECT * FROM facilityDetails"
    );
    const facility = facilityData.map((x) => {
      const facilityDetail = facilityDetails.filter(
        (val) => val.facilityId === x.id
      );
      return {
        ...x,
        facility: facilityDetail,
      };
    });
    res.status(200).json(facility);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }finally {
    if (connection) connection.release();
  }
});

router.put("/", auth, async (req, res) => {
  const { id } = req.query;
  const { name, image, facility } = req.body;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [facilityData] = await connection.query(
      "SELECT * FROM facilities WHERE id = ?",
      [id]
    );
    if (facilityData.length === 0) {
      return res.status(200).json({ msg: "Facility Details not found" });
    }
    const filePath = facilityData[0].image;
    if (filePath && filePath !== image) {
      await deleteFile(filePath);
    }

    const [facilityDetails] = await connection.query(
      "SELECT * FROM facilityDetails WHERE facilityId = ?",
      [id]
    );
    const imageArray = facility.map(
      (facilityItem) => facilityItem.facilityImage
    );
    for (const facilityItem of facilityDetails) {
      const filePath = facilityItem.facilityImage;
      if (!imageArray.includes(filePath)) {
        await deleteFile(filePath);
      }
    }

    // Update the facility data
    await connection.query(
      `UPDATE facilities SET name = ?, image = ? WHERE id = ?`,
      [name, image, id]
    );

    // Delete existing facility details for the given facilityId
    await connection.query(`DELETE FROM facilityDetails WHERE facilityId = ?`, [
      id,
    ]);

    // Insert updated facility details
    for (const facilityDetail of facility) {
      await connection.query(
        `INSERT INTO facilityDetails (facilityId, facilityName, facilityImage) VALUES (?, ?, ?)`,
        [id, facilityDetail.facilityName, facilityDetail.facilityImage]
      );
    }

    await connection.commit();
    res
      .status(200)
      .json({ message: "Facility and details updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }finally {
    if (connection) connection.release();
  }
});

router.delete("/", auth, async (req, res) => {
  const { id } = req.query; // Facility ID to delete
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [facilityData] = await connection.query(
      "SELECT * FROM facilities WHERE id = ?",
      [id]
    );
    if (facilityData.length === 0) {
      return res.status(200).json({ msg: "Facility Details not found" });
    }
    const filePath = facilityData[0].image;
    if (filePath) {
      await deleteFile(filePath);
    }
    const [facilityDetails] = await connection.query(
      "SELECT * FROM facilityDetails WHERE facilityId = ?",
      [id]
    );
    for (const facilityItem of facilityDetails) {
      const filePath = facilityItem.facilityImage;
      await deleteFile(filePath);
    }
    // Delete the facility details first to avoid foreign key constraint issues
    await connection.query(`DELETE FROM facilityDetails WHERE facilityId = ?`, [
      id,
    ]);

    // Delete the facility itself
    await connection.query(`DELETE FROM facilities WHERE id = ?`, [id]);

    await connection.commit();
    res
      .status(200)
      .json({ message: "Facility and details deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }finally {
    if (connection) connection.release();
  }
});

export default router;

import express from "express";
import pool from "../../../db/index.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, image, facility } = req.body;
    const connection = await pool.getConnection();
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
    connection.release();
    res.status(201).json({ message: "Data uploaded successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
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
    connection.release();
    res.status(200).json(facility);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.put("/", async (req, res) => {
  const { id } = req.query;
  const { name, image, facility } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

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
    connection.release();
    res
      .status(200)
      .json({ message: "Facility and details updated successfully" });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.query; // Facility ID to delete

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    // Delete the facility details first to avoid foreign key constraint issues
    await connection.query(`DELETE FROM facilityDetails WHERE facilityId = ?`, [
      id,
    ]);

    // Delete the facility itself
    await connection.query(`DELETE FROM facilities WHERE id = ?`, [id]);

    await connection.commit();
    connection.release();
    res
      .status(200)
      .json({ message: "Facility and details deleted successfully" });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }
});

export default router;

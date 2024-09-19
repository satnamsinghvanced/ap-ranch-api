import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  let connection;
  try {
    const { footerLogo, footerTxt, links } = req.body;
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [result] = await connection.query(
      `INSERT INTO footers (footerLogo, footerTxt) VALUES (?, ?)`,
      [footerLogo, footerTxt]
    );
    const footerId = result.insertId;

    for (const { logo, link } of links) {
      await connection.query(
        `INSERT INTO mediaLinks (footerId, logo, link) VALUES (?, ?, ?)`,
        [footerId, logo, link]
      );
    }

    await connection.commit();
    res.status(201).json({ message: "Footer details is submitted" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  } finally {
    if (connection) connection.release();
  }
});

router.get("/", auth, async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [footers] = await connection.query(`SELECT * FROM footers`);
    const [mediaLinks] = await connection.query(`SELECT * FROM mediaLinks`);

    const footerData = footers.map((footer) => {
      return {
        ...footer,
        mediaLinks: mediaLinks.filter((link) => link.footerId === footer.id),
      };
    });

    res.status(200).json(footerData);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
});

router.put("/", auth, async (req, res) => {
  let connection;
  try {
    const { id } = req.query;
    const { footerLogo, footerTxt, links } = req.body;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Update footer details
    await connection.query(
      `UPDATE footers SET footerLogo = ?, footerTxt = ? WHERE id = ?`,
      [footerLogo, footerTxt, id]
    );

    // Delete existing media links for this footer
    await connection.query(`DELETE FROM mediaLinks WHERE footerId = ?`, [id]);

    // Insert updated media links
    for (const { logo, link } of links) {
      await connection.query(
        `INSERT INTO mediaLinks (footerId, logo, link) VALUES (?, ?, ?)`,
        [id, logo, link]
      );
    }

    await connection.commit();
    res
      .status(200)
      .json({ message: "Footer and media links updated successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
});

router.delete("/", auth, async (req, res) => {
  let connection;
  try {
    const { id } = req.query;

    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Delete media links first (since they depend on the footer)
    await connection.query(`DELETE FROM mediaLinks WHERE footerId = ?`, [id]);

    // Delete the footer
    const [result] = await connection.query(
      `DELETE FROM footers WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Footer not found" });
    }

    await connection.commit();
    res
      .status(200)
      .json({ message: "Footer and media links deleted successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
    console.error(err);
  } finally {
    if (connection) connection.release();
  }
});

export default router;

import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
import deleteFile from "../../helpers/deleteMedia.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  let connection;
  try {
    const { image, name, descriptions, role, sortIndex } = req.body;
    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [existingEntries] = await connection.query(
      `SELECT * FROM teams WHERE sortIndex  >= ? ORDER BY sortIndex  ASC`,
      [sortIndex]
    );
    if (existingEntries.length > 0) {
      // Increment the index of all entries with this index or higher
      for (let i = 0; i < existingEntries.length; i++) {
        const newIndex = existingEntries[i].sortIndex + 1;
        await connection.query(`UPDATE teams SET sortIndex  = ? WHERE id = ?`, [
          newIndex,
          existingEntries[i].id,
        ]);
      }
    }
    const [team] = await connection.query(
      `INSERT INTO teams (image, name, descriptions,role,sortIndex) VALUES (?, ?, ?, ?, ?)`,
      [image, name, descriptions, role, sortIndex]
    );
    await connection.commit();
    res.status(201).json({ message: "Team member added successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

router.get("/", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [teamMembers] = await connection.query(
      "SELECT * FROM teams ORDER BY sortIndex ASC"
    );
    res.status(200).json(teamMembers);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.log(err);
  }finally {
    if (connection) connection.release();
  }
});
router.get("/detail", async (req, res) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();
    const [teamMember] = await connection.query(
      "SELECT * FROM teams WHERE id = ?",
      [id]
    );

    if (teamMember.length === 0) {
      return res.status(404).json({ msg: "Team member not found" });
    }

    res.status(200).json(teamMember[0]);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});
router.put("/", auth, async (req, res) => {
  const { id } = req.query;
  const { image, name, descriptions, role } = req.body;
  let connection;
  // Check if the required fields are present
  if (!image || !name || !descriptions || !role) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [teamMember] = await connection.query(
      "SELECT * FROM teams WHERE id = ?",
      [id]
    );

    if (teamMember.length === 0) {
      return res.status(200).json({ msg: "Team member not found" });
    }

    const filePath = teamMember[0].image;
    if (filePath && filePath !== image) {
      await deleteFile(filePath);
    }

    const [result] = await connection.query(
      `UPDATE teams SET image = ?, name = ?, descriptions = ?, role = ? WHERE id = ?`,
      [image, name, descriptions, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Team member not found" });
    }

    await connection.commit();

    res.status(200).json({ message: "Team member updated successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

router.put("/update-index", auth, async (req, res) => {
  let connection;
  try {
    const { id } = req.query;
    const { currentIndex, newIndex } = req.body;

    if (currentIndex === undefined || newIndex === undefined || !id) {
      return res.status(400).json({ msg: "Invalid input" });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    if (currentIndex < newIndex) {
      // Shift entries between currentIndex and newIndex up by 1
      await connection.query(
        `UPDATE teams SET sortIndex = sortIndex - 1 WHERE sortIndex > ? AND sortIndex <= ?`,
        [currentIndex, newIndex]
      );
    } else if (currentIndex > newIndex) {
      // Shift entries between newIndex and currentIndex down by 1
      await connection.query(
        `UPDATE teams SET sortIndex = sortIndex + 1 WHERE sortIndex >= ? AND sortIndex < ?`,
        [newIndex, currentIndex]
      );
    }

    // Update the index of the specific entry
    await connection.query(`UPDATE teams SET sortIndex = ? WHERE id = ?`, [
      newIndex,
      id,
    ]);

    await connection.commit();
    res.status(200).json({ message: "Index updated successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
  } finally {
    if (connection) connection.release();
  }
});

// router.delete("/", auth, async (req, res) => {
//   const { id } = req.query;

//   try {
//     const connection = await pool.getConnection();
//     await connection.beginTransaction();

//     const [result] = await connection.query("DELETE FROM teams WHERE id = ?", [
//       id,
//     ]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ msg: "Team member not found" });
//     }

//     await connection.commit();
//     connection.release();

//     res.status(200).json({ message: "Team member deleted successfully" });
//   } catch (err) {
//     if (connection) await connection.rollback();
//     res.status(500).json({ msg: "Server error" });
//     console.log(err);
//   }
// });
router.delete("/", auth, async (req, res) => {
  const { id } = req.query;

  let connection;
  try {
    if (!id) {
      return res.status(400).json({ msg: "Invalid request, id is required" });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [teamMember] = await connection.query(
      "SELECT * FROM teams WHERE id = ?",
      [id]
    );

    if (teamMember.length === 0) {
      return res.status(200).json({ msg: "Team member not found" });
    }

    const filePath = teamMember[0].image;
    if (filePath) {
      await deleteFile(filePath);
    }

    // Get the current index of the team member to be deleted
    const [result] = await connection.query(
      "SELECT sortIndex FROM teams WHERE id = ?",
      [id]
    );

    if (result.length === 0) {
      await connection.rollback();
      return res.status(404).json({ msg: "Team member not found" });
    }

    const { sortIndex } = result[0];

    // Delete the team member
    await connection.query("DELETE FROM teams WHERE id = ?", [id]);

    // Update the sortIndex of remaining team members
    await connection.query(
      "UPDATE teams SET sortIndex = sortIndex - 1 WHERE sortIndex > ?",
      [sortIndex]
    );

    await connection.commit();
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (err) {
    if (connection) await connection.rollback();
    res.status(500).json({ msg: "Server error" });
  } finally {
    if (connection) connection.release();
  }
});

export default router;

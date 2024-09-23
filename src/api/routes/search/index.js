import express from "express";
import pool from "../../../db/index.js";
const router = express.Router();

router.post("/", async (req, res) => {
  let connection;
  try {
    const { searchTerm } = req.body;
    connection = await pool.getConnection();

    const wildcardSearchTerm = `%${searchTerm}%`;

    const [tables] = await connection.query("SHOW TABLES");

    let results = [];

    if (!searchTerm || searchTerm.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search term cannot be empty.",
      });
    }
    for (let table of tables) {
      const tableName = Object.values(table)[0];

      const [columns] = await connection.query(
        `SHOW COLUMNS FROM \`${tableName}\``
      );

      for (let column of columns) {
        const columnName = column.Field;

        const [rows] = await connection.query(
          `SELECT * FROM \`${tableName}\` WHERE \`${columnName}\` LIKE ? LIMIT 1`,
          [wildcardSearchTerm]
        );

        if (rows.length > 0 && rows[0].hasOwnProperty("page_name")) {
          results.push({
            tableName: tableName,
            id: rows[0]["id"],
            page_name: rows[0]["page_name"],
            content: rows[0][columnName],
          });
          break;
        }
      }
    }
    if (results.length > 0) {
      res.status(200).json({ success: true, data: results });
    } else {
      res
        .status(404)
        .json({ success: false, message: "No matching records found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    if (connection) connection.release();
  }
});
export default router;

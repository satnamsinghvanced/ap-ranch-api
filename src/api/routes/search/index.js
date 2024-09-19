import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
const router = express.Router();

router.post("/", async (req, res) => {
  let connection;
  try {
    const { searchTerm } = req.body;
    connection = await pool.getConnection();

    const wildcardSearchTerm = `%${searchTerm}%`;

    const teamQuery = `
        SELECT 'teams' AS source, id, name, role, descriptions, image, sortIndex, created_at 
        FROM teams 
        WHERE name LIKE ? 
        OR role LIKE ? 
        OR descriptions LIKE ? 
        ORDER BY sortIndex`;

    const bannerQuery = `
        SELECT 'banners' AS source, id, bannerImage, logoImage, descriptions, created_at,page_name 
        FROM banners 
        WHERE descriptions LIKE ?`;

    const [teamResults, bannerResults] = await Promise.all([
      connection.query(teamQuery, [
        wildcardSearchTerm,
        wildcardSearchTerm,
        wildcardSearchTerm,
      ]),
      connection.query(bannerQuery, [wildcardSearchTerm]),
    ]);

    const results = [...teamResults[0], ...bannerResults[0]];

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

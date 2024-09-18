import express from "express";
import cors from "cors";
import routes from "./src/api/routes/index.js";
import cookieParser from "cookie-parser";
import config from "./config.js";
import path from "path";
import { fileURLToPath } from "url";
//import "./src/db/index.js";
import pool from "./src/db/index.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let { PRODUCTION_PORT } = config;
const PORT = PRODUCTION_PORT || 9000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/api/testing", async (req, res) => {
  res.send("Working 0.1");
});

app.use("/api", routes);

app.use("/public", express.static("./public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/pdf", express.static(path.join(__dirname, "pdf")));
pool
  .query("SELECT 1")
  .then(() => {
    console.log("Connected to MySQL");
    app.listen(PORT, () => {
      console.log("Server is running..." + PORT);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to MySQL:", error.message);
    process.exit(1);
  });

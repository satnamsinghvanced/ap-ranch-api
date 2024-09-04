import express from "express";
// import home from "./home/index.js";
import contact from "./contactUs/index.js";
// import service from "./services/index.js";
const router = express.Router();
// router.use("/home", home);
router.use("/contact", contact);
// router.use("/service", service);
export default router;

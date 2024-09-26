import express from "express";
import pool from "../../../db/index.js";
import auth from "../../../middleware/auth.js";
import deleteFile from "../../helpers/deleteMedia.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  let connection;
  try {
    const {
      servicesImage,
      servicesName,
      serviceDescriptions,
      images,
      providedServices,
    } = req.body;

    connection = await pool.getConnection();
    await connection.beginTransaction();
    const [serviceResult] = await connection.query(
      `INSERT INTO services (serviceDescriptions, servicesImage, servicesName) VALUES (?, ?, ?)`,
      [serviceDescriptions, servicesImage, servicesName]
    );
    const serviceId = serviceResult.insertId;

    // Insert associated images
    for (const image of images) {
      await connection.query(
        `INSERT INTO serviceImages (serviceId, image) VALUES (?, ?)`,
        [serviceId, image]
      );
    }

    // Insert associated services provided
    for (const serviceProvided of providedServices) {
      await connection.query(
        `INSERT INTO serviceProvided (serviceId, title, descriptions) VALUES (?, ?, ?)`,
        [serviceId, serviceProvided.title, serviceProvided.descriptions]
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
    const [services] = await connection.query("SELECT * FROM services");
    const [images] = await connection.query("SELECT * FROM serviceImages");
    const [providedServices] = await connection.query(
      "SELECT * FROM serviceProvided"
    );

    // Group images and provided services by serviceId
    const servicesWithDetails = services.map((service) => {
      const serviceImages = images.filter(
        (img) => img.serviceId === service.id
      );
      const serviceProvidedDetails = providedServices.filter(
        (providedService) => providedService.serviceId === service.id
      );

      return {
        service,
        images: serviceImages,
        providedServices: serviceProvidedDetails,
      };
    });
    res.status(200).json(servicesWithDetails);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

router.get("/detail", async (req, res) => {
  const { serviceId } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();

    // Fetch the specific service by ID
    const [service] = await connection.query(
      "SELECT * FROM services WHERE id = ?",
      [serviceId]
    );

    if (service.length === 0) {
      return res.status(404).json({ msg: "Service not found" });
    }

    // Fetch related images and provided services for the specific service
    const [images] = await connection.query(
      "SELECT * FROM serviceImages WHERE serviceId = ?",
      [serviceId]
    );

    const [providedServices] = await connection.query(
      "SELECT * FROM serviceProvided WHERE serviceId = ?",
      [serviceId]
    );

    // Construct the response object
    const serviceWithDetails = {
      ...service[0], // Since `service` is an array with one element
      images,
      providedServices,
    };

    res.status(200).json(serviceWithDetails);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

router.put("/", auth, async (req, res) => {
  const { serviceId } = req.query;
  let connection;
  const {
    servicesImage,
    servicesName,
    serviceDescriptions,
    images,
    providedServices,
  } = req.body;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [service] = await connection.query(
      "SELECT * FROM services WHERE id = ?",
      [serviceId]
    );

    if (service.length === 0) {
      return res.status(200).json({ msg: "Service not found" });
    }

    const filePath = service[0].servicesImage;
    if (filePath && filePath !== servicesImage) {
      await deleteFile(filePath);
    }

    // Fetch related images and provided services for the specific service
    const [serviceImages] = await connection.query(
      "SELECT * FROM serviceImages WHERE serviceId = ?",
      [serviceId]
    );

    for (const serviceImage of serviceImages) {
      if (!images.includes(serviceImage.image)) {
        await deleteFile(serviceImage.image);
      }
    }

    // Update the main service details
    await connection.query(
      `UPDATE services SET servicesImage = ?, servicesName = ?, serviceDescriptions = ? WHERE id = ?`,
      [servicesImage, servicesName, serviceDescriptions, serviceId]
    );

    // Delete old images and provided services
    await connection.query(`DELETE FROM serviceImages WHERE serviceId = ?`, [
      serviceId,
    ]);
    await connection.query(`DELETE FROM serviceProvided WHERE serviceId = ?`, [
      serviceId,
    ]);

    // Insert updated images
    for (const image of images) {
      await connection.query(
        `INSERT INTO serviceImages (serviceId, image) VALUES (?, ?)`,
        [serviceId, image]
      );
    }

    // Insert updated provided services
    for (const serviceProvided of providedServices) {
      await connection.query(
        `INSERT INTO serviceProvided (serviceId, title, descriptions) VALUES (?, ?, ?)`,
        [serviceId, serviceProvided.title, serviceProvided.descriptions]
      );
    }

    await connection.commit();
    res.status(200).json({ message: "Data updated successfully" });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

router.delete("/", auth, async (req, res) => {
  const { serviceId } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [service] = await connection.query(
      "SELECT * FROM services WHERE id = ?",
      [serviceId]
    );

    if (service.length === 0) {
      return res.status(200).json({ msg: "Service not found" });
    }

    const filePath = service[0].servicesImage;
    if (filePath) {
      await deleteFile(filePath);
    }

    // Fetch related images and provided services for the specific service
    const [serviceImages] = await connection.query(
      "SELECT * FROM serviceImages WHERE serviceId = ?",
      [serviceId]
    );

    for (const serviceImage of serviceImages) {
      await deleteFile(serviceImage.image);
    }

    // Delete associated images
    await connection.query(`DELETE FROM serviceImages WHERE serviceId = ?`, [
      serviceId,
    ]);

    // Delete associated provided services
    await connection.query(`DELETE FROM serviceProvided WHERE serviceId = ?`, [
      serviceId,
    ]);

    // Delete the main service record
    await connection.query(`DELETE FROM services WHERE id = ?`, [serviceId]);

    await connection.commit();
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ msg: "Server error" });
  }finally {
    if (connection) connection.release();
  }
});

export default router;

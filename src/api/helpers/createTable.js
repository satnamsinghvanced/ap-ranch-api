import pool from "../../db/index.js";
const createBannerTable = `
CREATE TABLE IF NOT EXISTS banner (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bannerImage VARCHAR(255),
  logoImage VARCHAR(255),
  descriptions TEXT
);
`;

// Create services table
const createServicesTable = `
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  servicesImage VARCHAR(255),
  servicesName VARCHAR(255),
  serviceDescriptions TEXT
);
`;

// Create services table image
const createServicesImageTable = `
CREATE TABLE IF NOT EXISTS serviceImages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serviceId INT,
  image VARCHAR(255),
  FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE
);
`;

// Create provided services table
const createProvidedServicedTable = `
CREATE TABLE IF NOT EXISTS serviceProvided (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serviceId INT,
  title VARCHAR(255),
  descriptions TEXT,
  FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE
);
`;

// Create partnerLogo table
const createPartnerLogoTable = `
CREATE TABLE IF NOT EXISTS partnerLogo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bannerId INT,
  logo VARCHAR(255),
  FOREIGN KEY (bannerId) REFERENCES banner(id) ON DELETE CASCADE
);
`;

// Create donate table
const createDonateTable = `
CREATE TABLE IF NOT EXISTS donate (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bannerId INT,
  text TEXT,
  buttonText VARCHAR(255),
  image VARCHAR(255),
  FOREIGN KEY (bannerId) REFERENCES banner(id) ON DELETE CASCADE
);`;

const createContactForm = `
CREATE TABLE IF NOT EXISTS contactForm (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  reason VARCHAR(255) NOT NULL,
  comments TEXT NOT NULL
);
`;

export const createTables = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(createBannerTable);
    await connection.query(createServicesTable);
    await connection.query(createPartnerLogoTable);
    await connection.query(createDonateTable);
    await connection.query(createServicesImageTable);
    await connection.query(createProvidedServicedTable);
    await connection.query(createContactForm);
    connection.release();
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err.message);
  }
};

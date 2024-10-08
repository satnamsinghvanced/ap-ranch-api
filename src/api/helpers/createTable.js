import pool from "../../db/index.js";
const createBannerTable = `
CREATE TABLE IF NOT EXISTS banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bannerImage VARCHAR(255),
  logoImage VARCHAR(255),
  descriptions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

// Create services table
const createServicesTable = `
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  servicesImage VARCHAR(255),
  servicesName VARCHAR(255),
  serviceDescriptions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

// Create services table image
const createServicesImageTable = `
CREATE TABLE IF NOT EXISTS serviceImages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serviceId INT,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE
);
`;

// Create partnerLogo table
const createPartnerLogoTable = `
CREATE TABLE IF NOT EXISTS partnerLogos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bannerId INT,
  logo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (bannerId) REFERENCES banners(id) ON DELETE CASCADE
);
`;

// Create donate table
const createDonateTable = `
CREATE TABLE IF NOT EXISTS donates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bannerId INT,
  text TEXT,
  buttonText VARCHAR(255),
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (bannerId) REFERENCES banners(id) ON DELETE CASCADE
);`;

//Create contact form
const createContactForm = `
CREATE TABLE IF NOT EXISTS contactForms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phoneNumber VARCHAR(20) NOT NULL,
  reason VARCHAR(255) NOT NULL,
  comments TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createContactDetailForm = `
CREATE TABLE IF NOT EXISTS contactDetailForms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description TEXT,
  contact TEXT,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

// Create facility table
const createFacilityTable = `
CREATE TABLE IF NOT EXISTS facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255),
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

// Create facility detail table
const createFacilityDetailTable = `
CREATE TABLE IF NOT EXISTS facilityDetails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  facilityId INT,
  facilityImage VARCHAR(255),
  facilityName VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (facilityId) REFERENCES facilities(id) ON DELETE CASCADE
);
`;

// Create team table
const createTheTeamTable = `
CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255),
  name VARCHAR(255),
  descriptions TEXT,
  role VARCHAR(255),
  sortIndex  INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

// Create about table
const createAboutTable = `
CREATE TABLE IF NOT EXISTS abouts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255),
  name VARCHAR(255),
  descriptions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;
const createAuthTable = `
CREATE TABLE IF NOT EXISTS auth (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createPaymentTable = `
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paymentId VARCHAR(255) NOT NULL,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  state VARCHAR(100),
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createCustomerTable = `
CREATE TABLE IF NOT EXISTS customers (
 id INT AUTO_INCREMENT PRIMARY KEY,
 firstName VARCHAR(255) NOT NULL,
 lastName VARCHAR(255) NOT NULL,
 state VARCHAR(100) NOT NULL,
 postalCode VARCHAR(20) NOT NULL,
 country VARCHAR(10) DEFAULT 'US',
 givenName VARCHAR(255) AS (CONCAT(firstName, ' ', lastName)) STORED,
 email VARCHAR(255) NOT NULL,
 phone VARCHAR(20) NOT NULL,
 customerId VARCHAR(255) NOT NULL,
 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`;

const createIndemnityAgreementTable = `
CREATE TABLE IF NOT EXISTS indemnityAgreements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    activity VARCHAR(255) NOT NULL,
    courseNumber VARCHAR(50) NOT NULL,
    instructor VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    semester VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dateSigned DATE NOT NULL,
    sign VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createParentsAgreementTable = `
CREATE TABLE IF NOT EXISTS parentsAgreements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ageDivision VARCHAR(255) NOT NULL,
    dateSigned DATE NOT NULL,
    sign VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createCollaborateTable = `
CREATE TABLE IF NOT EXISTS collaborates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    descriptions TEXT,
    headerImage VARCHAR(255),
    image VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createFormTable = `
CREATE TABLE IF NOT EXISTS forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createFormButtonTable = `
CREATE TABLE IF NOT EXISTS formsButtons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buttonTxt VARCHAR(255) NOT NULL,
    link TEXT,
    formId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (formId) REFERENCES forms(id) ON DELETE CASCADE
);
`;

const createFormButtonStatusTable = `
CREATE TABLE IF NOT EXISTS formsButtonStatus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    buttonTxt VARCHAR(255) NOT NULL,
    hidden BOOLEAN DEFAULT FALSE,
    formId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (formId) REFERENCES forms(id) ON DELETE CASCADE
);
`;

const createMissionTable = `
CREATE TABLE IF NOT EXISTS missions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createHeaderTable = `
CREATE TABLE IF NOT EXISTS headers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    headerLogo VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createFooterTable = `
CREATE TABLE IF NOT EXISTS footers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    footerLogo VARCHAR(255),
    footerTxt TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

const createMediaLinkTable = `
CREATE TABLE IF NOT EXISTS mediaLinks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logo VARCHAR(255),
    footerId INT,
    link TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (footerId) REFERENCES footers(id) ON DELETE CASCADE
    );
`;

const createDonateTabTable = `
CREATE TABLE IF NOT EXISTS donateTabs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logo VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
    await connection.query(createFacilityTable);
    await connection.query(createFacilityDetailTable);
    await connection.query(createTheTeamTable);
    await connection.query(createAboutTable);
    await connection.query(createAuthTable);
    await connection.query(createPaymentTable);
    await connection.query(createCustomerTable);
    await connection.query(createIndemnityAgreementTable);
    await connection.query(createParentsAgreementTable);
    await connection.query(createCollaborateTable);
    await connection.query(createContactDetailForm);
    await connection.query(createFormTable);
    await connection.query(createFormButtonTable);
    await connection.query(createMissionTable);
    await connection.query(createHeaderTable);
    await connection.query(createFooterTable);
    await connection.query(createMediaLinkTable);
    await connection.query(createDonateTabTable);
    await connection.query(createFormButtonStatusTable);
    connection.release();
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err.message);
  }
};

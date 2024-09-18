import dotenv from "dotenv";
dotenv.config();
const {
  PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  DB_PORT,
  EMAIL,
  PASSWORD,
  JWT_SECRET,
  SQUARE_ACCESS_TOKEN,
  LOCATION_ID,
  CLIENT_EMAIL,
  SQUARE_ENV,
} = process.env;

export default {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  PRODUCTION_PORT: PORT,
  DB_PORT,
  EMAIL,
  PASSWORD,
  JWT_SECRET,
  SQUARE_ACCESS_TOKEN,
  LOCATION_ID,
  CLIENT_EMAIL,
  SQUARE_ENV,
};

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
};

import "dotenv/config";
import { Sequelize } from "sequelize";


const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;


const sequelize = new Sequelize({
    dialect: "oracle",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    //   port: process.env.DB_PORT,
  });

export default sequelize;

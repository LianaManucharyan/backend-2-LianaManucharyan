import { config } from "dotenv";

config();

export const CONFIG = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/App-liana",
  MAIL: {
    USER: process.env.NODEMAILER_USER,
    PASSWORD: process.env.NODEMAILER_PASSWORD,
    HOST: process.env.NODEMAILER_HOST,
    PORT: process.env.NODEMAILER_PORT,
    FROM: process.env.NODEMAILER_FROM,
  },
};
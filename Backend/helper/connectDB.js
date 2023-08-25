import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  idleTimeout: 60000,
});

const heartBeat = () => {
  pool.query("SELECT 1", (err) => {
    if (err) console.error("Error while HeartBeat: ", err);
  });
};

// call heartBeat every 30 sec
setInterval(heartBeat, 30000);

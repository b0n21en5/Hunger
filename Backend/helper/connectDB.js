import mysql from "mysql";

export const connectDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hunger",
});

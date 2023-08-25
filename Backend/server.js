import express from "express";
import { connectDB } from "./helper/connectDB.js";
import cors from "cors";
import compression from "compression";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

import authRoute from "./routes/authRoutes.js";
import foodRoute from "./routes/foodRoutes.js";
import restaurantsRoute from "./routes/restaurantsRoutes.js";
import collectionsRoute from "./routes/collectionRoute.js";
import { searchData } from "./controller/searchController.js";
import recommendedRoute from "./routes/recommendedRoute.js";
import cuisinesRoute from "./routes/cuisinesRoute.js";
import brandsRoute from "./routes/brandsRoute.js";

dotenv.config();

const app = express();

const __pathname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__pathname);

connectDB.connect((error) => {
  if (error) console.log(error);
  else console.log("Database Connected!");
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(compression());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/foods", foodRoute);
app.use("/api/restaurants", restaurantsRoute);
app.use("/api/collections", collectionsRoute);
app.use("/api/search", searchData);
app.use("/api/recommended", recommendedRoute);
app.use("/api/cuisines", cuisinesRoute);
app.use("/api/brands", brandsRoute);

app.use(
  express.static(path.join(__dirname, "../Frontend/dist"), { maxAge: "7d" })
);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

app.listen(process.env.PORT, () => {});

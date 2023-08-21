import express from "express";
import { connectDB } from "./helper/connectDB.js";
import cors from "cors";

import authRoute from "./routes/authRoutes.js";
import foodRoute from "./routes/foodRoutes.js";
import restaurantsRoute from "./routes/restaurantsRoutes.js";
import collectionsRoute from "./routes/collectionRoute.js";
import { searchData } from "./controller/searchController.js";

const app = express();

connectDB.connect((error) => {
  if (error) throw error;

  console.log("Database Connected!");
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/foods", foodRoute);
app.use("/api/restaurants", restaurantsRoute);
app.use("/api/collections", collectionsRoute);
app.use("/api/search", searchData);

app.listen(4000, () => {
  console.log("Server is listening on Port 4000");
});

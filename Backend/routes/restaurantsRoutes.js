import express from "express";
import {
  addNewRestaurant,
  getRestaurantsByType,
} from "../controller/restaurantsController.js";

const router = express.Router();

// Add new restaurant
router.post("/add-new-restaurant", addNewRestaurant);

// Get filtered restaurants by type
router.get("", getRestaurantsByType);

export default router;

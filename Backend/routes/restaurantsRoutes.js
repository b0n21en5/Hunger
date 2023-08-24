import express from "express";
import {
  addNewRestaurant,
  getRestaurantsController,
} from "../controller/restaurantsController.js";

const router = express.Router();

// Add new restaurant
router.post("/add-new-restaurant", addNewRestaurant);

// Get filtered restaurants by type
router.get("", getRestaurantsController);

export default router;

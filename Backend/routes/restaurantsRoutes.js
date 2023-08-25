import express from "express";
import {
  addNewRestaurant,
  deleteRestaurants,
  getRestaurantsController,
  updateRestaurants,
} from "../controller/restaurantsController.js";

const router = express.Router();

// Add new restaurant
router.post("/add-new-restaurant", addNewRestaurant);

// Get filtered restaurants by type
router.get("", getRestaurantsController);

// Update restaurants route
router.put("/:id", updateRestaurants);

// DELETE restaurants route
router.delete("/:id", deleteRestaurants);

export default router;

import express from "express";
import {
  addNewFood,
  deleteFood,
  getFoodsController,
  updateFood,
} from "../controller/foodsController.js";

const router = express.Router();

// add new food route
router.post("/add-new-food", addNewFood);

// Get filtered foods route by query
router.get("", getFoodsController);

// Update food route
router.put("/:id", updateFood);

// DELETE Food route
router.delete("/:id", deleteFood);

export default router;

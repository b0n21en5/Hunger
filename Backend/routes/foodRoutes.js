import express from "express";
import { addNewFood, getFoodsByType } from "../controller/foodsController.js";

const router = express.Router();

// add new food route
router.post("/add-new-food", addNewFood);

// Get filtered foods route by query
router.get("", getFoodsByType);

export default router;
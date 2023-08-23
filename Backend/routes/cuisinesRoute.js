import express from "express";
import {
  addNewCuisine,
  getAllCuisines,
} from "../controller/cuisinesController.js";

const router = express.Router();

// Add new cuisines route
router.post("/add-new", addNewCuisine);

// get all cuisines route
router.get("/get-all", getAllCuisines);

export default router;

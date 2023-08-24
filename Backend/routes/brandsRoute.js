import express from "express";
import { addNewBrand, getAllBrands } from "../controller/brandsController.js";

const router = express.Router();

// Add new cuisines route
router.post("/add-new", addNewBrand);

// get all cuisines route
router.get("/get-all", getAllBrands);

export default router;

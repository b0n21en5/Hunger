import express from "express";
import {
  addRecommendedFoods,
  getAllTypes,
  getRecommendedFoods,
} from "../controller/recommendedFoodsController.js";

const router = express.Router();

router.post("/add-new", addRecommendedFoods);

router.get("/all", getRecommendedFoods);

router.get("/types", getAllTypes);

export default router;

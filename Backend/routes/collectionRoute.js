import express from "express";
import {
  addNewCollection,
  getCollection,
} from "../controller/collectionController.js";

const router = express.Router();

// Add new collection
router.post("/add-new-collection", addNewCollection);

router.get("", getCollection);

export default router;

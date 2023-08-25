import slugify from "slugify";
import { queryPromise } from "../helper/queryPromise.js";

export const addNewCollection = async (req, res) => {
  const { title, places, imgSrc, description } = req.body;

  if (!title) {
    return res.status(404).send("Title is required!");
  }
  if (!places) {
    return res.status(404).send("No of places is required!");
  }

  // Check if already added
  const existCollQry = `SELECT * FROM collections WHERE title= ?`;
  try {
    const existingColl = await queryPromise(existCollQry, [title]);
    if (existingColl.length) {
      return res.status(200).send("Collection is already added");
    }
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }

  const slug = slugify(title);
  const newCollQry =
    "INSERT INTO collections (title,slug,places,imgSrc,description) VALUES (?,?,?,?,?)";
  try {
    const newCollection = await queryPromise(newCollQry, [
      title,
      slug,
      places,
      imgSrc,
      description,
    ]);
    return res.status(200).send(`Affected Rows: ${newCollection.affectedRows}`);
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

export const getCollection = async (req, res) => {
  let getQry = "SELECT * FROM collections";

  const slug = req.query.slug;
  if (slug) {
    getQry += ` WHERE slug= ?`;
  }

  try {
    const collections = await queryPromise(getQry, [slug]);
    if (collections.length) {
      return res.status(200).send(collections);
    }
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

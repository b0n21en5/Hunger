import slugify from "slugify";
import { queryPromise } from "../helper/queryPromise.js";

export const addNewFood = async (req, res) => {
  const { title, rating, price, type, imgSrc } = req.body;
  const slug = slugify(title);

  if (!title) return res.status(500).send("Name is required");
  if (!rating) return res.status(500).send("Rating is required");
  if (!price) return res.status(500).send("Price is required");
  if (!type) return res.status(500).send("Food Type is required");
  if (!imgSrc) return res.status(500).send("imgSrc required");

  // checking if food already added
  const qry = "SELECT * FROM foods WHERE title= ?";
  const existingFood = await queryPromise(qry, [title]);

  if (existingFood.length > 0) {
    return res.status(404).send("Food is already added");
  }

  // Adding new food
  try {
    const newFoodQry =
      "INSERT INTO foods (title,slug,type,price,rating,imgSrc) VALUES ( ?, ?, ?, ?, ?, ? )";
    const newFood = await queryPromise(newFoodQry, [
      title,
      slug,
      type,
      price,
      rating,
      imgSrc,
    ]);
    return res.status(200).send(`${title} Added ${newFood.affectedRows}`);
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

export const getFoodsController = async (req, res) => {
  const { checkedFilter, sort, slug, limit, page } = req.query;

  // Query to get all foods
  let getQry = `SELECT * FROM foods`;
  let countDataQry = `SELECT COUNT(*) as count FROM foods`;

  if (page && !checkedFilter?.length && !slug) {
    let offset = (page - 1) * 9;
    if (limit) {
      offset = (page - 1) * limit;
    }
    getQry += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  if (slug) {
    getQry += ` WHERE slug= "${slug}"`;
  }

  if (checkedFilter) {
    const checked = checkedFilter.split(",");
    const likeClauses = checked
      .map((type) => ` type LIKE "%${type}%"`)
      .join(" OR ");
    getQry += ` WHERE (${likeClauses})`;
    countDataQry += ` WHERE (${likeClauses})`;
  }

  if (sort) {
    getQry += ` ORDER BY ${sort}`;
  }

  try {
    const foodsData = await queryPromise(getQry);
    let count = null;

    if (!slug) {
      const result = await queryPromise(countDataQry);
      count = result[0].count;
    }
    return res.status(200).send({ data: foodsData, count: count });
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
};

export const updateFood = async (req, res) => {
  const { id } = req.params;

  if (id) {
    const { title, type, price, rating, imgSrc } = req.body;

    if (!title) {
      return res.status(404).send("Title required");
    }
    if (!type) {
      return res.status(404).send("type required");
    }
    if (!price) {
      return res.status(404).send("price required");
    }
    if (!rating) {
      return res.status(404).send("rating required");
    }
    if (!imgSrc) {
      return res.status(404).send("image source required");
    }

    const slug = slugify(title);
    const updateQry = `UPDATE foods SET title=?, slug=?, type=?, price=?, rating=?, imgSrc=? WHERE id=?`;

    try {
      const updateResult = await queryPromise(updateQry, [
        title,
        slug,
        type,
        price,
        rating,
        imgSrc,
        id,
      ]);
      return res.status(200).send(updateResult.message);
    } catch (error) {
      return res.status(500).send("Internal server error!");
    }
  }
};

export const deleteFood = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const deleteQry = `DELETE FROM foods WHERE id=?`;
    try {
      const delResult = await queryPromise(deleteQry, [id]);
      return res.status(200).send(`DELETED ${delResult.affectedRows}`);
    } catch (error) {
      return res.status(500).send("Internal server error!");
    }
  }
};

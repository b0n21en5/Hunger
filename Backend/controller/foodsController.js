import slugify from "slugify";
import { queryPromise } from "../helper/queryPromise.js";

export const addNewFood = async (req, res) => {
  const { title, rating, price, type, imgSrc, category } = req.body;
  const slug = slugify(title);

  if (!title) return res.status(500).send({ message: "Name is required" });
  if (!rating) return res.status(500).send({ message: "Rating is required" });
  if (!price) return res.status(500).send({ message: "Price is required" });
  if (!type) return res.status(500).send({ message: "Food Type is required" });

  // checking if food already added
  const qry = "SELECT * FROM foods WHERE title= ?";
  const existingFood = await queryPromise(qry, [title]);

  if (existingFood.length > 0) {
    return res.status(404).send({ message: "Food is already added" });
  }

  // Adding new food
  const newFoodQry =
    "INSERT INTO foods (title,slug,type,price,rating,imgSrc,category) VALUES ( ?, ?, ?, ?, ?, ?, ? )";
  const newFood = await queryPromise(newFoodQry, [
    title,
    slug,
    type,
    price,
    rating,
    imgSrc,
    category,
  ]);
  return res.status(200).send({
    message: `${title} Added ${newFood.affectedRows}`,
  });
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
    console.log("foods", likeClauses);
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

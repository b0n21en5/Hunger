import slugify from "slugify";
import { queryPromise } from "../helper/queryPromise.js";

export const addNewFood = async (req, res) => {
  const { title, rating, price, type, imgSrc } = req.body;
  const slug = slugify(title);

  if (!title) return res.status(500).send({ message: "Name is required" });
  if (!rating) return res.status(500).send({ message: "Rating is required" });
  if (!price) return res.status(500).send({ message: "Price is required" });
  if (!type) return res.status(500).send({ message: "Food Type is required" });

  // checking if food already added
  const qry = "SELECT * FROM foodsdata WHERE title= ?";
  const existingFood = await queryPromise(qry, [title]);

  if (existingFood.length > 0) {
    return res.status(404).send({ message: "Food is already added" });
  }

  // Adding new food
  const newFoodQry =
    "INSERT INTO foodsdata (title,slug,type,price,rating,imgSrc) VALUES ( ?, ?, ?, ?, ?, ? )";
  const newFood = await queryPromise(newFoodQry, [
    title,
    slug,
    type,
    price,
    rating,
    imgSrc,
  ]);
  return res.status(200).send({
    message: `Rows Affected ${newFood.affectedRows}`,
  });
};

export const getFoodsByType = async (req, res) => {
  const { checkedFilter, sort, slug, limit } = req.query;
  const page = req.query.page || 1;

  const offset = (page - 1) * limit;

  // Query to get all foods
  let getQry = `SELECT * FROM foodsdata`;

  if (!checkedFilter?.length && !slug) {
    getQry += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  if (slug) {
    getQry += ` WHERE slug= "${slug}"`;
  }

  if (checkedFilter) {
    const checked = checkedFilter.split(",");
    const likeClauses = checked
      .map((type) => ` type LIKE '%${type}%'`)
      .join(" OR ");
    getQry += ` WHERE (${likeClauses})`;
  }

  if (sort) {
    getQry += ` ORDER BY ${sort}`;
  }

  try {
    const filteredFoods = await queryPromise(getQry);
    return res.status(200).send(filteredFoods);
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
};

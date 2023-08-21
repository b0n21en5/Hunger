import slugify from "slugify";
import { queryPromise } from "../helper/queryPromise.js";

export const addNewRestaurant = async (req, res) => {
  const { title, type, price, rating, imgSrc, location, distance } = req.body;
  if (!title) res.status(404).send({ message: "Title is Required" });
  if (!type) res.status(404).send({ message: "Type is Required" });
  if (!price) res.status(404).send({ message: "Price is Required" });
  if (!location) res.status(404).send({ message: "Location is Required" });
  if (!distance) res.status(404).send({ message: "Distance is Required" });

  const existQry = "SELECT * FROM restaurants WHERE title= ?";
  const existingRestaurant = await queryPromise(existQry, [title]);

  if (existingRestaurant.length > 0) {
    return res.status(404).send({ message: "Restaurant is Already added" });
  }

  const slug = slugify(title);
  const newAddQry =
    "INSERT INTO restaurants (title,slug,type,price,rating,imgSrc,location,distance) VALUES (?,?,?,?,?,?,?,?)";
  const newRestaurant = await queryPromise(newAddQry, [
    title,
    slug,
    type,
    price,
    rating,
    imgSrc,
    location,
    distance,
  ]);
  return res
    .status(200)
    .send({ message: `Rows Affected ${newRestaurant.affectedRows}` });
};

export const getRestaurantsByType = async (req, res) => {
  const { checkedFilter, sort, slug, limit } = req.query;
  const page = req.query.page || 1;

  const offset = (page - 1) * limit;

  let getQry = `SELECT * FROM restaurants`;

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
    const filteredRestaurants = await queryPromise(getQry);
    return res.status(200).send(filteredRestaurants);
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
};

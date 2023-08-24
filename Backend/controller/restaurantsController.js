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
    .send({ message: `${title} Added ${newRestaurant.affectedRows}` });
};

export const getRestaurantsController = async (req, res) => {
  const { checkedFilter, sort, slug, limit, page } = req.query;

  let getQry = `SELECT * FROM restaurants`;
  let countDataQry = `SELECT COUNT(*) as count FROM restaurants`;

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
    console.log(likeClauses);
    getQry += ` WHERE (${likeClauses})`;
    countDataQry += ` WHERE (${likeClauses})`;
  }

  if (sort) {
    getQry += ` ORDER BY ${sort}`;
  }

  try {
    const restaurantsData = await queryPromise(getQry);
    let count = null;

    if (!slug) {
      const result = await queryPromise(countDataQry);
      count = result[0].count;
    }
    return res.status(200).send({ data: restaurantsData, count: count });
  } catch (error) {
    res.status(500).send("Internal Server Error!");
  }
};

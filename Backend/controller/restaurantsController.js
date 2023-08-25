import slugify from "slugify";
import { queryPromise } from "../helper/queryPromise.js";

export const addNewRestaurant = async (req, res) => {
  const { title, type, price, rating, imgSrc, location, distance } = req.body;
  if (!title) res.status(404).send("Title is Required");
  if (!type) res.status(404).send("Type is Required");
  if (!price) res.status(404).send("Price is Required");
  if (!location) res.status(404).send("Location is Required");
  if (!distance) res.status(404).send("Distance is Required");

  const existQry = "SELECT * FROM restaurants WHERE title= ?";
  const existingRestaurant = await queryPromise(existQry, [title]);

  if (existingRestaurant.length > 0) {
    return res.status(404).send("Restaurant is Already added");
  }

  const slug = slugify(title);
  const newAddQry =
    "INSERT INTO restaurants (title,slug,type,price,rating,imgSrc,location,distance) VALUES (?,?,?,?,?,?,?,?)";
  try {
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
    return res.status(200).send(`${title} Added ${newRestaurant.affectedRows}`);
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
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

export const updateRestaurants = async (req, res) => {
  const { id } = req.params;

  if (id) {
    const { title, type, price, rating, imgSrc, location, distance } = req.body;

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
    if (!location) {
      return res.status(404).send("location required");
    }
    if (!distance) {
      return res.status(404).send("distance required");
    }

    const slug = slugify(title);
    const updateQry = `UPDATE restaurants SET title=?, slug=?, type=?, price=?, rating=?, imgSrc=?, location=?, distance=? WHERE id=?`;

    try {
      const updateResult = await queryPromise(updateQry, [
        title,
        slug,
        type,
        price,
        rating,
        imgSrc,
        location,
        distance,
        id,
      ]);
      return res.status(200).send(updateResult.message);
    } catch (error) {
      return res.status(500).send("Internal server error!");
    }
  }
};

export const deleteRestaurants = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const deleteQry = `DELETE FROM restaurants WHERE id=?`;
    try {
      const delResult = await queryPromise(deleteQry, [id]);
      return res.status(200).send(`DELETED ${delResult.affectedRows}`);
    } catch (error) {
      return res.status(500).send("Internal server error!");
    }
  }
};

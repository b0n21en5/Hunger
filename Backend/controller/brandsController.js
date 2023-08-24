import { queryPromise } from "./../helper/queryPromise.js";
import slugify from "slugify";

export const addNewBrand = async (req, res) => {
  const { name, imgSrc, rating, delivery } = req.body;

  if (!name) {
    return res.status(500).send("Brand name required!");
  }
  if (!rating) {
    return res.status(500).send("Brand rating required!");
  }
  if (!delivery) {
    return res.status(500).send("Delivery time required!");
  }

  // Check if existing cuisine
  const existQury = `SELECT * FROM brands WHERE name="${name}"`;

  const newBrandQry = `INSERT INTO brands (name,slug,imgSrc,rating,delivery) VALUES (?,?,?,?,?)`;

  try {
    const existingBrand = await queryPromise(existQury);
    if (existingBrand.length) {
      return res.status(404).send("Brand is already added! Try adding New");
    }

    const slug = slugify(name);
    const result = await queryPromise(newBrandQry, [
      name,
      slug,
      imgSrc,
      rating,
      delivery,
    ]);
    return res
      .status(200)
      .send(`New Brand ${name} Added ${result.affectedRows}`);
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

export const getAllBrands = async (req, res) => {
  let getBrandsQry = `SELECT * FROM brands`;
  let countQuery = `SELECT COUNT(*) as count FROM brands`;

  let { page, rating, limit } = req.query;

  if (rating) {
    getBrandsQry += ` WHERE rating > ${rating - 0.1} ORDER BY rating DESC`;
    countQuery += ` WHERE rating > ${rating - 0.1}`;
  }

  if (page) {
    if (!limit) limit = 6;
    const offset = page - 1;
    getBrandsQry += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  if (!rating && !page) getBrandsQry += ` GROUP BY name`;

  try {
    const result = await queryPromise(getBrandsQry);
    let count = null;

    if (rating) {
      let countResult = await queryPromise(countQuery);
      count = countResult[0].count;
    }

    return res.status(200).send({ brands: result, count: count });
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

import { queryPromise } from "./../helper/queryPromise.js";

export const addNewCuisine = async (req, res) => {
  const { name, imgSrc, rating } = req.body;

  // Check if existing cuisine
  const existQury = `SELECT * FROM cuisines WHERE name="${name}"`;

  const newCuisineQry = `INSERT INTO cuisines (name,imgSrc,rating) VALUES (?,?,?)`;

  try {
    const existingCuisine = await queryPromise(existQury);
    if (existingCuisine.length) {
      return res.status(404).send("Cuisine is already added! Try adding New");
    }

    const result = await queryPromise(newCuisineQry, [name, imgSrc, rating]);
    return res
      .status(200)
      .send(`New Cuisine ${name} Added ${result.affectedRows}`);
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

export const getAllCuisines = async (req, res) => {
  let getCuisinesQry = `SELECT * FROM cuisines `;
  let countQuery = `SELECT COUNT(*) as count FROM cuisines`;

  const { page, rating } = req.query;

  if (rating) {
    getCuisinesQry += ` WHERE rating >= ${rating}`;
    countQuery += ` WHERE rating >= ${rating}`;
  }

  if (page) {
    const limit = 6;
    const offset = page - 1;
    getCuisinesQry += ` LIMIT ${limit} OFFSET ${offset}`;
  }

  if (!rating && !page) getCuisinesQry += ` GROUP BY name`;

  try {
    const result = await queryPromise(getCuisinesQry);
    let count = null;

    if (rating) {
      result = await queryPromise(countQuery);
      count = result[0].count;
    }

    return res.status(200).send({ cuisines: result, count: count });
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

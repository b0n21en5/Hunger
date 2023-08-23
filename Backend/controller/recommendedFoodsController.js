import { queryPromise } from "../helper/queryPromise.js";

export const addRecommendedFoods = async (req, res) => {
  const { title, price, type, description, imgSrc } = req.body;
  if (!title) {
    return res.status(404).send("Title required!");
  }
  if (!type) {
    return res.status(404).send("Type required!");
  }
  if (!price) {
    return res.status(404).send("Price required!");
  }

  try {
    const newQry =
      "INSERT INTO recommendedfoods (title,price,type,description,imgSrc) VALUES (?,?,?,?,?)";
    const result = await queryPromise(newQry, [
      title,
      price,
      type,
      description,
      imgSrc,
    ]);
    return res.status(200).send(`New Data Added ${result.affectedRows}`);
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

export const getRecommendedFoods = async (req, res) => {
  let getQry = "SELECT * FROM recommendedfoods";
  const { search } = req.query;
  if (search) {
    getQry += ` WHERE title LIKE "%${search}%"`;
  }
  try {
    const result = await queryPromise(getQry);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send("InternaL server error!");
  }
};

export const getAllTypes = async (req, res) => {
  let getTypesQry = "SELECT type, Count(*) as count FROM recommendedfoods";

  const { search } = req.query;
  if (search) {
    getTypesQry += ` WHERE title LIKE "%${search}%"`;
  }
  getTypesQry += ` GROUP BY type`;

  try {
    const result = await queryPromise(getTypesQry);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

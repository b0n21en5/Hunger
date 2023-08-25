import { queryPromise } from "../helper/queryPromise.js";

export const searchData = async (req, res) => {
  const { searchTerm } = req.query;

  if (!searchTerm) {
    return res.status(200).send([]);
  }

  try {
    const foodsQuery = `SELECT * FROM foods WHERE title LIKE ? OR type LIKE ?`;
    const restaurantsQuery = `SELECT * FROM restaurants WHERE title LIKE ? OR type LIKE ?`;

    const foodsData = await queryPromise(foodsQuery, [
      `%${searchTerm}%`,
      `%${searchTerm}%`,
    ]);
    const restaurantsData = await queryPromise(restaurantsQuery, [
      `%${searchTerm}%`,
      `%${searchTerm}%`,
    ]);

    const searchedResults = [...foodsData, ...restaurantsData];

    return res.status(200).send(searchedResults);
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
};

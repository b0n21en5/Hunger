import { queryPromise } from "../helper/queryPromise.js";

export const searchData = async (req, res) => {
  const searchTerm = req.query.searchTerm;

  if (searchTerm) {
    try {
      const foodsQuery = `SELECT * FROM foodsdata WHERE title LIKE '%${searchTerm}%' OR type LIKE '%${searchTerm}%'`;
      const restaurantsQuery = `SELECT * FROM restaurants WHERE title LIKE '%${searchTerm}%' OR type LIKE '%${searchTerm}%'`;

      const foodsData = await queryPromise(foodsQuery);
      const restaurantsData = await queryPromise(restaurantsQuery);

      const searchedResults = [...foodsData, ...restaurantsData];

      res.status(200).send(searchedResults);
    } catch (error) {
      res.status(500).send("Internal Server Error!");
    }
  } else {
    res.status(200).send([]);
  }
};

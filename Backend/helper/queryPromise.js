import { connectDB } from "./connectDB.js";

export const queryPromise = (query, params) => {
  return new Promise((resolve, reject) => {
    connectDB.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

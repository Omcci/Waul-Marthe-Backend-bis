// const { db } = require("../database");
import { db } from "../database";


export const getAllListingsRoute = {
  method: "GET",
  path: '/api/listings',
  handler: async (req, h) => {
    try {
      const { recordset } = await db.query("Select * from listings");
      // console.log("Database results:", recordset);

      return recordset;
    } catch (error) {
      console.error("Error querying the database:", error);
      throw Boom.internal("Internal Server Error");
    }
  }
};
// const { poolPromise, sql } = require("../database");

// module.exports = {
//     method: "GET",
//     path: '/api/listings',
//     handler: async (req, h) => {
//       const pool = await poolPromise;
//       const request = new sql.Request(pool);  // Utilisez la variable sql exportée ou importez-la si nécessaire
//       const results = await request.query("Select * from listings");
//       return results.recordset;  // recordset contient les données de la requête
//     }
// };

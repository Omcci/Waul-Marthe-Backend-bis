// const { poolPromise, sql } = require("../database");
// const Boom = require("@hapi/boom");
import Boom from "@hapi/boom";
import { db } from "../database";

export const getListingRoute = {
  method: "GET",
  path: "/api/listings/{id}",
  handler: async (req, h) => {
    const id = req.params.id;
    // const { recordset } = await db.query("select * from listings where id=?", [id]);
    // const listing = recordset[0];
    // if (!listing) throw Boom.notFound(`Listing does not exist with id :${id}`);
    // return listing;
    try {
      const { recordset } = await db.query("select * from listings where id=@param0", [id]);
      const listing = recordset[0];
      if (!listing) throw Boom.notFound(`Listing does not exist with id :${id}`);
      return listing;
  } catch (error) {
      console.error(error);
      throw Boom.internal('Internal database error');
  }
  }
};


// module.exports = {
//   method: "GET",
//   path: "/api/listings/{id}",
//   handler: async (req, h) => {
//     const id = req.params.id;
//     const pool = await poolPromise;
//     const request = new sql.Request(pool);
    
//     // Setting the id parameter as VARCHAR based on the table schema
//     request.input('idParam', sql.VarChar(50), id); 
//     const results = await request.query("select * from listings where id=@idParam");
    
//     const listing = results.recordset[0];
//     if (!listing) throw Boom.notFound(`Listing does not exist with id :${id}`);
//     return listing;
//   }
// };
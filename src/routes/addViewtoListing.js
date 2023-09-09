import { db } from "../database";


// module.exports = {
export const addViewToListingRoute = {
  method: "POST",
  path: "/api/listings/{id}/add-view",
  handler: async (req, h) => {
    const id = req.params.id;
    await db.query(`Update listings set views=views+1 where id =@param0`,[id] );
    const { recordset } = await db.query("select * from listings where id= @param0", [id]);
    const updatedListing = recordset[0];
    return updatedListing;
  },
};


// const { poolPromise, sql } = require("../database");

// module.exports = {
//   method: "POST",
//   path: "/api/listings/{id}/add-view",
//   handler: async (req, h) => {
//     const id = req.params.id;

//     const pool = await poolPromise;
//     const request = new sql.Request(pool);

//     // Increment the views for the given ID
//     request.input('listingIdParam', sql.VarChar, id);  // Adjust the type if the ID isn't a VARCHAR (e.g., sql.Int for integer IDs)
//     await request.query("Update listings set views=views+1 where id = @listingIdParam");

//     // Retrieve the updated listing
//     const results = await request.query("select * from listings where id= @listingIdParam");
    
//     const updatedListing = results.recordset[0];
//     return updatedListing;
//   },
// };

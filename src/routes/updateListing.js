// const { db } = require("../database");
// const admin = require('firebase-admin');
// const { db } = require("../database");
// const admin = require('firebase-admin');
import { db } from "../database";
import * as admin from 'firebase-admin';

export const updateListingRoute = {
  method: "POST",
  path: "/api/listings/{id}",
  handler: async (req, h) => {
    const id = req.params.id;
    const { name, description, price } = req.payload;

    // Ensure token is provided
    const token = req.headers.authtoken;
    if (!token) {
      return h.response("Unauthorized").code(401);
    }

    let userId;
    try {
      const user = await admin.auth().verifyIdToken(token);
      userId = user.user_id;
    } catch (error) {
      console.error("Error verifying token:", error);
      return h.response("Unauthorized").code(401);
    }

    try {
      await db.query(
        `update listings set name = @param0, description = @param1, price = @param2 where id = @param3 and user_id = @param4`,
        [name, description, price, id, userId]
    );
    
    const { recordset } = await db.query(
        "select * from listings where id = @param0 and user_id = @param1",
        [id, userId]
    );
    
      return recordset[0];
    } catch (error) {
      console.error("Error updating listing:", error);
      return h.response("Internal Server Error").code(500);
    }
  }
};


// const { poolPromise, sql } = require("../database");
// const admin = require('firebase-admin');

// module.exports = {
//   method: "POST",
//   path: "/api/listings/{id}",
//   handler: async (req, h) => {
//     const id = req.params.id;
//     const { name, description, price } = req.payload;
//     const token = req.headers.authtoken;
//     const user = await admin.auth().verifyIdToken(token);
//     const userId = user.user_id;

//     const pool = await poolPromise;
//     const request = new sql.Request(pool);

//     // Set input parameters for SQL query based on the table schema
//     request.input('idParam', sql.VarChar(50), id);
//     request.input('nameParam', sql.VarChar(50), name);
//     request.input('descriptionParam', sql.VarChar(1000), description);
//     request.input('priceParam', sql.Decimal(10, 2), price);
//     request.input('userIdParam', sql.VarChar(50), userId);

//     try {
//       // Execute the SQL query to update the listing
//       await request.query(`update listings set name=@nameParam, description=@descriptionParam, price=@priceParam where id=@idParam and user_id=@userIdParam`);

//       // Retrieve and return the updated listing
//       const result = await request.query("select * from listings where id=@idParam and user_id=@userIdParam");
//       return result.recordset[0];
//     } catch (error) {
//       console.error("Error updating listing:", error);
//       throw new Error("Internal Server Error");
//     }
//   }
// };


// const { poolPromise, sql } = require("../database");
// const admin = require('firebase-admin');

// module.exports = {
//   method: "POST",
//   path: "/api/listings/{id}",
//   handler: async (req, h) => {
//     const id = req.params.id;
//     const { name, description, price } = req.payload;
//     const token = req.headers.authtoken;
//     const user = await admin.auth().verifyIdToken(token);
//     const userId = user.user_id;

//     const pool = await poolPromise;
//     const request = new sql.Request(pool);

//     // Set input parameters for SQL query based on the table schema
//     request.input('idParam', sql.VarChar(50), id);
//     request.input('nameParam', sql.VarChar(50), name);
//     request.input('descriptionParam', sql.VarChar(1000), description);
//     request.input('priceParam', sql.Decimal(10, 2), price);
//     request.input('userIdParam', sql.VarChar(50), userId);

//     try {
//       // Execute the SQL query to update the listing
//       await request.query(`update listings set name=@nameParam, description=@descriptionParam, price=@priceParam where id=@idParam and user_id=@userIdParam`);

//       // Retrieve and return the updated listing
//       const result = await request.query("select * from listings where id=@idParam and user_id=@userIdParam");
//       return result.recordset[0];
//     } catch (error) {
//       console.error("Error updating listing:", error);
//       throw new Error("Internal Server Error");
//     }
//   }
// };

import { db } from "../database";
import * as admin from 'firebase-admin'
// const { db } = require("../database");
// const admin = require('firebase-admin');

export const deleteListingRoute = {
  method: "DELETE",
  path: "/api/listings/{id}",
  handler: async (req, h) => {
    const id = req.params.id;
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    const userId = user.user_id;
    await db.query(`delete from listings where id=? and user_id = ?`, [id, userId]);
    return { message: "Successfully deleted" };
  }
};
// const { poolPromise, sql } = require("../database");
// const admin = require('firebase-admin');

// module.exports = {
//   method: "DELETE",
//   path: "/api/listings/{id}",
//   handler: async (req, h) => {
//     const id = req.params.id;
//     const token = req.headers.authtoken;
//     const user = await admin.auth().verifyIdToken(token);
//     const userId = user.user_id;

//     const pool = await poolPromise;
//     const request = new sql.Request(pool);

//     // Setting the id and userId parameters
//     request.input('idParam', sql.VarChar(50), id); 
//     request.input('userIdParam', sql.VarChar(50), userId); 

//     await request.query(`delete from listings where id=@idParam and user_id=@userIdParam`);
//     return { message: "Successfully deleted" };
//   }
// };

import { v4 as uuid } from "uuid";
import { db } from "../database";
import * as admin from 'firebase-admin';

export const createNewListingRoute = {
  method: "POST",
  path: "/api/listings",
  handler: async (req, h) => {
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    const id = uuid();
    const { name = "", description = "", price = 0 } = req.payload;
    const userId = user.user_id;
    const views = 0;
    await db.query(
      `insert into listings (id, name, description, price, user_id, views) values (@param0, @param1, @param2, @param3, @param4, @param5)`,
      [id, name, description, price, userId, views]
    );
    return { id, name, description, price, user_id: userId, views };
  }
};


// const { v4: uuid } = require("uuid");
// const { poolPromise, sql } = require("../database");
// const admin = require('firebase-admin');

// module.exports = {
//   method: "POST",
//   path: "/api/listings",
//   handler: async (req, h) => {
//     const token = req.headers.authtoken;
//     const user = await admin.auth().verifyIdToken(token);

//     const id = uuid();
//     const { name = "", description = "", price = 0 } = req.payload;
//     const userId = user.user_id;
//     const views = 0;

//     const pool = await poolPromise;
//     const request = new sql.Request(pool);

//     // Configurer les paramètres pour la requête
//     request.input('idParam', sql.VarChar(50), id);
//     request.input('nameParam', sql.VarChar(50), name);
//     request.input('descriptionParam', sql.VarChar(1000), description);
//     request.input('priceParam', sql.Decimal(10, 2), price);
//     request.input('userIdParam', sql.VarChar(50), userId);
//     request.input('viewsParam', sql.Int, views);

//     // Exécuter la requête SQL
//     await request.query(`insert into listings (id, name, description, price, user_id, views) values (@idParam, @nameParam, @descriptionParam, @priceParam, @userIdParam, @viewsParam)`);

//     return { id, name, description, price, user_id: userId, views };
//   }
// };

import { db } from "../database";
import * as admin from 'firebase-admin'
import { Boom } from "@hapi/boom";

// const { db } = require("../database");
// const admin = require('firebase-admin');
// const Boom = require("@hapi/boom");

export const getUserListingsRoute = {
  method: "GET",
  path: "/api/users/{userId}/listings",
  handler: async (req, h) => {
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token);
    const userId = req.params.userId;
    
    if (user.user_id !== userId) throw Boom.unauthorized('Users can only access their own listings!');
    
    const { recordset } = await db.query("select * from listings where user_id=@param0", [userId]);
    return recordset;
  }
};

// const { poolPromise, sql } = require("../database");
// const admin = require('firebase-admin');
// const Boom = require("@hapi/boom");

// module.exports = {
//   method: "GET",
//   path: "/api/users/{userId}/listings",
//   handler: async (req, h) => {
//     const token = req.headers.authtoken;
//     const user = await admin.auth().verifyIdToken(token);
//     const userId = req.params.userId;

//     if (user.user_id !== userId) throw Boom.unauthorized('Users can only access their own listings!');
    
//     const pool = await poolPromise;
//     const request = new sql.Request(pool);
    
//     // Configurer le paramètre pour la requête
//     request.input('userIdParam', sql.VarChar(50), userId);
    
//     // Exécuter la requête SQL
//     const results = await request.query("select * from listings where user_id=@userIdParam");
    
//     return results.recordset;
//   }
// };

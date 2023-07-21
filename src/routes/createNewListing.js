import { v4 as uuid } from "uuid";
import { db } from "../database";
import * as admin from 'firebase-admin'



export const createNewListingRoute = {
  method: "POST",
  path: "/api/listings",
  handler: async (req, res) => {
    const token = req.headers.authtoken
    const user = await admin.auth().verifyIdToken(token)
    const id = uuid();
    const { name = "", description = "", price = 0 } = req.payload;
    const userId= user.user_id
    const views = 0;
    await db.query(
      `insert into listings (id, name, description, price, user_id, views) values (?, ? , ? , ? , ? , ?)`,
      [id, name, description, price, userId, views]
    );
    return { id, name, description, price, user_id: userId, views };
  },
};

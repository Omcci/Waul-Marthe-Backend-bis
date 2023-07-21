import { db } from "../database";
import * as admin from 'firebase-admin'
import { Boom } from "@hapi/boom";

export const getUserListingsRoute = {
  method: "GET",
  path: "/api/users/{userId}/listings",
  handler: async (req, res) => {
    const token = req.headers.authtoken;
    const user = await admin.auth().verifyIdToken(token)
    const userId = req.params.userId;

    if (user.user_id !== userId) throw Boom.unauthorized('Users can only access their own listings !')

    const { results } = await db.query(
      "select * from listings where user_id=?",
      [userId]
    );
    return results;
  },
};

import { db } from "../database";
import * as admin from 'firebase-admin'


export const deleteListingRoute = {
  method: "DELETE",
  path: "/api/listings/{id}",
  handler: async (req, res) => {
    const id = req.params.id;
    const token = req.headers.authtoken
    const user = await admin.auth().verifyIdToken(token)
    const userId = user.user_id
    await db.query(`delete from listings where id=? and user_id = ?`, [id, userId]);

    return { message: "Successfully deleted" };
  },
};

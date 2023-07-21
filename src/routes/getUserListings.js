import { db } from "../database";

export const getUserListingsRoute = {
  method: "GET",
  path: "/api/users/{userId}/listings",
  handler: async (req, res) => {
    const userId = req.params.userId;

    const { results } = await db.query(
      "select * from listings where user_id=?",
      [userId]
    );
    return results;
  },
};

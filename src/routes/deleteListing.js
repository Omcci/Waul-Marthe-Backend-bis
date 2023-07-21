import { db } from "../database";

export const deleteListingRoute = {
  method: "DELETE",
  path: "/api/listings/{id}",
  handler: async (req, res) => {
    const id = req.params.id;

    await db.query(`delete from listings where id=?`, [id]);

    return { message: "Successfully deleted" };
  },
};

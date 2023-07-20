import { db } from "../database";

export const getAllListingsRoute = {
    method: "GET",
    path: '/api/listings',
    handler: async (req, res) => {
        const { results } = await db.query(
            "Select * from listings"
        )
        return results
    }
}
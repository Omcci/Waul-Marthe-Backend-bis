import { db } from "../database";

export const updateListingRoute = {
    method: "POST",
    path: "/api/listings/{id}",
    handler: async (req, res) => {
        const id = req.params.id
        const {name, description, price} = req.payload
        const userId= "12345"
        
        await db.query(
            `update listings set name= ?, description = ? , price= ?  where id = ? and user_id = ? `, [name, description,price, id ,userId]
        )
        const {results} = await db.query(
            'select * from listings where id= ? and user_id= ?', [id, userId],
        )
        return results[0]
    }
}
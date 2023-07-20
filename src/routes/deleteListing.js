import { db } from "../database";

export const deleteListingRoute = {
    method: "DELETE",
    path: "/api/listings/{id}",
    handler: async (req, res) => {
        const id = req.params.id
        // const {name, description, price} = req.payload
        // const userId= "12345"
        
        await db.query(
            `delete from listings where id=?`, [id]
        )
        // const {results} = await db.query(
        //     'select * from listings where id= ? and user_id= ?', [id, userId],
        // )
        return { message : 'Successfully deleted'}
    }
}
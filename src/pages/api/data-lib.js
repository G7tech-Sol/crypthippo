import {query} from "../../lib/db";

export default async function handler(req, res) {
    try{
        const querySql = "SELECT * FROM  categories Where status = 1 AND deleted_at IS NULL "
        const valueParams = [];
        const data = await query({ query: querySql, values: valueParams });
            // console.log(data)
            res.status(200).json({ categories: data });

    } catch (error) {
        //unhide to check error
        res.status(500).json({ error: error.message });
    }
}
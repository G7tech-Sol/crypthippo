import { query } from "../../lib/db";

export default async function handler(req, res) {
    const id = req.body.id;
    try {
        const queryCategorySql = "SELECT * FROM  categories WHERE id = ? AND status = 1 AND deleted_at IS NULL "
        const queryTransactionSql = "SELECT * FROM  transactions WHERE category_id = ? AND status = 1 AND deleted_at IS NULL "
        const queryLinkSql = "SELECT * FROM  links WHERE category_id = ? AND status = 1 AND deleted_at IS NULL "
        const valueParams = [id];
        const data_category = await query({ query: queryCategorySql, values: valueParams });
        const data_transaction = await query({ query: queryTransactionSql, values: valueParams });
        const data_link = await query({ query: queryLinkSql, values: valueParams });
        data_category[0]['transaction'] = data_transaction;
        data_category[0]['link'] = data_link;
        const data = data_category[0];
        
        res.status(200).json({ 
            transactionData: data
        });

    } catch (error) {
        //unhide to check error
        res.status(500).json({ error: error.message });
    }
}
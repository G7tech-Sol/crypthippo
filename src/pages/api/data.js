import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const dbconnection = await mysql.createConnection({
      host: "localhost",
      database: "oversight",
       //port: 8889,
      user: "root",
      password: "",
      
      
    });
    try{
        const query = "SELECT id, name , icon , value FROM  categories"
        const values = [];
        const [data] = await dbconnection.execute(query, values);
        dbconnection.end();

    res.status(200).json({ categories: data });

    } catch (error) {
        //unhide to check error
        res.status(500).json({ error: error.message });
    }
}
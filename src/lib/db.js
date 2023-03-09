import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
    const dbconnection = await mysql.createConnection({
      host: "72.167.77.37",
      database: "cryptohippo",
      port: 3306,
      user: "cryptohippouser",
      password: "v8turbO64672+",
    });
    try{
        const [results] = await dbconnection.execute(query, values);
        dbconnection.end();
        return results;
      } catch (error) {
        throw Error(error.message);
        return { error };
      }
}
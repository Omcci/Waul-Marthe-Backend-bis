import mysql from "mysql2";
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export const db = {
  // connect: () => connection.connect(),
  query: (queryString, escapedValues) =>
    new Promise((resolve, reject) => {
      pool.query(queryString, escapedValues, (error, results, fields) => {
        if (error) reject(error);
        resolve({ results, fields });
      });
    }),
  // end: () => connection.end(),
};

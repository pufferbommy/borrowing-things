import mysql from "mysql2/promise";

const connectToDb = async () => {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "borrowing_things",
  });
};

export { connectToDb };

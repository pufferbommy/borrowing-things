import mysql from "mysql2/promise";

const connectToDb = async () => {
  return mysql.createConnection({
    host: "165.232.165.187",
    user: "root",
    password: "root",
    database: "borrowing_things",
  });
};

export { connectToDb };

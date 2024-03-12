import { Client } from "pg";

const connectToDb = async () => {
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: parseInt(process.env.PGPORT!),
  });
  await client.connect();
  return client;
};

export { connectToDb };

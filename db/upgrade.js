const { Client } = require("pg");
const schema = require("./schema");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS session;

${schema}
`;

async function main() {
  console.log("upgrading...");
  console.log("Connecting to:", process.env.DATABASE_URL);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    console.log("Connected successfully");
    await client.query(SQL);
    console.log("Tables recreated");
  } catch (err) {
    console.error("Error during upgrade:", err);
  } finally {
    await client.end();
    console.log("Connection closed");
  }
}

main().catch((err) => console.error(err));

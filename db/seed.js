const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  password VARCHAR(255),
  membership_status VARCHAR(50) DEFAULT 'non-member'
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
);
`;

async function main() {
  console.log("seeding...");
  console.log("Connecting to:", process.env.DATABASE_URL);
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    await client.connect();
    console.log("Connected successfully");
    await client.query(SQL);
    console.log("Tables created");
  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await client.end();
    console.log("Connection closed");
  }
}

main().catch((err) => console.error(err));

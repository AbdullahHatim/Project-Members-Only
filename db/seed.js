const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS session;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  membership_status VARCHAR(50) DEFAULT 'non-member'
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE session (
  sid VARCHAR NOT NULL COLLATE "default",
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IDX_session_expire ON session (expire);
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

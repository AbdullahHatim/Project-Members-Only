const { Client } = require("pg");
const schema = require("./schema");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log("Connected successfully");

    // Ensure schema exists
    await client.query(schema);
    console.log("Schema ensured");

    // Hash passwords
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Insert Users
    const userInsertQuery = `
      INSERT INTO users (first_name, last_name, username, password, membership_status)
      VALUES 
        ($1, $2, $3, $4, $5),
        ($6, $7, $8, $9, $10),
        ($11, $12, $13, $14, $15)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username;
    `;

    const userValues = [
      "John", "Doe", "johndoe", hashedPassword, "non-member",
      "Jane", "Smith", "janesmith", hashedPassword, "member",
      "Admin", "User", "admin", hashedPassword, "admin"
    ];

    const { rows: users } = await client.query(userInsertQuery, userValues);
    console.log("Users seeded (or already existed)");

    // Get user IDs (in case they already existed and RETURNING didn't return them)
    const allUsers = await client.query("SELECT id, username FROM users WHERE username IN ('johndoe', 'janesmith', 'admin')");
    const userMap = {};
    allUsers.rows.forEach(u => userMap[u.username] = u.id);

    // Insert Messages
    const messageInsertQuery = `
      INSERT INTO messages (title, content, user_id)
      VALUES 
        ($1, $2, $3),
        ($4, $5, $6);
    `;

    const messageValues = [
      "Hello World", "This is my first message!", userMap['johndoe'],
      "Club Secret", "The secret code is 'neon-lights'.", userMap['janesmith']
    ];

    await client.query(messageInsertQuery, messageValues);
    console.log("Messages seeded");

  } catch (err) {
    console.error("Error during seeding:", err);
  } finally {
    await client.end();
    console.log("Connection closed");
  }
}

main().catch((err) => console.error(err));

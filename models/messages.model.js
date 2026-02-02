const pool = require("../db/pool");

async function createMessage(title, content, userId) {
  const query = `
    INSERT INTO messages (title, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [title, content, userId];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function getAllMessages() {
  const query = `
    SELECT 
      messages.id, 
      messages.title, 
      messages.content, 
      messages.timestamp, 
      users.first_name, 
      users.last_name, 
      users.username 
    FROM messages 
    JOIN users ON messages.user_id = users.id 
    ORDER BY messages.timestamp DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  createMessage,
  getAllMessages,
};

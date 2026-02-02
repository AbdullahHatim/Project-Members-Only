const pool = require("../db/pool");

async function createUser(firstName, lastName, username, password) {
  const query = `
    INSERT INTO users (first_name, last_name, username, password, membership_status)
    VALUES ($1, $2, $3, $4, 'non-member')
    RETURNING id;
  `;
  const values = [firstName, lastName, username, password];
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function getUserByUsername(username) {
  const query = "SELECT * FROM users WHERE username = $1";
  const { rows } = await pool.query(query, [username]);
  return rows[0];
}

async function getUserById(id) {
  const query = "SELECT * FROM users WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
};

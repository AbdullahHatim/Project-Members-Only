# Plan: Persist Sessions in PostgreSQL

## User Review
> [!IMPORTANT]
> Please review the plan below and provide your feedback.
> The user requested to store sessions in PostgreSQL to prevent data loss on server restart.

## Goals
1.  **Install Dependencies**: Add `connect-pg-simple` to the project.
2.  **Database Update**: Create a `session` table in the database.
3.  **App Configuration**: Configure `express-session` to use the PostgreSQL store.

## Steps

### 1. Installation
- [ ] Run `npm install connect-pg-simple`.

### 2. Database Setup
- [ ] Update `db/seed.js` to include the SQL for creating the `session` table.
    - The table schema is provided by `connect-pg-simple` documentation.
- [ ] Run `node db/seed.js` to create the table.

### 3. App Configuration
- [ ] In `app.js`:
    - Require `connect-pg-simple`.
    - Require the database pool (`db/pool.js`).
    - Update the `session` middleware configuration to use `store: new pgSession({ pool: pool, tableName: 'session' })`.

## Verification
- Restart the server.
- Log in.
- Restart the server again.
- Refresh the page and verify the user is still logged in.

### Project Members Only - Exclusive Community Platform

### Requirements Status
- [ ] User registration and login
- [ ] Membership status (Member, Admin)
- [ ] Message creation (only for members)
- [ ] Message viewing (anyone can see messages, but only members see author and date)
- [ ] Admin privileges (delete messages)
- [x] Database Setup
    - [x] Local PostgreSQL connection
    - [x] Tables creation (users, messages)

### task list

here we will keep track of our dev log

- [x] Initial commit: `a97ad31` - feat: initial project structure and express setup
- [x] Database Setup: `ac4e7ef` - feat: add .env, db/pool.js, and db/seed.js for local PostgreSQL

### condenced chat history

#### 1: Project Initialization
- **Setup:** Initialized the project with Express and basic folder structure.

#### 2: Database Configuration
- **Local Setup:** Configured local PostgreSQL connection in `.env`.
- **Pool & Seed:** Created `db/pool.js` for connection pooling and `db/seed.js` for schema initialization.
- **Schema Design:** Defined `users` (id, first_name, last_name, password, membership_status) and `messages` (id, title, content, timestamp, user_id) tables.

### technology
- dotenv, git, javascript, ejs, express, MVC pattern, postgresql, express-validator, passport.js, passport-local, bcryptjs
- neon.com (Neon MCP)
- render.com (deployment)

### other info
general folder structure 

/
├── app.js
├── controllers/
├── db/
│   ├── pool.js
│   └── seed.js
├── models/
├── public/
├── routers/
├── config/
└── views/
    ├── partials/
    ├── index.ejs
    ├── sign-up.ejs
    ├── log-in.ejs
    └── create-message.ejs

### database manual testing results
- **Table: users**: 0 records (SUCCESS - Table Created)
- **Table: messages**: 0 records (SUCCESS - Table Created)

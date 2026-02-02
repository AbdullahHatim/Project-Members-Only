### Project Members Only - Exclusive Community Platform

### Requirements Status
- [x] User registration and login
- [x] Membership status (Member, Admin): `032a27b` - feat: implement join the club feature
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
- [x] App Setup & Theme: `16c9afc` - feat: implement night club theme, basic app setup, and views
- [x] User Creation: `9b688a7` - feat: implement user sign-up, authentication, and sessions

### condenced chat history

#### 1: Project Initialization
- **Setup:** Initialized the project with Express and basic folder structure.

#### 2: Database Configuration
- **Local Setup:** Configured local PostgreSQL connection in `.env`.
- **Pool & Seed:** Created `db/pool.js` for connection pooling and `db/seed.js` for schema initialization.
- **Schema Design:** Defined `users` (id, first_name, last_name, password, membership_status) and `messages` (id, title, content, timestamp, user_id) tables.

#### 3: App Setup & Night Club Theme
- **App Configuration:** Created `app.js` with Express, EJS, session, and error handling middleware.
- **Models:** Created `models/users.model.js` and `models/messages.model.js`.
- **Views & Partials:** Created `views/index.ejs`, `views/error.ejs`, and partials (`header.ejs`, `footer.ejs`) for consistent layout.
- **Styling:** Implemented a "Night Club" theme in `public/stylesheets/style.css` using neon colors, dark backgrounds, and dynamic `color-mix` for button glows.
- **Testing:** Created `test.html` to showcase the new components and styles.

#### 4: User Creation
- **Sign Up:** Implemented user registration with `users.controller.js`, `users.router.js`, and `sign-up.ejs`.
- **Validation:** Added `express-validator` middleware for form validation.
- **Security:** Integrated `bcryptjs` for password hashing.
- **Routing:** Mounted user routes in `app.js`.

#### 5: Authentication & Sessions
- **Authentication:** Implemented Passport.js with Local Strategy for user login.
- **Sessions:** Configured `express-session` with `connect-pg-simple` for PostgreSQL-backed session storage.
- **Routing:** Restored default router for home page and added auth routes.

#### 6: Join the Club
- **Feature:** Implemented "Join the Club" page where users can enter a secret passcode to become members.
- **Logic:** Added `updateMembershipStatus` to model and controller logic to verify passcode.
- **Routes:** Added `/join-club` routes.

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

### Database Schema

```sql
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
```

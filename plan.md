# Plan - Admin Privileges (Message Deletion)

Implement the ability for users with `membership_status = 'admin'` to delete messages.

## Proposed Changes

### 1. Model
- Update [`models/messages.model.js`](models/messages.model.js) to include a `deleteMessage(id)` function.

### 2. Controller
- Update [`controllers/messages.controller.js`](controllers/messages.controller.js) to include a `deleteMessage` handler.
- This handler should verify if the user is an admin before proceeding with deletion.

### 3. Router
- Update [`routers/messages.router.js`](routers/messages.router.js) to add a `POST` (or `GET` for simplicity in this project, but `POST` is better practice) route for `/delete/:id`.

### 4. View
- Update [`views/index.ejs`](views/index.ejs) to display a "Delete" button/form next to each message, visible only to users with `admin` status.

## User Review

Please review the plan above. Once approved, I will proceed with the implementation.

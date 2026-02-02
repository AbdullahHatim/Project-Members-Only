# Plan: Implement Message Creation and Display

## User Review
> [!IMPORTANT]
> Please review the following plan and provide your approval or feedback before I proceed.

## Objectives
1.  **Message Creation:** Allow logged-in users to create new messages.
2.  **Message Display:** Display all messages on the home page.
3.  **Privacy:** Only show message author and date to members (membership_status: 'member' or 'admin').

## Steps

### 1. Database Model (`models/messages.model.js`)
-   Implement `createMessage(title, content, userId)`: Insert a new message into the database.
-   Implement `getAllMessages()`: Retrieve all messages with author details (joined with `users` table).

### 2. Controller (`controllers/messages.controller.js`)
-   `getCreateMessageForm`: Render the `create-message` view.
-   `createMessage`: Handle form submission, validate input, and call the model to save the message.
-   `getAllMessages`: Fetch messages and pass them to the `index` view.

### 3. Router (`routers/messages.router.js`)
-   `GET /create-message`: Route to display the form (protected: logged-in users only).
-   `POST /create-message`: Route to handle form submission (protected: logged-in users only).

### 4. Views
-   **`views/create-message.ejs`**: Create a form with fields for `title` and `content`.
-   **`views/index.ejs`**:
    -   Add a "Create Message" button (visible only if `user` is present).
    -   Loop through messages and display them.
    -   Logic to conditionally show author and date based on `user.membership_status`.

### 5. App Configuration (`app.js`)
-   Mount the `messagesRouter`.
-   Update the root route (`/`) to use `messagesController.getAllMessages` instead of the default render.

### 6. Validation
-   Use `express-validator` in `messages.controller.js` to ensure title and content are not empty.

## Verification
-   Verify that non-logged-in users cannot access `/create-message`.
-   Verify that logged-in users can create a message.
-   Verify that messages appear on the home page.
-   Verify that non-members see "Anonymous" and no date.
-   Verify that members see the author's name and the date.

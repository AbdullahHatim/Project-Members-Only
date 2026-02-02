# Plan: Implement "Join the Club" Feature

## User Review
> [!IMPORTANT]
> Please review the plan below and provide your feedback.
> The user requested a feature to allow users to become members by entering a secret passcode.

## Goals
1.  **Configuration**: Add `CLUB_SECRET` to `.env`.
2.  **Database Interaction**: Add functionality to update user membership status.
3.  **UI**: Create a "Join the Club" page with a passcode form.
4.  **Logic**: Implement the passcode verification and membership update logic.

## Steps

### 1. Configuration
- [ ] Add `CLUB_SECRET=bood` to `.env`.

### 2. Model Updates
- [ ] Update `models/users.model.js`:
    - Add `updateMembershipStatus(userId, status)` function.

### 3. View Creation
- [ ] Create `views/join-club.ejs`:
    - Form with a "Passcode" input field.
    - Display errors if any.

### 4. Controller & Routes
- [ ] Update `controllers/users.controller.js`:
    - Add `getJoinClubForm` to render the view.
    - Add `joinClub` to handle POST request:
        - Validate passcode against `process.env.CLUB_SECRET`.
        - If correct, call `updateMembershipStatus` and redirect to home.
        - If incorrect, re-render form with error.
- [ ] Update `routers/users.router.js`:
    - Add `GET /join-club` and `POST /join-club` routes.
    - Ensure routes are protected (user must be logged in).

## Verification
- Log in as a non-member.
- Navigate to `/join-club`.
- Enter incorrect passcode -> Error message.
- Enter correct passcode ("bood") -> Redirect to home, "Join the Club" link disappears (or changes), user is now a member.

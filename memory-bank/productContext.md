# Product Context

## Why This Project Exists
This project exists to provide a streamlined web interface for internal teams to create silent tickets in Zammad, a helpdesk system, without exposing details publicly. It simplifies the process of logging internal notes and assigning tickets to customers via email guess.

## Problems It Solves
- Manual ticket creation in Zammad can be time-consuming and error-prone, especially for selecting customers or ensuring internal-only visibility.
- Lack of a quick frontend for non-technical users to submit internal issues or notes.
- Need to handle both existing users and new email guesses efficiently.

## How It Should Work
- Users fill a form with Customer Email (selectable from existing users, internal email, or custom input), Ticket Name, and Initial Note.
- On submit, the app fetches the current user's ID, constructs a ticket payload with internal article, and posts to Zammad API.
- Silent ticket ensured by setting article.internal = true and no public article.
- Emails are debounced-searched locally from a cached user list.

## User Experience Goals
- Intuitive form with searchable email dropdown for quick selection.
- Real-time validation to prevent invalid submissions.
- Immediate feedback via toasts: success clears form, errors show API messages.
- Minimalist, responsive design for easy use in internal workflows.

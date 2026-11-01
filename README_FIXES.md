# Fixes applied

- Added a session-loading state so protected pages do not redirect while the saved token/profile is still being checked.
- Standardized the login route to `/login`.
- Added a `/forgot-password` page and connected the login page's Forgot Password button to it.
- Added a clear status message on the reset page; the backend reset API still needs to be connected when its endpoint is provided.
- Updated the document title to Opream Portal.

## Run locally

1. Install Node.js 20.19+ (or a current supported LTS version).
2. Open this project folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev` and open the local address printed in the terminal.

If the screen is still blank, open the browser DevTools Console (F12 → Console) and check for any backend/network errors. The password reset form is currently frontend-only until the backend API is connected.

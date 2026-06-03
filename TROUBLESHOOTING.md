# Eduvion - Bug & Feature Log

This file documents issues, their root causes, and the improvements made to keep track of system changes and maintain codebase health.

## [2026-06-03] Authentication Flow Smoothness & Security

### Problem
- The application flashed the Dashboard or unauthorized state on initial page load or page refresh before verifying the local token.
- Switching between "Login" and "Sign Up" tabs did not clear validation error messages, carrying them over to the other tab.
- Already authenticated users could access `/login` and `/register` instead of being redirected to `/dashboard`.
- The LinkedIn login button opened a popup that stayed blank and never completed authentication.
- Google Login and LinkedIn Login buttons were misaligned in height.
- Inputs showed the browser's default native focus outlines.
- Legitimate users were easily blocked from logging in or registering due to a highly restrictive backend rate limit.
- OAuth user creation stored a plain text string `'oauthUser'` in the database.

### Root Cause
1. **State Tracking**: `App.jsx` did not handle the asynchronous token verification stage (`checkAuth`). It checked `isAuthenticated` (which was initialized to `true` if a token existed in `localStorage`), rendering `Dashboard` immediately before verifying the token validity.
2. **Error State Lifecycle**: The authentication error state inside the Zustand store was never cleared on tab/path change.
3. **LinkedIn OAuth Configuration**: The LinkedIn login popup was redirecting to `/auth/linkedin/callback` which did not exist as a route in `App.jsx`.
4. **CSS Styling**: The Google Login container had `h-12` while the LinkedIn button had `h-[40px]`.
5. **Missing styling**: Inputs did not have the `outline-none` class.
6. **Backend Configuration**:
   - `authLimiter` was set to a maximum of 5 requests per 15 minutes.
   - `authController.js` saved user creation with plain text passwords.

### Things Done to Improve
- **Added verification state**: Introduced `checkingAuth` state to `authStore.js` and showed `GlobalLoader` in `App.jsx` while verifying the token on load.
- **Auto-clearing error**: Added `clearError` action and called it in `useEffect` in `AuthForm.jsx` on component mount and tab switch.
- **Authenticated Redirection**: Added redirect check in `AuthForm.jsx` to route logged-in users to `/dashboard`.
- **LinkedIn callback route**: Imported and registered the `LinkedInCallback` component from `react-linkedin-login-oauth2` on the `/auth/linkedin/callback` route.
- **Button Alignment**: Wrapped the Google login component and aligned the LinkedIn button to a uniform height of `h-[40px]` and `rounded-md` borders.
- **Input Outlines**: Added `outline-none` to input fields.
- **Backend Rate Limit**: Increased `authLimiter`'s `max` to 30 requests per 15 minutes in `rateLimiter.js`.
- **Secure OAuth Passwords**: Used `bcrypt.hash` to hash a secure random password for OAuth sign-ups.

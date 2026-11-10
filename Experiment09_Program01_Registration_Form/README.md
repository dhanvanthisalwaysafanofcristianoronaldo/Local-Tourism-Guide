# Experiment 09 — Program 01: User Registration Form

AngularJS 1.6.9 form validation demonstration. The submit button stays disabled until every required field is valid.

## Run
Open `index.html` in a modern browser. AngularJS is loaded from Google's CDN, so an internet connection is needed. No server or build step is required. You can also serve this folder with any static HTTP server.

## Validation covered
- Name is required and letters/spaces only (no numbers).
- Password is required, at least 8 characters, and contains uppercase, lowercase and a digit.
- Age is a whole number from 18 through 30.
- Mobile is exactly 10 digits.
- Email uses AngularJS email validation.
- Gender and state are required selections.
- Submission is disabled unless the form is valid; the success message demonstrates a valid submit.

All validation runs in the browser for this lab exercise. A real registration service should validate again on the server and should never store a plain-text password.

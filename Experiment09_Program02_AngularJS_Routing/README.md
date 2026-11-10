# Experiment 09 — Program 02: Four-page AngularJS SPA

This single-page website uses AngularJS 1.6.9 and `angular-route` 1.6.9. The Main, Red, Green and Blue views are switched by `ngRoute` without a full-page reload.

## Run
Open `index.html` in a modern browser, or run a static server from this folder (for example `python -m http.server 8000`) and visit `http://localhost:8000`. The AngularJS libraries are loaded from Google's CDN, so an internet connection is needed. No build step is required.

## Pages and features
- **Main:** overview, quick links, and a short visitor enquiry form.
- **Red:** red themed page with a required feedback form.
- **Green:** green themed page with a nature themed visual and checklist.
- **Blue:** blue themed page with a contact form and CSS-built illustration.
- Navigation uses `ng-view` and `$routeProvider`; URLs use the HTML5 hash form (`#/red`, etc.).

Forms demonstrate front-end required-field checks and local success messages. They do not send data to a server. Media is drawn with CSS, so no image downloads are needed.

# Experiment No. 07 – Working with jQuery

This folder contains all three practical programs from the uploaded Experiment 07 lab manual.
Each program has separate HTML, CSS and JavaScript files. jQuery 3.6.0 is loaded from the
Google Hosted Libraries CDN, so an internet connection is required when running the pages.

## Programs
1. **Budget Calculator App** (`01-budget-calculator`)
   - Enter the amount to manage and percentages for Room Rent, Accessories, Emergency and Savings.
   - The percentages must total 100%.
   - Default sample: Rs.15,000 split as 50%, 20%, 20% and 10%.
   - Expected values: Rs.7,500, Rs.3,000, Rs.3,000 and Rs.1,500.

2. **Cake Shop Order Calculator** (`02-cake-shop`)
   - Cake prices from the manual: Color Cake Rs.300, Brown Cake Rs.200,
     Milky Cake Rs.250 and Black Forest Cake Rs.500.
   - Default sample quantities: 2, 1, 2 and 1.
   - Expected total: Rs.1,650.

3. **Car Body Workshop** (`03-car-workshop`)
   - Change the car body colour, glass tint, tyre size and tyre colour.
   - Reset restores the original car appearance.

## How to run
1. Open this folder in VS Code.
2. Open a program's folder.
3. Run its `index.html` using Live Server, or open it directly in a browser.
4. Keep each `index.html`, `style.css` and `script.js` in the same program folder.

## jQuery features demonstrated
- `$(document).ready(function () { ... })`
- jQuery ID and class selectors: `$("#id")`, `$(".class")`
- `.click()` event handlers
- `.val()` to read form values
- `.text()` and `.html()` to update page content
- `.css()` to change the car's appearance
- `.trigger("click")` to display the sample calculations when a page loads

The cake photographs are loaded from Unsplash and require an internet connection.

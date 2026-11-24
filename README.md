# Mini Expense Tracker

[![Live Website](https://img.shields.io/badge/Live%20Website-Visit%20App-404258?style=for-the-badge&logo=githubpages&logoColor=white)](https://blupizarra.github.io/Mini-Expense-Tracker/)
[![HTML5](https://img.shields.io/badge/HTML5-474E68?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-50577A?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-6B728E?style=for-the-badge&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-404258?style=for-the-badge)](LICENSE)

> **A lightweight, responsive client-side web application for tracking daily expenses by category with real-time totals and browser persistence.**

---

## Overview

**Mini Expense Tracker** is a single-page expense management tool built with vanilla HTML, CSS, and JavaScript. It lets you log daily expenses in Philippine Pesos (₱), filter entries by category, view dynamically updated totals, and keep your data across page reloads using `localStorage`.

---

## Features

- **Add Expenses**: Log an expense with a title, amount, and category (`Food`, `Transport`, or `Other`) with client-side input validation.
- **Category Filtering**: Filter the expense list by `All`, `Food`, `Transport`, or `Other` with an automatic empty-state message when no entries match.
- **Dynamic Total Calculation**: Automatically recalculates and formats the total amount for the currently visible expenses.
- **Delete Entries**: Remove individual expenses with immediate list and total updates.
- **Persistent Storage**: Saves expenses to `localStorage` so entries persist across browser refreshes.
- **Responsive Layout**: Adapts cleanly between desktop and mobile viewports.

---

## Tech Stack

- **HTML5**: Semantic markup and accessible form controls.
- **CSS3**: Custom properties, Flexbox, CSS Grid, and responsive media queries.
- **Vanilla JavaScript**: DOM manipulation, event delegation, and `localStorage` persistence.

---

## Project Structure

```text
Mini-Expense-Tracker/
├── index.html    # Application markup and embedded styles
├── script.js     # Expense state management, validation, filtering, and persistence
├── LICENSE       # MIT License
└── README.md     # Project documentation
```

---

## Local Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/BluPizarra/Mini-Expense-Tracker.git
   ```
2. Open `index.html` directly in any modern web browser, or serve the folder with a local static server.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

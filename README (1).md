# 🏆 FIFA 2026 Match Predictor

A modern, responsive web app that predicts FIFA World Cup 2026 match outcomes using team ratings and recent form data. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools, no setup required.

---

## ✨ Features

- **Head-to-Head Predictor** — Select any two of 32 international teams and get an instant match forecast
- **Smart Algorithm** — Weighs overall rating, attack, defence, midfield quality, and recent form with weighted composite scores and logistic-curve probability distribution
- **Winning Probabilities** — Visual probability bar showing win % for each team plus draw likelihood
- **Ratings Breakdown** — Side-by-side comparison of all five key attributes with animated bar charts
- **Prediction Analysis** — Plain-English explanation of why the algorithm favours the predicted winner
- **Random Match** — One-click button to auto-select two random teams
- **Loading Animation** — Spinning football animation while predictions are being generated
- **Duplicate Selection Guard** — Prevents selecting the same team for both sides
- **Top 10 Leaderboard** — Ranked table of the strongest nations heading into the tournament
- **Fully Responsive** — Works on mobile, tablet, and desktop
- **FIFA-Themed Design** — Stadium-navy palette, gold accents, Bebas Neue display type, and pitch-line hero background

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Semantic document structure |
| CSS3 | Custom design tokens, Grid, Flexbox, animations, media queries |
| Vanilla JavaScript (ES6+) | Team data, prediction algorithm, DOM manipulation |
| Google Fonts | Bebas Neue (display), Inter (body), Roboto Mono (data) |

Zero dependencies. Zero build step.

---

## 🚀 How to Run in VS Code

### Option 1 — Live Server (recommended)

1. Open VS Code and install the **Live Server** extension (by Ritwick Dey) from the Extensions panel
2. Clone or download this repository and open the `fifa-2026-match-predictor` folder in VS Code
3. Right-click `index.html` in the file explorer and select **"Open with Live Server"**
4. The app opens automatically at `http://127.0.0.1:5500`

### Option 2 — Open directly in browser

1. Download or clone the repository
2. Double-click `index.html` — it will open in your default browser

> **Note:** Google Fonts are loaded from a CDN. An internet connection is required for the full typography to render. The app works offline but will fall back to system sans-serif fonts.

---

## 📁 Project Structure

```
fifa-2026-match-predictor/
├── index.html      # App shell, sections, and element structure
├── style.css       # Design tokens, layout, animations, responsive rules
├── script.js       # Team data, algorithm, rendering logic
└── README.md       # This file
```

---

## 🔮 Future Improvements

- **Historical head-to-head records** — Pull real match data from a football API (e.g. football-data.org)
- **Group stage simulator** — Simulate the full 2026 group draw and generate a bracket
- **Player spotlight** — Show key players for each selected team with individual ratings
- **Dark / light mode toggle** — Add a theme switcher while keeping the FIFA colour palette
- **Share result** — Generate a shareable image or link for each prediction
- **Animation on result reveal** — Confetti or goal-horn effect when the winner is announced
- **PWA support** — Service worker + manifest so the app can be installed on mobile home screens
- **Localisation** — Support Spanish and French alongside English for the 2026 host nations

---

## 📄 Licence

This project is open-source and available under the [MIT Licence](https://opensource.org/licenses/MIT).

Predictions are algorithmic estimates based on illustrative ratings data and are not affiliated with or endorsed by FIFA.

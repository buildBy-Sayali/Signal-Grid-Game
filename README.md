# Signal Grid — Pattern Memory Game

A responsive visual pattern-recall browser game built with **HTML**, **CSS**, and **Vanilla JavaScript**. Players memorize highlighted tiles on a dynamic grid, earn points for each match, advance through expanding grid sizes, and track their best score locally.

## Live Demo
Play directly via GitHub Pages:  
`https://buildBy-Sayali.github.io/Signal-Grid-Game/`

## How to Play
1. Click **Start Game** to begin at **Level 1** with **3 lives**.
2. Watch the highlighted tiles during the preview phase, then click the matching tiles once they fade.
3. Clear the round to advance to a round summary screen with a celebratory badge, your current score, and the next level.
4. Lose all 3 lives to open the **Game Over** screen showing your **Final Score**, **Best Score**, and a **Play Again** button.

## Features
- **Progressive Difficulty:** Grid scales from `3x3` to `4x4` and `5x5` with more target tiles as your level increases.
- **Round Summary & Pop-Up Celebrations:** Displays round completion stats and rotating praise badges (*Congrats!*, *Wonderful!*, *Awesome Job!*, *Sharp Memory!*, *Superb!*).
- **Dedicated Game Over Screen:** Shows final score, best score, and instant replay option.
- **Persistent High Score:** Saves your best score in the browser using `localStorage`.
- **Responsive Layout:** Adapts cleanly across mobile phones, tablets, and desktop screens using fluid sizing (`clamp`, `dvh`, and CSS Grid).

## Tech Stack
- **HTML5** — Semantic game structure and views
- **CSS3** — Custom properties, gradients, animations, and responsive media queries
- **JavaScript (ES6+)** — Round state management, random pattern generation, DOM updates, and `localStorage` persistence

## Project Structure
```text
signal-grid-game/
├── index.html
├── style.css
├── script.js
└── README.md

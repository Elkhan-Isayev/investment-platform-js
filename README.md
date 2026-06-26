# Investment Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-833ae0?style=for-the-badge&logo=github)](https://elkhan-isayev.github.io/investment-platform-js/)
[![Deploy to GitHub Pages](https://github.com/Elkhan-Isayev/investment-platform-js/actions/workflows/deploy.yml/badge.svg)](https://github.com/Elkhan-Isayev/investment-platform-js/actions/workflows/deploy.yml)

A small single-page investment-platform demo built with **React 18** and **Vite**.
Browse a list of stocks, open a company to see its price history on an interactive
chart, and buy shares against a virtual balance. Your portfolio's current value and
profit/loss update live.

> 🔗 **Live demo →** https://elkhan-isayev.github.io/investment-platform-js/

## Features

- **Account** — your portfolio with live profit/loss per position and in total.
- **Stock** — browse / search the catalogue and drill into any company.
- **Buy** — adjust quantity, see the running total, and purchase against your balance.
- **Price chart** — historical prices over a selectable date range (Recharts).
- **Demo data** — the original public APIs are gone, so a built-in mock layer
  (`src/demoApi.js`) serves realistic data, keeping the demo fully interactive offline.

## Tech stack

| Concern   | Tool |
|-----------|------|
| Build     | Vite 6 |
| UI        | React 18 |
| Routing   | react-router-dom 6 (HashRouter, for GitHub Pages) |
| Charts    | Recharts 2 |
| Dates     | react-datepicker 7 |

## Getting started

```bash
npm install     # install dependencies (Node 22 — see .nvmrc)
npm run dev     # start the dev server at http://localhost:3000
npm run build   # production build into dist/
npm run preview # preview the production build locally
npm run lint    # run ESLint
```

## Deployment

Every push to `master` is built and published to GitHub Pages by the
[`deploy`](.github/workflows/deploy.yml) GitHub Actions workflow.
The app uses a hash-based router and a `/investment-platform-js/` base path so it
works correctly from a project subpath without any server-side configuration.

## History

This project began life as a Create React App (`react-scripts` 3.4.1 / React 16)
and was modernized to the Vite + React 18 stack above — removing 224 known
dependency vulnerabilities in the process.

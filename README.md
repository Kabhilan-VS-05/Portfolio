# Portfolio

Personal portfolio of **Kabhilan V. S**, full-stack and AI developer.

Live site: https://kabhilan-vs-05.github.io/Portfolio/

## Features
- Home view, About, Projects, Experience, Skills, Coding activity and Contact
- Project filters and a details window for each project
- Coding activity charts for GitHub, LeetCode and GeeksforGeeks, refreshed daily by a GitHub Action
- Dark and light themes (remembers your choice) and a mobile layout with a menu
- Accessible: keyboard navigation and reduced-motion support

## How the charts update
`scripts/update_stats.py` reads public data from GitHub, LeetCode and GeeksforGeeks and writes `stats.json` and `stats.js`. The workflow in `.github/workflows/update-stats.yml` runs it every day.

Built with plain HTML, CSS and JavaScript. No build step, hosted on GitHub Pages.

[LinkedIn](https://linkedin.com/in/kabhilan-vs) | [GitHub](https://github.com/Kabhilan-VS-05)

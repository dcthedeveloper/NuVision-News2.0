# NuVision News 2.0

[![CI](https://github.com/dcthedeveloper/NuVision-News2.0/actions/workflows/ci.yml/badge.svg)](https://github.com/dcthedeveloper/NuVision-News2.0/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/dcthedeveloper/NuVision-News2.0?style=social)](https://github.com/dcthedeveloper/NuVision-News2.0/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/dcthedeveloper/NuVision-News2.0/main)](https://github.com/dcthedeveloper/NuVision-News2.0/commits/main)

NuVision is an intelligent news intelligence platform that aggregates reporting, surfaces multi-perspective analysis, and provides fast, explainable NLP-driven summaries and insights.

Deployments
- No hosted deployment configured in this repository. See `TECHNICAL_DOCUMENTATION.md` (Deployment & Production) for recommended deployment options (Vercel, Netlify, or Docker on a VM).

Demo / Proof of Concept notice
---------------------------------
This repository is a demo / proof-of-concept (POC) meant for local development and demonstrations. Sensitive API keys have been removed from the repository. If you previously committed keys, rotate them immediately with the provider dashboards (NewsAPI, Hugging Face) and do not re-commit keys to git.

To run the demo locally:
- Copy `.env.example` → `.env` and add `VITE_NEWSAPI_KEY` if you want live news.
- Copy `server/.env.example` → `server/.env` and add `HF_API_KEY` (and optional `ADMIN_TOKEN`).


This repository contains a React + TypeScript frontend (Vite) and a small Node-based inference proxy used to securely access the Hugging Face Inference API for summarization and other NLP tasks.

Links
- Live code: https://github.com/dcthedeveloper/NuVision-News2.0
- Technical documentation: ./TECHNICAL_DOCUMENTATION.md

Quick status
- Frontend: React + Vite
- Local inference proxy: Node + Express (server/)
- Summarization: server-side HF Inference API with file-backed cache

Getting started (development)
1. Clone repo
```bash
git clone https://github.com/dcthedeveloper/NuVision-News2.0.git
cd NuVision-News2.0
```
2. Install dependencies
```bash
npm install
cd server && npm install && cd ..
```
3. Configure env files
 - Copy `.env.example` to `.env` in project root and set `VITE_NEWSAPI_KEY` if you want live news.
 - Copy `server/.env.example` to `server/.env` and set `HF_API_KEY` (and optional `ADMIN_TOKEN`).

4. Start dev servers
```bash
# Start frontend (Vite)
npm run dev

# In a separate terminal, start the inference proxy
cd server && npm start
```

How to push changes
Follow the instructions in `PUSH_INSTRUCTIONS.md` if you need to push local commits to GitHub.

Contributing
See `CONTRIBUTING.md` for contribution guidelines.

License
This project is licensed under the MIT License — see `LICENSE`.
# NuVision-News2.0
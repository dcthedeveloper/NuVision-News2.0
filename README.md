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

### Running the demo (no APIs required)
The app works great as a demo **without any API keys** — use the pre-loaded sample article corpus (2000+ articles in `src/data/nuvision_2k.json`):

```bash
npm run dev
```

Then open http://localhost:5173 and use the **static article feed**. You'll see:
- ✅ Full article browsing, clustering, and filtering
- ✅ Category tags and sentiment analysis
- ✅ Knowledge graphs and timeline extraction
- ✅ Clean Reader modal (AI summary and entity highlighting available if you add HF_API_KEY)
- ✅ Bias radar and deep-dive analysis
- ✅ All NLP features using server-side models

**Live News is optional**: To enable live news headlines from NewsAPI, add `VITE_NEWSAPI_KEY` to `.env` (copy from `.env.example`).

### With optional APIs (local inference proxy)
If you want to enable AI summaries and advanced NLP features:

```bash
# 1. Copy and add keys to env files
cp .env.example .env
cp server/.env.example server/.env
# Edit .env with VITE_NEWSAPI_KEY (optional) 
# Edit server/.env with HF_API_KEY (optional)

# 2. Install server dependencies
cd server && npm install && cd ..

# 3. Start frontend (in one terminal)
npm run dev

# 4. Start inference proxy (in another terminal)
cd server && npm start
```

API keys rotate / security reminder
- If you previously saw API keys in this repo: rotate them now at NewsAPI and Hugging Face dashboards.
- Never commit `.env` or `server/.env` files to git (they're in `.gitignore`).
- Use `.env.example` and `server/.env.example` as templates.

---


This repository contains a React + TypeScript frontend (Vite) and a small Node-based inference proxy used to securely access the Hugging Face Inference API for summarization and other NLP tasks.

Links
- Repository: https://github.com/dcthedeveloper/NuVision-News2.0
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
# Note: server is optional; inference proxy is only needed for AI summaries
cd server && npm install && cd ..
```
3. Start the app (no APIs needed for demo)
```bash
npm run dev
```
The app will run on http://localhost:5173 with sample article data. Skip to **Optional: Add API keys** below if you want live news or AI features.

4. (Optional) Enable API features
```bash
# Copy env files from examples
cp .env.example .env
cp server/.env.example server/.env
# Edit .env: add VITE_NEWSAPI_KEY if you want live news
# Edit server/.env: add HF_API_KEY if you want AI summaries

# Start inference proxy (new terminal)
cd server && npm start
```
That's it — the app is a fully-functional demo without any APIs.

How to push changes
Follow the instructions in `PUSH_INSTRUCTIONS.md` if you need to push local commits to GitHub.

Contributing
See `CONTRIBUTING.md` for contribution guidelines.

License
This project is licensed under the MIT License — see `LICENSE`.
# NuVision News
## NewsBot Intelligence System - Advanced NLP Integration Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/deewcee/NuVision-News?style=social)](https://github.com/deewcee/NuVision-News/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/deewcee/NuVision-News/main)](https://github.com/deewcee/NuVision-News/commits/main)

**Developer:** DeMarcus Crump | **Repository:** [github.com/deewcee/NuVision-News](https://github.com/deewcee/NuVision-News)

---

## Executive Summary

**NuVision News** is an intelligent news aggregation and analysis platform designed to combat information overload and media bias. Instead of presenting news as isolated articles, NuVision uses natural language processing (NLP) and machine learning to **cluster related stories from multiple sources**, extract key entities and timelines, analyze sentiment and bias, and provide AI-generated summaries—giving readers a comprehensive, multi-perspective view of current events.

**The Problem**: Modern news consumers face fragmented information across dozens of sources, hidden editorial bias, and overwhelming volume. Traditional news apps present articles in isolation without context or cross-source comparison.

**The Solution**: NuVision automatically groups similar stories (e.g., 5 different outlets covering the same event), highlights factual entities, shows sentiment differences across sources, and provides explainable AI summaries—helping readers quickly understand complex topics from multiple angles without reading dozens of full articles.

**Key Features**:
- 🔍 **Semantic Clustering** — Groups related articles across sources
- 🧠 **AI Summaries** — Concise, explainable article summaries with disclaimer
- 📊 **Bias Radar** — Visualizes media bias and source diversity
- 🗺️ **Knowledge Graphs** — Entity relationships and connections
- ⏱️ **Event Timelines** — Chronological event extraction
- 🎯 **Context Lenses** — Tailored views for different reader personas (student, analyst, executive)
- 📰 **Clean Reader** — Distraction-free reading with entity highlighting

**Tech Stack**: React 18 + TypeScript, Vite, TailwindCSS, shadcn/ui, Hugging Face Transformers, Node.js inference proxy

---

## Demo Application Notice

This is a **demonstration application** showcasing NLP techniques applied to news analysis. API keys are not included in the repository for security.

### What Works Without Any API Keys

The app is **fully functional as a demo** using pre-loaded sample data (`src/data/nuvision_2k.json` — 2000+ articles):

| Feature | Works Without APIs | Notes |
|---------|-------------------|-------|
| Article browsing & filtering | ✅ Yes | Full category/search/filter |
| Sentiment analysis | ✅ Yes | Client-side analysis |
| Knowledge graphs | ✅ Yes | Entity relationships |
| Event timelines | ✅ Yes | Chronological extraction |
| Bias radar | ✅ Yes | Source analysis |
| Clean Reader modal | ✅ Yes | Distraction-free view |
| Context Lenses | ✅ Yes | Persona-based views |
| **Live news headlines** | ❌ Requires NewsAPI | Optional |
| **AI summaries** | ❌ Requires HF API | Optional |
| **Semantic clustering** | ❌ Requires HF API | Optional |
| **Advanced entity extraction** | ❌ Requires HF API | Fallback to regex |

---

## Quick Start (60 seconds)

```bash
# Clone and install
git clone https://github.com/deewcee/NuVision-News.git
cd NuVision-News
npm install

# Start the demo (no APIs needed)
npm run dev
```

Open http://localhost:8080 (or whichever port Vite assigns) in your browser. **Done!**

You'll see 2000+ sample articles with full NLP features. The app works great for demonstrations without any API keys.

---

## Optional: Enable Live News & AI Features

### 1. Live News (NewsAPI)
```bash
cp .env.example .env
# Edit .env and add: VITE_NEWSAPI_KEY=your_key_here
# Get a free key at https://newsapi.org
# Restart: npm run dev
```

### 2. AI Summaries & Clustering (Hugging Face)
```bash
# Install server dependencies
cd server && npm install && cd ..

# Configure server
cp server/.env.example server/.env
# Edit server/.env and add: HF_API_KEY=your_key_here
# Get a free key at https://huggingface.co/settings/tokens

# Start inference proxy (new terminal)
cd server && npm start

# Server runs on http://localhost:4000
# Frontend automatically uses it when available
```

Now clustering, AI summaries, and advanced NER will be enabled.

---

## Documentation

- 📘 **[DEMO_QUICKSTART.md](DEMO_QUICKSTART.md)** — 60-second setup guide
- 📗 **[TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md)** — Architecture, algorithms, API reference
- 📙 **[CONTRIBUTING.md](CONTRIBUTING.md)** — Contribution guidelines
- 📕 **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** — One-page cheat sheet

---

## Security Reminder

**If you previously saw API keys in this repo**: Rotate them immediately at NewsAPI and Hugging Face dashboards.

- Never commit `.env` or `server/.env` files to git (they're in `.gitignore`)
- Use `.env.example` and `server/.env.example` as templates only
- See `DEMO_READINESS_REPORT.md` for security checklist

---

## Architecture

```
Frontend (React + TypeScript + Vite)
  ├─ 2000+ sample articles (always available)
  ├─ Live news (optional, via NewsAPI)
  └─ AI features (optional, via local proxy)
       ↓
Local Inference Proxy (Node.js + Express)
  ├─ Forwards to Hugging Face Inference API
  ├─ File-backed cache (7-day TTL)
  ├─ Rate limiting (30 req/min per IP)
  └─ Admin endpoints (optional token protection)
```

See `TECHNICAL_DOCUMENTATION.md` for detailed architecture.

---

## Deployment

No hosted deployment is currently configured. This is a local development demo. For production deployment options (Vercel, Netlify, Docker), see `TECHNICAL_DOCUMENTATION.md` → "Deployment & Production".

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE).

---

## Technical Implementation

**Core Features:**
- Frontend: React 18 + TypeScript + Vite
- Backend: Node.js + Express inference proxy
- NLP: TF-IDF, clustering, sentiment analysis, entity extraction
- AI: Hugging Face Transformers (BART, BERT, sentence-transformers)
- Performance: Client-side caching, dynamic imports, optimized bundling
- UI/UX: Modern component-based design with shadcn/ui

**Documentation:**
- README.md - Project overview and setup
- TECHNICAL_DOCUMENTATION.md - Detailed technical reference
- EXECUTIVE_SUMMARY.md - Business overview
- USER_GUIDE.md - End-user instructions
- API_REFERENCE.md - Complete API documentation

---

## Contact & Support

**Developer:** DeMarcus Crump  
**GitHub:** https://github.com/deewcee  
**Repository:** https://github.com/deewcee/NuVision-News  
**Issues/Feedback:** https://github.com/deewcee/NuVision-News/issues

This project demonstrates practical NLP techniques including text preprocessing, feature extraction, classification, sentiment analysis, named entity recognition, topic modeling, and language model integration—all applied to real-world news analysis.

# NuVision News 2.0

NuVision is an intelligent news intelligence platform that aggregates reporting, surfaces multi-perspective analysis, and provides fast, explainable NLP-driven summaries and insights.

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
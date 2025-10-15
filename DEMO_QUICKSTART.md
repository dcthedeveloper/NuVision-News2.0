# Demo / POC Quick Start

**TL;DR**: Run the app locally without any API keys. It works great with sample data.

## 60-second demo setup

```bash
# 1. Clone and install
git clone https://github.com/dcthedeveloper/NuVision-News2.0.git
cd NuVision-News2.0
npm install

# 2. Start the frontend (this is all you need for a demo)
npm run dev

# Open http://localhost:5173 in your browser
```

Done. The app loads 2000+ pre-processed news articles and you can:
- Browse articles by category
- View sentiment analysis and clustering
- Open the "Clean Reader" modal to see entity highlighting
- Explore the Knowledge Graph, Timeline, and Bias Radar
- All powered by NLP — no external APIs required!

## What works without API keys

✅ **Full article feed** with categories, search, and filtering  
✅ **Clustering & multi-perspective view** — see how different sources cover the same story  
✅ **Entity highlighting** (names, organizations, locations)  
✅ **Sentiment analysis** — how positive/negative is each article  
✅ **Knowledge graphs** — entity relationships  
✅ **Timeline extraction** — chronological event flow  
✅ **Bias radar** — multi-source perspective analysis  
✅ **Clean Reader modal** — distraction-free reading  

## Optional: Add AI features

If you want **AI-generated summaries**, you'll need a Hugging Face API key:

```bash
# Copy the server env template
cp server/.env.example server/.env

# Edit server/.env and paste your HF_API_KEY
# Get a free key at https://huggingface.co/settings/tokens

# Install server deps and start proxy (new terminal)
cd server
npm install
npm start
```

Summaries will now appear in the Clean Reader modal.

## Optional: Add live news

If you want **real-time news headlines**, you'll need a NewsAPI key:

```bash
# Copy the frontend env template
cp .env.example .env

# Edit .env and paste your VITE_NEWSAPI_KEY
# Get a free key at https://newsapi.org

# Restart the frontend (npm run dev)
```

The **Live News** section will now pull real headlines instead of sample data.

## Architecture at a glance

```
Frontend (React + TypeScript)
  ├─ Static articles (src/data/nuvision_2k.json) ← Always available
  ├─ Live news (via NewsAPI) ← Optional
  └─ AI features (via proxy) ↓

Local Inference Proxy (Node.js + Express)
  ├─ Summarization (Hugging Face)
  ├─ NER / Entity extraction
  ├─ Sentiment analysis
  ├─ Embeddings
  └─ Q&A

  ↓ (if no API key) Falls back to ↓

In-browser NLP (via dynamic import)
  └─ Client-side fallback models
```

## Pro tips

- **No API keys?** The demo is already impressive — shows full NLP capabilities!
- **Want to demo faster?** Start with `npm run dev` and just browse articles.
- **Show AI summaries?** Add HF_API_KEY; the UI will show summaries in the Clean Reader modal.
- **Show live news?** Add VITE_NEWSAPI_KEY; the app will pull real headlines.
- **Want to see code?** Check `TECHNICAL_DOCUMENTATION.md` for deep architecture and algorithm details.

## Troubleshooting

**Port 5173 already in use?**
```bash
npm run dev -- --port 3000
```

**AI endpoints not working?**
- Check that `server/.env` has `HF_API_KEY` set.
- Ensure the inference proxy is running (`cd server && npm start`).
- The app will gracefully fall back to in-browser models if the proxy isn't available.

**Article data not loading?**
- Check browser console (F12) for errors.
- Ensure `src/data/nuvision_2k.json` exists.
- Try restarting: `npm run dev`.

## Questions?

See `TECHNICAL_DOCUMENTATION.md` for architecture, algorithms, and advanced usage.

---

**Happy demoing!** 🚀

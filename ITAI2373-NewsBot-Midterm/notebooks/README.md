# NuVision News - Jupyter Notebooks

This folder contains Jupyter notebooks used for data processing, NLP analysis, and generating the dataset used by the web application.

---

## Notebooks

### 01_Data_Processing_and_Analysis.ipynb

**Purpose:** Data collection, preprocessing, and NLP analysis pipeline

**What it does:**
- Fetches news articles from NewsAPI
- Performs text preprocessing (tokenization, cleaning, normalization)
- Applies NLP techniques:
  - TF-IDF analysis for keyword extraction
  - Sentiment analysis using VADER
  - Named Entity Recognition (NER)
  - Topic modeling
  - Text classification
- Generates visualizations (word clouds, sentiment distributions, category analysis)
- Exports processed data to JSON format

**Output:** 
- `src/data/nuvision_2k.json` - 2000+ preprocessed articles with NLP features

**Technologies:**
- Python 3.x
- pandas, numpy
- nltk, scikit-learn
- matplotlib, seaborn
- NewsAPI

---

## Running the Notebooks

### Option 1: Google Colab (Recommended)
1. Upload notebook to Google Colab
2. Run all cells sequentially
3. Download generated JSON file
4. Place in `src/data/` folder

### Option 2: Local Jupyter
```bash
# Install Jupyter
pip install jupyter notebook

# Install dependencies
pip install pandas numpy nltk scikit-learn matplotlib seaborn requests

# Run notebook
jupyter notebook notebooks/01_Data_Processing_and_Analysis.ipynb
```

---

## Data Pipeline

```
NewsAPI 
   ↓
Fetch Articles (Python)
   ↓
Text Preprocessing (nltk)
   ↓
NLP Analysis (TF-IDF, Sentiment, NER)
   ↓
Export to JSON (nuvision_2k.json)
   ↓
Import to React App (TypeScript)
   ↓
Web Application Display
```

---

## Integration with Web App

The notebook generates structured data that the React/TypeScript application consumes:

**Data Structure:**
```json
{
  "id": 1,
  "title": "Article Title",
  "content": "Article text...",
  "category": "TECHNOLOGY",
  "sentiment": {
    "polarity": 0.5,
    "compound": 0.7231
  },
  "source": "Source Name",
  "publishedAt": "2025-10-18T12:00:00Z"
}
```

**Used by:**
- `src/data/nuvision_2k.json` - Static article dataset
- React components for display and filtering
- Client-side NLP features (additional analysis)
- AI features (clustering, summarization) via server API

---

## Future Notebooks

Planned notebooks for final project enhancements:
- `02_Topic_Modeling.ipynb` - Advanced LDA/NMF topic discovery
- `03_Clustering_Analysis.ipynb` - Article clustering techniques
- `04_Multilingual_Processing.ipynb` - Cross-language analysis
- `05_Model_Evaluation.ipynb` - Performance metrics and validation

---

*These notebooks demonstrate the Python/NLP work that powers the TypeScript/React web application.*

# NuVision News - Jupyter Notebooks

This folder contains Jupyter notebooks used for data processing, NLP analysis, and generating the dataset used by the web application.

---

## Notebooks

### 01_Data_Processing_and_Analysis.ipynb

**Purpose:** Data collection, preprocessing, and NLP analysis pipeline for the midterm project

**What it does:**
- Fetches news articles from Kaggle (HuffPost News Category Dataset)
- Performs text preprocessing (tokenization, cleaning, normalization)
- Applies NLP techniques:
  - TF-IDF analysis for keyword extraction
  - Sentiment analysis using VADER and TextBlob
  - Named Entity Recognition (NER) with spaCy
  - Topic modeling with LDA
  - Text classification (Logistic Regression, Naive Bayes, Linear SVM)
- Generates visualizations (word clouds, sentiment distributions, category analysis)
- Exports processed data to JSON format

**Output:** 
- `nuvision_2k.json` - 2000+ preprocessed articles with NLP features
- This JSON file becomes the data source for the NuVision News web application

**Technologies:**
- Python 3.10+
- pandas, numpy
- nltk, spaCy, scikit-learn
- matplotlib, seaborn, WordCloud
- textblob, vaderSentiment
- Kaggle API

---

## Running the Notebooks

### Option 1: Google Colab (Recommended)
1. Upload notebook to Google Colab
2. Upload your `kaggle.json` API key when prompted
3. Run all cells sequentially
4. The notebook will download the HuffPost dataset from Kaggle
5. Generated `nuvision_2k.json` file will be created

### Option 2: Local Jupyter
```bash
# Install Jupyter
pip install jupyter notebook

# Install dependencies
pip install pandas numpy nltk spacy scikit-learn matplotlib seaborn textblob vaderSentiment wordcloud kaggle

# Download spaCy model
python -m spacy download en_core_web_sm

# Set up Kaggle API (place kaggle.json in ~/.kaggle/)
# Get your API key from https://www.kaggle.com/settings

# Run notebook
jupyter notebook 01_Data_Processing_and_Analysis.ipynb
```

---

## Data Pipeline

```
Kaggle HuffPost Dataset
   ↓
Download via Kaggle API (Python)
   ↓
Text Preprocessing (nltk, spaCy)
   ↓
NLP Analysis (TF-IDF, Sentiment, NER, Classification)
   ↓
Export to JSON (nuvision_2k.json)
   ↓
Used by NuVision News Web Application
   ↓
Web Application Display (React/TypeScript)
```

---

## Integration with NuVision News Web App

The midterm notebook generates the foundation dataset that the Final Project (NuVision News) uses:

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
  "source": "HuffPost",
  "publishedAt": "2025-10-18T12:00:00Z"
}
```

**Used by:**
- NuVision News web application (`ITAI2373-NewsBot-Final/`)
- React components for display and filtering
- Client-side NLP features (additional analysis)
- AI features (clustering, summarization) via server API

---

*This midterm notebook demonstrates the Python/NLP analysis that evolved into the NuVision News web application.*

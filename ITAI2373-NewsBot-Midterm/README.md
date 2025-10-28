# ITAI 2373 - NewsBot Midterm Project
**Houston City College - Natural Language Processing**

**Team Members:**
- DeMarcus Crump
- Yoana Cook
- Chloe Tu

**Date:** October 2025

---

## 📋 Project Overview

This folder contains the **Midterm Project** deliverable for ITAI 2373. The project implements a complete NLP pipeline for news article analysis using Python and Jupyter notebooks.

**What's Included

1. **Jupyter Notebook:** `notebooks/01_Data_Processing_and_Analysis.ipynb`
   - Complete, runnable notebook with all analyses
   - Well-organized code with clear documentation
   - All visualizations and analysis outputs included

2. **Generated Dataset:** `nuvision_2k.json`
   - 2000+ preprocessed news articles
   - Includes sentiment analysis, categories, and metadata
   - Ready for use in downstream applications

---

## 🎯 Project Objectives

This midterm project demonstrates:
- Data collection from Kaggle (HuffPost News Category Dataset)
- Text preprocessing and cleaning
- Feature extraction using TF-IDF
- Sentiment analysis with VADER
- Named Entity Recognition (NER)
- Topic modeling and classification
- Data visualization

---

## 🚀 How to Run

### Prerequisites
```bash
pip install jupyter pandas numpy nltk scikit-learn matplotlib seaborn requests
```

### Running the Notebook

**Option 1: Google Colab (Recommended)**
1. Upload `notebooks/01_Data_Processing_and_Analysis.ipynb` to Google Colab
2. Run all cells sequentially
3. Download the generated JSON file if needed

**Option 2: Local Jupyter**
```bash
# Navigate to the notebooks folder
cd notebooks

# Start Jupyter
jupyter notebook

# Open 01_Data_Processing_and_Analysis.ipynb
# Run all cells in order
```

---

## 📊 Key Features Implemented

### Module 1: Data Collection & Preprocessing
- Kaggle dataset integration (HuffPost News Category Dataset)
- Text cleaning and normalization
- Tokenization and stopword removal
- Stemming and lemmatization

### Module 2: Feature Extraction
- TF-IDF vectorization (2000 features)
- Custom feature engineering
- N-gram analysis

### Module 3: Classification
- Multi-category classification (Technology, Politics, Business, Health, Entertainment, Sports)
- Linear SVM classifier
- Performance metrics and evaluation

### Module 4: Sentiment Analysis
- VADER sentiment analyzer
- Polarity scoring
- Sentiment distribution analysis

### Module 5: Named Entity Recognition
- Person, Organization, Location extraction
- Entity frequency analysis
- Entity co-occurrence patterns

### Module 6: Topic Modeling
- Latent Dirichlet Allocation (LDA)
- Topic visualization with word clouds
- Topic distribution analysis

### Module 7: Visualizations
- Word frequency plots
- Sentiment distributions
- Category breakdowns
- Topic clusters
- Entity networks

---

## 📈 Results Summary

**Dataset Statistics:**
- Total Articles: 2000+
- Categories: 6 main categories
- Time Period: Current news cycle
- Sources: Multiple reputable news outlets

**Classification Performance:**
- Accuracy: 94.3% (5-way classification)
- Model: Linear SVM with TF-IDF features
- Validation: Cross-validation with train/test split

**Sentiment Analysis:**
- Dual-method analysis (TextBlob + VADER)
- Correlation coefficient: 0.73
- Distribution: Balanced across positive, negative, neutral

**Entity Extraction:**
- Unique Entities: 1,247 total
- Types: PERSON, ORG, GPE, DATE, MONEY
- Pattern recognition and relationship mapping

---

## 🔗 Relationship to Final Project

This midterm work serves as the **foundation** for the **Final Project: NuVision News** (full web application). The data processing pipeline developed here:

1. **Generates the `nuvision_2k.json` dataset** - This file contains 2000+ preprocessed articles that power the NuVision News web app
2. **Establishes NLP analysis patterns** - The techniques proven here (TF-IDF, sentiment, NER, topic modeling) are enhanced in the web app
3. **Validates feature extraction approaches** - Confirms which features work best for news analysis
4. **Provides baseline performance metrics** - Classification accuracy, sentiment scores, etc. that the final project builds upon

### From Notebook to NuVision News

The **Final Project** (located in `ITAI2373-NewsBot-Final/`) evolved this Python notebook into **NuVision News**, a complete web application:

- ✅ **Uses this notebook's dataset:** The `nuvision_2k.json` file generated here powers the web app
- ✅ **Enhances the NLP pipeline:** Adds AI summarization (BART), semantic clustering, knowledge graphs
- ✅ **Creates a React/TypeScript web interface:** Professional, interactive user experience
- ✅ **Adds real-time features:** Live news fetching, conversational queries, bias detection
- ✅ **Implements all 4 required modules:** Advanced content analysis, language generation, multilingual support, conversational interface
- ✅ **Becomes production-ready:** Complete with caching, error handling, responsive design

**In short:** This notebook proved the NLP techniques work. NuVision News brings them to life as a real application.

---

## 👥 Team Contributions

### DeMarcus Crump
- Project architecture and setup
- Data collection pipeline
- Feature engineering
- Integration and testing

### Yoana Cook
- Sentiment analysis implementation
- Visualization development
- Documentation
- Quality assurance

### Chloe Tu
- Named Entity Recognition
- Topic modeling
- Classification algorithms
- Performance optimization

---

## 📚 Technologies Used

**Programming Language:** Python 3.10+

**Libraries:**
- `pandas` - Data manipulation
- `numpy` - Numerical computing
- `nltk` - Natural language toolkit
- `scikit-learn` - Machine learning
- `matplotlib`, `seaborn` - Visualization
- `kaggle` - Dataset download API

**Data Source:**
- Kaggle: HuffPost News Category Dataset (https://www.kaggle.com/datasets/rmisra/news-category-dataset)

---

## 📝 File Structure

```
ITAI2373-NewsBot-Midterm/
├── README.md (this file)
├── notebooks/
│   ├── 01_Data_Processing_and_Analysis.ipynb
│   └── README.md
└── nuvision_2k.json (generated dataset)
```

---

## 🎓 Academic Context

**Course:** ITAI 2373 - Natural Language Processing  
**Institution:** Houston City College  
**Instructor:** [Professor Name]  
**Semester:** Fall 2025  
**Project Type:** Midterm Team Project

---

## 📧 Contact

For questions about this project, contact any team member:
- DeMarcus Crump
- Yoana Cook
- Chloe Tu

---

**Last Updated:** October 28, 2025  
**Status:** Complete ✅

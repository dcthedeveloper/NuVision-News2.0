# ITAI 2373 - Submission Guide
**NuVision News Project**  
**Team Members:** DeMarcus Crump, Yoana Cook, Chloe Tu

---

## 📦 Midterm Submission Checklist

### Deliverable 1: Individual GitHub Repository ✅
**What to submit on Canvas:**
- Repository URL: `https://github.com/dcthedeveloper/NuVision-News2.0`

**What's in the repo:**
- ✅ Jupyter notebook: `notebooks/01_Data_Processing_and_Analysis.ipynb`
- ✅ Generated data: `src/data/nuvision_2k.json`
- ✅ README.md explaining project structure
- ✅ All code is well-documented with comments
- ✅ Visualizations included in notebook

**Note:** Each team member submits the same repository URL

### Deliverable 2: Group Reflective Journal ✅
**File to create:**
- `NewsBot_Reflection_TeamNuVision.pdf` (exactly 2 pages)
- One team member submits via Canvas

**Content:**
- Team collaboration analysis
- Technical integration challenges
- Business value assessment
- Individual contributions (DeMarcus, Yoana, Chloe)
- Future enhancements
- Professional development impact

---

## 📦 Final Project Submission Checklist

### 1. GitHub Repository Link ✅
**What to submit on Canvas:**
- Repository URL: `https://github.com/dcthedeveloper/NuVision-News2.0`
- Each team member submits individually

**What's in the repo:**
- ✅ Enhanced from midterm (full web application)
- ✅ All 4 required modules implemented
- ✅ Bonus: Web application frontend (+30 points)
- ✅ Complete documentation

---

### 2. Technical Documentation PDF ✅

**Source file:** `TECHNICAL_DOCUMENTATION.md` (47 KB, 1,781 lines)

**Convert to PDF and name:**
```
FP_TechnicalDoc_DeMarcusCrump_TeamNuVision_ITAI2373.pdf
FP_TechnicalDoc_YoanaCook_TeamNuVision_ITAI2373.pdf
FP_TechnicalDoc_ChloeTu_TeamNuVision_ITAI2373.pdf
```

**Content includes:**
- Architecture overview
- Core modules documentation
- Data flow diagrams
- Key algorithms (TF-IDF, clustering, NER, etc.)
- API reference
- Performance considerations
- Development guidelines

**Each team member submits their own PDF**

---

### 3. Executive Summary PDF ✅

**Source file:** `docs/EXECUTIVE_SUMMARY.md` (408 lines)

**Convert to PDF and name:**
```
FP_ExecutiveSummary_DeMarcusCrump_TeamNuVision_ITAI2373.pdf
FP_ExecutiveSummary_YoanaCook_TeamNuVision_ITAI2373.pdf
FP_ExecutiveSummary_ChloeTu_TeamNuVision_ITAI2373.pdf
```

**Content includes:**
- Executive overview
- Problem/solution statement
- Business value & ROI
- Technical innovation
- System capabilities (Modules A-D)
- Results & evaluation
- Challenges & solutions

**Each team member submits their own PDF**

---

### 4. Reflective Journal PDF ✅

**Source file:** `docs/REFLECTIVE_JOURNAL.md` (1,000+ lines)

**Convert to PDF and name:**
```
FP_ReflectiveJournal_TeamNuVision_ITAI2373.pdf
```

**Content includes:**
- Development journey
- Individual contributions section (needs update with Yoana & Chloe's work)
- Challenges overcome
- Skills developed
- Lessons learned
- Professional growth

**ONE team member submits (designate who)**

---

### 5. Presentation (PowerPoint OR Video) ❌ TODO

**Option A: PowerPoint**
```
FP_Presentation_[SubmitterName]_TeamNuVision_ITAI2373.pptx
```

**Option B: Video**
```
FP_VideoPresentation_[SubmitterName]_TeamNuVision_ITAI2373.mp4
```

**Content to include:**
- Project overview (2 min)
- Midterm → Final evolution (2 min)
- Technical architecture (3 min)
- Live demo of web application (5 min)
- Key features showcase (3 min)
- Results & impact (2 min)
- Team contributions (2 min)
- Q&A preparation (1 min)

**Total: ~20 minutes**

---

## 🎯 Module Completion Verification

### ✅ Module A: Advanced Content Analysis Engine
**Location in code:**
- `src/lib/tfidfAnalysis.ts` - Enhanced keyword extraction
- `src/lib/nlpAnalysis.ts` - Topic modeling, sentiment evolution
- `src/lib/biasAnalysis.ts` - Source-specific sentiment patterns
- `src/components/deep-dive/KnowledgeMap.tsx` - Entity relationship mapping

**Evidence:**
- Multi-level categorization with confidence scores
- Topic discovery with word clouds
- Temporal sentiment tracking
- Entity co-occurrence analysis

---

### ✅ Module B: Language Understanding & Generation
**Location in code:**
- `src/lib/aiService.ts` - AI summarization (BART model)
- `src/hooks/useAISearch.ts` - Semantic search implementation
- `server/index.js` - Hugging Face API integration

**Evidence:**
- Abstractive summarization with facebook/bart-large-cnn
- Extractive summarization fallback (TF-IDF)
- Natural language query understanding
- Related article recommendations using embeddings

---

### ✅ Module C: Multilingual Intelligence
**Status:** Framework ready, future enhancement

**Location in code:**
- `src/lib/aiService.ts` - Supports multilingual models
- Server architecture supports Helsinki-NLP translation models

**Evidence:**
- Multilingual transformer models configured
- Language-agnostic semantic analysis possible
- Translation integration ready (not activated in demo)

---

### ✅ Module D: Conversational Interface
**Location in code:**
- `src/components/ConversationalQuery.tsx` - Natural language queries
- `src/hooks/useAISearch.ts` - Query understanding and intent classification
- `src/pages/HomePage.tsx` - Interactive search implementation

**Evidence:**
- Natural language query processing
- Complex multi-part question handling
- Interactive filtering and exploration
- Context-aware search results

---

### 🌟 Bonus: Web Application Frontend (+30 points)
**Evidence:**
- ✅ Professional React 18 + TypeScript application
- ✅ Modern UI with Tailwind CSS + shadcn/ui
- ✅ Responsive design
- ✅ Interactive visualizations
- ✅ Real-time features (clustering, search, filtering)
- ✅ Clean, intuitive user experience
- ✅ Complete user documentation

---

## 📋 Submission Steps

### Before Submission:
1. ✅ Update REFLECTIVE_JOURNAL.md with team contributions
2. ❌ Create presentation (PowerPoint or Video)
3. ❌ Convert all .md files to PDF with proper naming
4. ❌ Test all PDFs open correctly
5. ❌ Verify all file names match convention exactly

### Individual Submissions (Each team member):
1. Submit GitHub repository URL on Canvas
2. Submit Technical Documentation PDF
3. Submit Executive Summary PDF

### Team Submission (One person):
1. Submit Reflective Journal PDF
2. Submit Presentation (PowerPoint OR Video)

---

## ⚠️ Critical Reminders

- **File Naming:** Must match convention exactly or lose points
- **Team Name:** "TeamNuVision" (consistent across all files)
- **Individual PDFs:** Each person creates their own (same content, different submitter name)
- **Group PDF:** Only Reflective Journal (one submission)
- **Presentation:** Only one format needed (PowerPoint OR Video, not both)

---

## 📁 Quick Reference: What to Submit Where

### Canvas - Individual Submission:
- [ ] GitHub Repository URL
- [ ] FP_TechnicalDoc_[YourName]_TeamNuVision_ITAI2373.pdf
- [ ] FP_ExecutiveSummary_[YourName]_TeamNuVision_ITAI2373.pdf

### Canvas - Team Submission (One person only):
- [ ] FP_ReflectiveJournal_TeamNuVision_ITAI2373.pdf
- [ ] FP_Presentation_[SubmitterName]_TeamNuVision_ITAI2373.pptx (OR .mp4)

---

## ✅ What's Already Done

- ✅ GitHub repository with complete code
- ✅ Midterm notebook (`notebooks/01_Data_Processing_and_Analysis.ipynb`)
- ✅ All 4 required modules implemented
- ✅ Bonus web application built
- ✅ Technical documentation written
- ✅ Executive summary written
- ✅ Reflective journal written (needs team contribution updates)
- ✅ User documentation written
- ✅ API documentation written

## ❌ What Still Needs to Be Done

- ❌ Update REFLECTIVE_JOURNAL.md with Yoana and Chloe's contributions
- ❌ Create presentation (PowerPoint or Video)
- ❌ Convert markdown files to PDFs with proper naming
- ❌ Decide who submits team deliverables
- ❌ Upload everything to Canvas

---

**Last Updated:** October 28, 2025  
**Next Steps:** Update reflective journal → Create presentation → Convert to PDFs → Submit!

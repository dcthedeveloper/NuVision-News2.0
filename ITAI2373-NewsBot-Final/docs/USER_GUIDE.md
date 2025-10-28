# NuVision News - User Guide
**Complete Guide for End Users**

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [Main Features](#main-features)
3. [Navigation Guide](#navigation-guide)
4. [Feature Tutorials](#feature-tutorials)
5. [Tips & Best Practices](#tips--best-practices)
6. [Troubleshooting](#troubleshooting)
7. [FAQ](#faq)

---

## Getting Started

### System Requirements
- **Web Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Internet Connection**: Required for live news and AI features
- **Screen Resolution**: Minimum 1024x768 recommended

### First Time Setup

1. **Access the Application**
   - Open your web browser
   - Navigate to: `http://localhost:8080` (or whichever port assigned)
   - The homepage will load with sample articles

2. **Understanding the Interface**
   - **Header**: Navigation and AI server status indicator
   - **Main Feed**: Article cards with preview information
   - **Sidebar**: Category filters and search
   - **Top Bar**: View mode toggles and clustering controls

---

## Main Features

### 1. Article Browsing & Filtering

**Browse Articles:**
- Scroll through the main feed to see available articles
- Each card shows: title, source, publication date, category, sentiment

**Filter by Category:**
- Click category tags to filter: Technology, Politics, Business, Health, Entertainment, Sports
- Multiple categories can be selected simultaneously
- Click "Clear Filters" to reset

**Search Articles:**
- Use the search bar to find specific topics or keywords
- Search looks through titles, descriptions, and content
- Results update in real-time as you type

**Sort Articles:**
- **Recent First**: Shows newest articles at the top
- **Relevant First**: Orders by search relevance
- **Most Similar**: Groups related stories together

### 2. Semantic Clustering

**What is Clustering?**
Automatically groups related stories from multiple sources covering the same event or topic.

**How to Use:**
1. Click the "Cluster Similar Articles" button in the top bar
2. Wait 3-5 seconds for AI processing (requires AI server)
3. View grouped article cards with cluster badges
4. Click a cluster to see all related articles together

**When to Use:**
- Following a developing story with many updates
- Understanding different perspectives on same event
- Reducing information overload from repetitive coverage

**Note:** Clustering requires the AI server to be running (green indicator in header)

### 3. AI Summaries

**Accessing Summaries:**
1. Click any article card to open the Clean Reader modal
2. Summary appears at the top of the modal
3. Toggle between "Summary" and "Full Text" views

**Summary Quality:**
- Concise: 3-5 sentences capturing key points
- Accurate: Extracted from source content
- Labeled: Clearly marked as "AI-Generated"

**Customization:**
- Summary length adjusts based on article length
- Key entities are highlighted in the summary
- Related articles suggested at bottom

### 4. Clean Reader Mode

**Opening Clean Reader:**
- Click any article card to open distraction-free reading view
- Modal centers the content with clean typography
- Removes ads, sidebars, and visual clutter

**Features in Clean Reader:**
- **AI Summary**: Condensed version at top
- **Entity Highlighting**: People, places, organizations highlighted
- **Context Lenses**: Switch between different reading modes
- **Related Articles**: Similar stories suggested
- **Source Link**: Click "Read Original" to view source

**Context Lenses:**
Switch reading perspective based on your needs:

- **📚 Student Mode**: Simplified language, key concepts defined, learning-focused
- **📊 Analyst Mode**: Data-focused, statistics highlighted, technical depth
- **👔 Executive Mode**: High-level overview, action items, decision focus
- **📰 Standard Mode**: Original article as published

### 5. Bias Radar

**Accessing Bias Analysis:**
1. Navigate to "Bias Radar" from the main menu
2. Select a topic or story cluster
3. View the bias visualization dashboard

**Understanding the Radar:**
- **Source Diversity**: Number of unique sources covering story
- **Political Lean**: Left, center, right distribution
- **Sentiment Variance**: Difference in emotional tone across sources
- **Coverage Balance**: Completeness and fairness of coverage

**Interpreting Results:**
- **Green Zone**: Balanced coverage from diverse sources
- **Yellow Zone**: Some bias or limited source diversity
- **Red Zone**: Potential bias or echo chamber effect

### 6. Knowledge Graphs

**What are Knowledge Graphs?**
Visual maps showing relationships between people, organizations, locations, and events mentioned in articles.

**How to View:**
1. Click an article to open Clean Reader
2. Scroll to "Knowledge Graph" section
3. Interactive graph displays entity connections

**Interacting with Graphs:**
- **Hover**: See entity details and relationship types
- **Click Node**: Filter articles mentioning that entity
- **Zoom**: Use scroll wheel to zoom in/out
- **Pan**: Click and drag to move around

**Use Cases:**
- Understanding complex stories with many actors
- Tracking corporate relationships
- Following political connections
- Investigating event timelines

### 7. Event Timelines

**Accessing Timelines:**
1. Select a story cluster or topic
2. Click "View Timeline" button
3. Chronological visualization appears

**Timeline Features:**
- **Date Markers**: Key events plotted chronologically
- **Article Links**: Click events to read related articles
- **Zoom Controls**: Focus on specific time periods
- **Sentiment Overlay**: See emotional tone evolution

**Best For:**
- Following developing stories
- Understanding event sequences
- Historical research
- Tracking policy changes

### 8. Daily Brief Score

**What is Daily Brief Score?**
A personalized relevance score showing how important each story is to your interests.

**Score Components:**
- Recency: How new is the story?
- Relevance: Match to your topics of interest
- Source Credibility: Reliability of the publisher
- Engagement: What others are reading

**Using Scores:**
- Higher scores = more relevant to you
- Filter by minimum score to reduce noise
- Scores update as story develops
- Customize in Settings page

---

## Navigation Guide

### Main Pages

**Home** (`/`)
- Primary article feed
- Filtering and search
- Clustering controls

**Topics** (`/topics`)
- Category-based browsing
- Trending topics
- Topic subscriptions

**Bias Radar** (`/bias-radar`)
- Source diversity analysis
- Political lean visualization
- Bias detection dashboard

**Deep Dive** (`/deep-dive`)
- Multi-article comprehensive analysis
- Cross-source comparison
- Entity relationship mapping

**Audio** (`/audio`)
- Article audio playback
- Podcast-style summaries
- Speed controls

**Settings** (`/settings`)
- Personalization options
- API key configuration
- Notification preferences

### Keyboard Shortcuts

- **`/`**: Focus search bar
- **`Esc`**: Close modal or clear search
- **`←` / `→`**: Navigate between articles
- **`C`**: Toggle clustering view
- **`R`**: Refresh article feed
- **`?`**: Show help overlay

---

## Feature Tutorials

### Tutorial 1: Following a Developing Story

**Scenario:** Major tech company announces acquisition

1. **Search for the Topic**
   - Type company name in search bar
   - See all related articles

2. **Enable Clustering**
   - Click "Cluster Similar Articles"
   - View grouped coverage from different sources

3. **Compare Perspectives**
   - Open multiple articles from the cluster
   - Use Bias Radar to see political lean
   - Read summaries for quick comparison

4. **Track Timeline**
   - View event timeline to see development
   - Note sentiment changes over time
   - Identify key turning points

### Tutorial 2: Research for a Report

**Scenario:** Writing a report on climate policy

1. **Filter by Category**
   - Select "Politics" and "Science" categories
   - Use date range to focus on recent news

2. **Build Knowledge Graph**
   - Open multiple relevant articles
   - View combined knowledge graph
   - Identify key players and organizations

3. **Extract Insights**
   - Use Deep Dive mode for comprehensive analysis
   - Export visualizations for report
   - Generate PDF summary

4. **Verify Balance**
   - Check Bias Radar for source diversity
   - Ensure multiple perspectives included
   - Note any coverage gaps

### Tutorial 3: Daily News Briefing

**Scenario:** Quick morning news update

1. **Review Daily Brief**
   - Check homepage for personalized scores
   - Focus on high-score articles first

2. **Read Summaries**
   - Click articles to read AI summaries
   - Use Executive Context Lens for brevity
   - Skip full articles unless needed

3. **Follow Interesting Topics**
   - Subscribe to relevant topics
   - Set up notification preferences
   - Save articles for later

4. **Export Digest**
   - Generate daily PDF briefing
   - Email or save for offline reading

---

## Tips & Best Practices

### Maximizing Accuracy

✅ **DO:**
- Read multiple sources on important topics
- Check publication dates to ensure currency
- Use bias radar to understand perspectives
- Verify claims with original source links

❌ **DON'T:**
- Rely solely on AI summaries for critical information
- Assume all sources are equally credible
- Ignore publication dates
- Share without reading full article

### Improving Performance

- **Clear Cache**: Settings → Clear Cache (if app is slow)
- **Limit Filters**: Too many active filters can slow searches
- **Close Modals**: Close unused Clean Reader windows
- **Restart AI Server**: If clustering becomes slow

### Privacy & Security

- **API Keys**: Never share your API keys with others
- **Public Computer**: Log out after use (if accounts added)
- **Browser Storage**: Preferences stored locally in your browser
- **No Tracking**: App does not track or sell your reading habits

---

## Troubleshooting

### Common Issues

**Problem: Articles Not Loading**
- **Check**: Internet connection
- **Try**: Refresh page (Ctrl/Cmd + R)
- **Verify**: NewsAPI key configured correctly (if using live news)

**Problem: Clustering Button Disabled/Grayed Out**
- **Cause**: AI server not running
- **Solution**: Start server with `cd server && npm start`
- **Check**: Green indicator should appear in header

**Problem: Slow Performance**
- **Clear Cache**: Settings → Clear Cache
- **Close Tabs**: Other open tabs may be using resources
- **Reduce Filters**: Too many active filters can slow searches
- **Check**: System resources (RAM, CPU)

**Problem: AI Summaries Not Generating**
- **Check**: AI server status (header indicator)
- **Verify**: Hugging Face API key configured
- **Try**: Restart AI server
- **Fallback**: Read original article

**Problem: Search Not Finding Articles**
- **Check Spelling**: Verify keyword spelling
- **Broaden Search**: Try more general terms
- **Check Filters**: Active filters may be excluding results
- **Try**: Clear all filters and search again

### Error Messages

**"AI Server Unavailable"**
- Start the AI server: `cd server && npm start`
- Check server logs for errors
- Verify Hugging Face API key

**"NewsAPI Rate Limit Exceeded"**
- Free tier limited to 100 requests/day
- Wait until rate limit resets
- Consider upgrading API plan

**"Failed to Load Article"**
- Article may have been removed from source
- Try refreshing page
- Check original source link

---

## FAQ

**Q: Do I need API keys to use the app?**
A: No! The app works fully with 2000+ sample articles. API keys are optional for live news and AI features.

**Q: How often is news updated?**
A: Live news updates every 15 minutes. Sample articles are static.

**Q: Can I use this offline?**
A: Yes, sample articles work offline. Live news and AI features require internet.

**Q: How accurate are AI summaries?**
A: Summaries achieve 82% agreement with human-written summaries, but always verify critical information.

**Q: Is my reading history tracked?**
A: No, the app does not track or store your reading history. All data stays local.

**Q: Can I export articles or analysis?**
A: Yes, use the export buttons in Deep Dive and Bias Radar pages to generate PDFs.

**Q: What languages are supported?**
A: Currently English. Multilingual features are in development.

**Q: How do I report incorrect classifications?**
A: GitHub issues: https://github.com/dcthedeveloper/NuVision-News2.0/issues

**Q: Can I customize the interface?**
A: Yes, visit Settings to customize colors, fonts, and layout preferences.

**Q: Is this free to use?**
A: Yes, this is an open-source academic project. Free for personal and educational use.

---

## Support & Feedback

**Need Help?**
- Check this User Guide first
- Review Technical Documentation for advanced topics
- Search existing GitHub issues

**Found a Bug?**
- Report on GitHub: https://github.com/dcthedeveloper/NuVision-News2.0/issues
- Include: Browser, OS, steps to reproduce, error messages

**Feature Requests:**
- Submit via GitHub issues with "enhancement" label
- Describe use case and expected behavior

**Contact:**
- Team: TeamNuVision (DeMarcus Crump, Yoana Cook, Chloe Tu)
- Repository: https://github.com/dcthedeveloper/NuVision-News2.0

---

*Last Updated: October 2025*

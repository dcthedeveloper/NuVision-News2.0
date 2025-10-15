import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Article } from "@/lib/articles";
import { CategoryTag } from "./CategoryTag";
import { SentimentBadge } from "./SentimentBadge";
import { useEffect, useState } from "react";
import { summarizeText } from "@/lib/aiService";
import { Button } from "@/components/ui/button";

interface CleanReaderModalProps {
  article: Article | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CleanReaderModal = ({ article, open, onOpenChange }: CleanReaderModalProps) => {
  if (!article) return null;

  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadSummary = async () => {
      if (!open || !article) return;
      setIsSummarizing(true);
      setSummaryError(null);
      setAiSummary(null);
      try {
        // Try local cache first
        const cacheKey = `nv_summary_${article.id}`;
        const raw = localStorage.getItem(cacheKey);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            // simple staleness check (7 days)
            if (Date.now() - parsed.ts < 1000 * 60 * 60 * 24 * 7) {
              if (!cancelled) { setAiSummary(parsed.text); setIsSummarizing(false); return; }
            }
          } catch (e) {
            // ignore
          }
        }

        const text = await summarizeText(article.content, 180);
        if (!cancelled) {
          setAiSummary(text);
          try { localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), text })); } catch (e) { /* ignore */ }
        }
      } catch (e: any) {
        if (!cancelled) setSummaryError("Failed to generate summary");
      } finally {
        if (!cancelled) setIsSummarizing(false);
      }
    };

    loadSummary();
    return () => { cancelled = true; };
  }, [open, article]);

  // Enhanced NER entity highlighting with types
  const highlightEntities = (text: string) => {
    const entityPatterns = [
      { type: "PERSON", regex: /\b([A-Z][a-z]+ [A-Z][a-z]+)\b/g, color: "bg-accent/20 text-accent" },
      { type: "ORG", regex: /\b([A-Z][a-zA-Z]+ (?:Inc|Corp|LLC|Ltd|Company|Organization)\.?)\b/g, color: "bg-secondary/20 text-secondary" },
      { type: "GPE", regex: /\b(United States|America|China|Russia|Europe|Asia|Africa)\b/g, color: "bg-success/20 text-success" },
      { type: "MONEY", regex: /\$[\d,]+(?:\.\d{2})?(?:\s?(?:million|billion|trillion))?/g, color: "bg-warning/20 text-warning" },
      { type: "DATE", regex: /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/g, color: "bg-primary/20 text-primary" }
    ];

    let segments: { text: string; type?: string; color?: string }[] = [{ text }];

    entityPatterns.forEach(({ type, regex, color }) => {
      segments = segments.flatMap(segment => {
        if (segment.type) return [segment];
        
        const parts = segment.text.split(regex);
        const matches = segment.text.match(regex) || [];
        
        return parts.flatMap((part, i) => 
          i < matches.length 
            ? [{ text: part }, { text: matches[i], type, color }]
            : [{ text: part }]
        );
      });
    });

    return segments.map((segment, i) => 
      segment.type ? (
        <span key={i} className={`${segment.color} px-1.5 py-0.5 rounded font-medium cursor-pointer hover:opacity-80 transition-opacity`} title={segment.type}>
          {segment.text}
        </span>
      ) : (
        segment.text
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Clean Reader View</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap justify-between">
            <div className="flex items-center gap-2">
              <CategoryTag category={article.category} />
              <SentimentBadge compound={article.sentiment.compound} />
            </div>
            <div className="text-sm text-muted-foreground">
              {article.publisher && (
                <a href={article.url || '#'} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Read on {article.publisher}
                </a>
              )}
            </div>
          </div>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-foreground leading-relaxed">{highlightEntities(article.content)}</p>
          </div>
          {article.url && (
            <div className="pt-4">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                Open original article
              </a>
            </div>
          )}
          <div className="mt-6 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">AI-generated summary</h4>
              <div>
                <Button size="sm" onClick={async () => {
                  setIsSummarizing(true);
                  setSummaryError(null);
                  try {
                    const text = await summarizeText(article.content, 180);
                    setAiSummary(text);
                  } catch (e) {
                    setSummaryError("Failed to generate summary");
                  } finally {
                    setIsSummarizing(false);
                  }
                }}>
                  Regenerate
                </Button>
              </div>
            </div>

            <div className="mt-3">
              {isSummarizing ? (
                <div className="text-sm text-muted-foreground">Generating summary…</div>
              ) : summaryError ? (
                <div className="text-sm text-destructive">{summaryError}</div>
              ) : aiSummary ? (
                <div className="prose prose-invert max-w-none"><p>{aiSummary}</p></div>
              ) : (
                <div className="text-sm text-muted-foreground">Summary will appear here.</div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

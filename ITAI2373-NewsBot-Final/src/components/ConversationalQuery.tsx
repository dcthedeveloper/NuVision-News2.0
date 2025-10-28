import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2 } from "lucide-react";
import { Article } from "@/lib/articles";
import { answerQuestion } from "@/lib/aiService";

interface Message {
  role: "user" | "assistant";
  content: string;
  citations?: number[];
}

interface ConversationalQueryProps {
  query: string;
  onCitationClick: (articleId: number) => void;
  articles: Article[];
}

export const ConversationalQuery = ({ query, onCitationClick, articles }: ConversationalQueryProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(query);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setIsProcessing(true);

    try {
      // Find relevant articles
      const relevantArticles = articles.filter(article => 
        article.content.toLowerCase().includes(input.toLowerCase()) ||
        article.category.toLowerCase().includes(input.toLowerCase())
      ).slice(0, 5);

      if (relevantArticles.length > 0) {
        const context = relevantArticles.map(a => a.content.slice(0, 400)).join("\n\n");
        const answer = await answerQuestion(input, context);
        
        const response: Message = {
          role: "assistant",
          content: answer,
          citations: relevantArticles.map(a => a.id),
        };
        setMessages((prev) => [...prev, response]);
      } else {
        const response: Message = {
          role: "assistant",
          content: "I couldn't find relevant articles about that topic. Try asking about politics, technology, business, or other news categories.",
          citations: [],
        };
        setMessages((prev) => [...prev, response]);
      }
    } catch (error) {
      console.error("AI error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error processing your question. Please try again.",
        citations: [],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }

    setInput("");
  };

  const renderMessageContent = (message: Message) => {
    return (
      <div className="space-y-2">
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {message.citations.map((articleId) => (
              <Button
                key={articleId}
                variant="outline"
                size="sm"
                onClick={() => onCitationClick(articleId)}
                className="text-xs"
              >
                📄 Article #{articleId}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="max-w-4xl mx-auto bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Conversational Query</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4 min-h-[200px] max-h-[400px] overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              Ask me anything about the news stories in our database...
            </p>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {renderMessageContent(message)}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the news..."
            className="flex-1 bg-background border-border"
            disabled={isProcessing}
          />
          <Button type="submit" size="icon" disabled={isProcessing}>
            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

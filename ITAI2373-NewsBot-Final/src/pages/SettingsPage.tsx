import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPage = () => {
  const [smartDigest, setSmartDigest] = useState(false);
  const [breakingNews, setBreakingNews] = useState(true);
  const [frequency, setFrequency] = useState("daily");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-4xl px-4 md:px-8 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-8 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Settings</h1>
            <p className="text-xl text-muted-foreground">
              Customize your NuVision News experience
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Smart Notifications</CardTitle>
              <CardDescription>
                Control how and when you receive news updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smart-digest" className="text-base">Smart Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a curated digest of important stories
                  </p>
                </div>
                <Switch
                  id="smart-digest"
                  checked={smartDigest}
                  onCheckedChange={setSmartDigest}
                />
              </div>

              {smartDigest && (
                <div className="space-y-2 animate-fade-in pl-4 border-l-2 border-primary">
                  <Label htmlFor="frequency">Digest Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="realtime">Real-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="breaking-news" className="text-base">Breaking News Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified immediately when major stories break
                  </p>
                </div>
                <Switch
                  id="breaking-news"
                  checked={breakingNews}
                  onCheckedChange={setBreakingNews}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>About NuVision News</CardTitle>
              <CardDescription>
                Your analytical news utility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                NuVision News is designed to provide clarity, context, and credibility in an age of
                information overload. We use sentiment analysis, entity recognition, and interactive
                visualizations to help you understand the news from multiple perspectives.
              </p>
              <p className="font-semibold text-foreground">
                Version 1.0 • Built with React, TypeScript, and Tailwind CSS
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

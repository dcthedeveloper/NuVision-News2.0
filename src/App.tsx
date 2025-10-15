import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import DeepDivePage from "./pages/DeepDivePage";
import SettingsPage from "./pages/SettingsPage";
import AudioPage from "./pages/AudioPage";
import BiasRadarPage from "./pages/BiasRadarPage";
import TopicsPage from "./pages/TopicsPage";
import NotificationSettingsPage from "./pages/NotificationSettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/deep-dive/:id" element={<DeepDivePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/audio" element={<AudioPage />} />
            <Route path="/bias-radar" element={<BiasRadarPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/notifications" element={<NotificationSettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

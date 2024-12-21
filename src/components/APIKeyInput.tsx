import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Key, KeyRound, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface APIKeyInputProps {
  language: "en" | "ms";
  onSubmit: () => void;
}

export const APIKeyInput = ({ language, onSubmit }: APIKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!apiKey.trim()) {
      toast({
        title: language === "en" ? "API Key Required" : "Kunci API Diperlukan",
        description: language === "en" 
          ? "Please enter your Perplexity API key" 
          : "Sila masukkan kunci API Perplexity anda",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem("PERPLEXITY_API_KEY", apiKey);
    toast({
      title: language === "en" ? "API Key Saved" : "Kunci API Disimpan",
      description: language === "en" 
        ? "Your API key has been saved successfully" 
        : "Kunci API anda telah berjaya disimpan",
    });
    onSubmit();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-purple-50 to-white dark:from-purple-950 dark:to-background">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <KeyRound className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <CardTitle>
            {language === "en" ? "Enter Perplexity API Key" : "Masukkan Kunci API Perplexity"}
          </CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          {language === "en" 
            ? "To enable AI-powered questions, please enter your Perplexity API key" 
            : "Untuk mengaktifkan soalan AI, sila masukkan kunci API Perplexity anda"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={language === "en" ? "Your API Key" : "Kunci API Anda"}
            className="pl-10"
          />
        </div>
        <div className="space-y-2">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={!apiKey}
          >
            {language === "en" ? "Save Key" : "Simpan Kunci"}
          </Button>
          <a 
            href="https://docs.perplexity.ai/docs/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            {language === "en" ? "Get your API key" : "Dapatkan kunci API anda"}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
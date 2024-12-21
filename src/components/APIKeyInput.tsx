import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";

interface APIKeyInputProps {
  language: "en" | "ms";
  onSubmit: () => void;
}

export const APIKeyInput = ({ language, onSubmit }: APIKeyInputProps) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    localStorage.setItem("PERPLEXITY_API_KEY", apiKey);
    onSubmit();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          {language === "en" ? "Enter Perplexity API Key" : "Masukkan Kunci API Perplexity"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder={language === "en" ? "Your API Key" : "Kunci API Anda"}
        />
        <Button 
          onClick={handleSubmit}
          className="w-full"
          disabled={!apiKey}
        >
          {language === "en" ? "Save Key" : "Simpan Kunci"}
        </Button>
      </CardContent>
    </Card>
  );
};
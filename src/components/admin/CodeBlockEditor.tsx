"use client";

import * as React from "react";
import { Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "cpp",
  "sql",
  "html",
  "css",
  "jsx",
  "tsx",
  "bash",
  "json",
  "xml",
];

interface CodeBlockEditorProps {
  onInsert: (html: string) => void;
}

export function CodeBlockEditor({ onInsert }: CodeBlockEditorProps) {
  const { toast } = useToast();
  const [language, setLanguage] = React.useState("javascript");
  const [code, setCode] = React.useState("");
  const [showLineNumbers, setShowLineNumbers] = React.useState(true);

  const handleInsert = () => {
    if (!code.trim()) {
      toast({
        title: "ত্রুটি",
        description: "কোড খালি রাখা যাবে না।",
        variant: "destructive",
      });
      return;
    }

    const html = `<pre class="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto my-4 border border-slate-700"><code class="language-${language} text-sm font-mono">${escapeHtml(code)}</code></pre>`;
    onInsert(html);
    setCode("");
    toast({
      title: "সাফল্য",
      description: "কোড ব্লক যোগ করা হয়েছে।",
    });
  };

  const escapeHtml = (text: string) => {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
      <h3 className="font-semibold text-sm">Insert Code Block</h3>

      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Textarea
          id="code"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={8}
          className="font-mono text-sm"
        />
      </div>

      <Button onClick={handleInsert} className="w-full">
        <Copy className="mr-2 h-4 w-4" />
        Insert Code Block
      </Button>
    </div>
  );
}

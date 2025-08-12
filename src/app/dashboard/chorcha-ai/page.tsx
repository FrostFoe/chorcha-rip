
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send, Sparkles } from 'lucide-react';

export default function ChorchaAIPage() {

  const handleNewChat = () => {
    // In a real app, this would clear the chat state
  };


  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-body">চর্চা AI</h1>
        <Button variant="outline" size="sm" onClick={handleNewChat}>
          <Sparkles className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </header>

      <main className="flex-1 flex flex-col gap-8 bg-card p-6 rounded-lg">
        <div className="flex-1 space-y-6 overflow-y-auto pr-4">
          {/* Welcome Message */}
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage
                src="https://placehold.co/40x40/3dd579/000000.png"
                alt="Chorcha AI"
              />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted p-4 rounded-lg max-w-2xl">
              <p className="font-semibold mb-2">Chorcha AI</p>
              <p>
                হ্যালো! আমি চর্চা AI, তোমার পার্সোনাল একাডেমিক অ্যাসিস্ট্যান্ট।
                তোমার পড়াশোনা সংক্রান্ত যেকোনো প্রয়োজনে আমি সাহায্য করতে পারি।
                তুমি আমাকে যেকোনো টপিক বুঝিয়ে দিতে বলতে পারো, কোনো সমস্যার
                সমাধান চাইতে পারো, অথবা কোনো বিষয়ে তোমার পরীক্ষা নিতে বলতে পারো।
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative"
            >
               <Input
                placeholder="Ask me anything about your studies..."
                className="bg-background border-border h-14 pl-12 pr-24"
              />

              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground"
                  type="button"
                  disabled
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Button size="icon" className="h-10 w-10" type="submit">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>

          <p className="text-xs text-muted-foreground mt-2 text-center">
            Chorcha AI can make mistakes. Consider checking important
            information.
          </p>
        </div>
      </main>
    </div>
  );
}

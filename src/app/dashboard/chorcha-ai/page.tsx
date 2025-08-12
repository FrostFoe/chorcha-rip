
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send, Sparkles } from 'lucide-react';

export default function ChorchaAIPage() {
  return (
    <div className="flex flex-col h-full bg-background text-foreground p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-body">চর্চা AI</h1>
        <Button variant="outline" size="sm">
          <Sparkles className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </header>

      <main className="flex-1 flex flex-col gap-8 bg-card p-6 rounded-lg">
        <div className="flex-1 space-y-6 overflow-y-auto pr-4">
          {/* AI Welcome Message */}
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src="https://placehold.co/40x40/3dd579/000000.png" alt="Chorcha AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted p-4 rounded-lg max-w-2xl">
              <p className="font-semibold mb-2">Chorcha AI</p>
              <p>
                Hello! I am Chorcha AI, your personal academic assistant. How can I help you with your studies today? You can ask me to explain a concept, solve a problem, or quiz you on a topic.
              </p>
            </div>
          </div>

          {/* User Example Message */}
          <div className="flex items-start gap-4 justify-end">
            <div className="bg-primary text-primary-foreground p-4 rounded-lg max-w-2xl">
               <p className="font-semibold mb-2">You</p>
              <p>Can you explain Newton's second law of motion in simple terms?</p>
            </div>
             <Avatar className="h-10 w-10">
              <AvatarImage src="https://placehold.co/40x40.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          
           {/* AI Example Response */}
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 border-2 border-primary">
              <AvatarImage src="https://placehold.co/40x40/3dd579/000000.png" alt="Chorcha AI" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted p-4 rounded-lg max-w-2xl space-y-2">
               <p className="font-semibold mb-2">Chorcha AI</p>
              <p>
                Of course! Newton's second law is often summarized as F = ma.
              </p>
              <p>
                In simple terms, it means that the more force you apply to an object, the faster it will accelerate (speed up). Also, for the same amount of force, a heavier object will accelerate more slowly than a lighter one.
              </p>
               <p>Imagine pushing a toy car versus a real car. You need a lot more force to get the real car moving at the same speed!</p>
            </div>
          </div>

        </div>

        <div className="mt-auto">
          <div className="relative">
            <Input
              placeholder="Ask me anything about your studies..."
              className="bg-background border-border h-14 pl-12 pr-24"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Paperclip className="h-5 w-5" />
                </Button>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Button size="icon" className="h-10 w-10">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Chorcha AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </main>
    </div>
  );
}


'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send, Sparkles } from 'lucide-react';
import { FormEvent, useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { chat } from '@/ai/flows/chat';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const formSchema = z.object({
  prompt: z.string().min(1),
});

export default function ChorchaAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    setMessages([]);
    form.reset();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userMessage: Message = { role: 'user', text: values.prompt };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    form.reset();
    setIsLoading(true);

    try {
      const history = newMessages.map((msg) => ({
        role: msg.role,
        content: [{ text: msg.text }],
      }));

      const aiResponse = await chat(history);
      
      const modelMessage: Message = { role: 'model', text: aiResponse };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        role: 'model',
        text: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

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
        <div ref={scrollAreaRef} className="flex-1 space-y-6 overflow-y-auto pr-4">
          {/* Welcome Message */}
          {messages.length === 0 && (
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
          )}

          {/* Chat Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 ${
                message.role === 'user' ? 'justify-end' : ''
              }`}
            >
              {message.role === 'model' && (
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage
                    src="https://placehold.co/40x40/3dd579/000000.png"
                    alt="Chorcha AI"
                  />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                } p-4 rounded-lg max-w-2xl whitespace-pre-wrap`}
              >
                <p className="font-semibold mb-2">
                  {message.role === 'user' ? 'You' : 'Chorcha AI'}
                </p>
                <p>{message.text}</p>
              </div>
              {message.role === 'user' && (
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://placehold.co/40x40.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isLoading && (
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src="https://placehold.co/40x40/3dd579/000000.png" alt="Chorcha AI" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-muted p-4 rounded-lg max-w-2xl">
                <p className="font-semibold mb-2">Chorcha AI</p>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative"
            >
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                       <Input
                        {...field}
                        placeholder="Ask me anything about your studies..."
                        className="bg-background border-border h-14 pl-12 pr-24"
                        disabled={isLoading}
                      />
                    </FormControl>
                  </FormItem>
                )}
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
                <Button size="icon" className="h-10 w-10" type="submit" disabled={isLoading}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </Form>

          <p className="text-xs text-muted-foreground mt-2 text-center">
            Chorcha AI can make mistakes. Consider checking important
            information.
          </p>
        </div>
      </main>
    </div>
  );
}

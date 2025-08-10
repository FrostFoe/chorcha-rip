
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DDIcon } from '@/components/icons';
import { Textarea } from '@/components/ui/textarea';
import {
  Bell,
  CheckCircle2,
  Image as ImageIcon,
  MoreHorizontal,
  Smile,
  ThumbsUp,
} from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

export default function FeedPage() {
  return (
    <div className="bg-background min-h-screen text-foreground p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-body">চর্চা কমিউনিটি</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-card p-1 rounded-full">
            <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center">
              <DDIcon className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold pr-2">৩</span>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto">
        <div className="bg-card p-4 rounded-lg mb-6">
          <p className="font-semibold mb-3 font-body">যা ইচ্ছে লিখে ফেলো</p>
          <Textarea
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="bg-background border-border min-h-[80px] mb-4"
          />
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-full bg-background border-border">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="math">Math</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full bg-background border-border">
                <SelectValue placeholder="Select Chapter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chapter1">Chapter 1</SelectItem>
                <SelectItem value="chapter2">Chapter 2</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" className="text-muted-foreground">Next</Button>
          </div>
        </div>

        <div className="bg-card rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="https://placehold.co/40x40/22c55e/ffffff.png" alt="Ëndý Rozario" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold">Ëndý Rozario</p>
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">25 minutes ago</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            <p className="mb-4 font-body">
              Kokhon Cathode agay Bose ar kokhon anode agay Bose?
            </p>
          </div>
          <div className="grid grid-cols-2">
             <Image
                src="https://placehold.co/600x400.png"
                alt="Feed image 1"
                width={300}
                height={200}
                className="w-full h-auto"
                data-ai-hint="handwritten notes"
              />
               <Image
                src="https://placehold.co/600x400.png"
                alt="Feed image 2"
                width={300}
                height={200}
                className="w-full h-auto"
                data-ai-hint="handwritten notes"
              />
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-2">1 Like</p>
            <div className="border-t border-b border-border py-1 flex justify-around">
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-5 w-5 mr-2"/>
                    Like
                </Button>
                <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-5 w-5 mr-2 transform rotate-90"/>
                    Comment
                </Button>
            </div>
            <div className="flex items-center gap-3 mt-4">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" />
                    <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <div className="relative flex-1">
                    <Input placeholder="Write your answer" className="bg-background border-border rounded-full pr-16"/>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground"><Smile className="h-5 w-5"/></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground"><ImageIcon className="h-5 w-5"/></Button>
                    </div>
                </div>
            </div>
             <div className="flex items-start gap-3 mt-4">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40/3dd579/000000.png" alt="User avatar" />
                    <AvatarFallback>T</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-1">
                            <p className="font-semibold">Tanvir</p>
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                        </div>
                         <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground"><MoreHorizontal className="h-5 w-5"/></Button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

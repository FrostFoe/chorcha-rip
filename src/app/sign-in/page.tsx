
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DDIcon, FacebookIcon, GoogleIcon } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  phone: z.string().min(1, { message: 'Mobile number is required.' }),
});

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock authentication - in a real app, you'd verify the phone number
    console.log('Login attempt with phone:', values.phone);
    // Simple mock check
    if (values.phone === 'test') {
      toast({
        title: 'Login Successful',
        description: 'Navigating to dashboard.',
      });
      router.push('/dashboard');
    } else {
      // Simulate OTP sending or other login flow
      toast({
        title: 'Proceeding with Login',
        description: 'Please check your phone for next steps.',
      });
      // In a real app, you might navigate to an OTP page
      // router.push('/verify-otp');
    }
  }
  
  // A mock handler for dashboard navigation for demo purposes
  const handleTestSignIn = () => {
    router.push('/dashboard');
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1D1D1D] p-4 text-white">
      <div className="w-full max-w-sm text-center">
        <DDIcon className="mx-auto h-12 w-12 text-white" />
        <h1 className="mt-4 text-xl font-medium">রেজিস্ট্রেশন/ লগ ইন</h1>

        <div className="mt-12 text-left">
          <label htmlFor="phone" className="text-sm font-medium">
            মোবাইল নাম্বার
          </label>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-2 flex items-start gap-2"
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="h-12 rounded-lg border-none bg-white text-black placeholder:text-gray-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-red-400" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="h-12 flex-shrink-0 rounded-lg bg-[#2E2E2E] px-6 text-base font-medium text-white hover:bg-[#3f3f3f]"
              >
                শুরু করো
              </Button>
            </form>
          </Form>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-grow bg-[#424242]"></div>
          <span className="text-base text-[#B0B0B0]">অথবা,</span>
          <div className="h-px flex-grow bg-[#424242]"></div>
        </div>
        
         {/* This button is for demo purposes to allow navigation without full auth */}
        <Button onClick={handleTestSignIn} variant="link" className="text-primary hover:text-primary/80">
          (For Demo: Click to enter Dashboard)
        </Button>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Button
            variant="outline"
            className="h-12 w-full justify-center gap-3 rounded-lg border-none bg-[#2E2E2E] text-base font-medium text-white hover:bg-[#3f3f3f]"
          >
            <FacebookIcon className="h-5 w-5 text-[#1877F2]" />
            Facebook
          </Button>
          <Button
            variant="outline"
            className="h-12 w-full justify-center gap-3 rounded-lg border-none bg-[#2E2E2E] text-base font-medium text-white hover:bg-[#3f3f3f]"
          >
            <GoogleIcon className="h-5 w-5" />
            Google
          </Button>
        </div>
      </div>
    </div>
  );
}

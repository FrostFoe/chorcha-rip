
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Hind_Siliguri } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'চর্চা - বাংলাদেশের সবচেয়ে বড় প্র্যাকটিস প্ল্যাটফর্ম',
  description: 'নিজের প্রস্তুতির ধাপ গুলো যাচাই করে নাও আমাদের সাথে। আন্তর্জাতিক মানের পরীক্ষা পদ্ধতি এখন তোমার হাতের মুঠোয়।',
  openGraph: {
    title: 'চর্চা - বাংলাদেশের সবচেয়ে বড় প্র্যাকটিস প্ল্যাটফর্ম',
    description: 'আন্তর্জাতিক মানের পরীক্ষা পদ্ধতি এখন আপনার হাতের মুঠোয়।',
    url: 'https://chorcha.app', // Replace with your actual domain
    siteName: 'চর্চা',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: 'চর্চা - Practice Platform',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'চর্চা - বাংলাদেশের সবচেয়ে বড় প্র্যাকটিস প্ল্যাটফর্ম',
    description: 'আন্তর্জাতিক মানের পরীক্ষা পদ্ধতি এখন আপনার হাতের মুঠোয়।',
    // site: '@yourtwitterhandle', // Replace with your Twitter handle
    // creator: '@creatorhandle', // Replace with creator's Twitter handle
    images: ['https://placehold.co/1200x630.png'], // Replace with your actual Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${hindSiliguri.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}

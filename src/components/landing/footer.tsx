'use client';

import Link from 'next/link';
import { Instagram, Youtube, Linkedin, Phone, Mail } from 'lucide-react';
import { DDIcon, GoogleIcon, AppleIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';

const footerLinks = {
  Features: ['Mock Exam', 'Question Bank', 'Leaderboard'],
  Streams: [
    'SSC Science',
    'HSC Science',
    'HSC Arts',
    'HSC Commerce',
    'BCS/Job',
  ],
  Company: ['About', 'Affiliate', 'Jobs', 'FAQ'],
  Legal: [
    'Terms & Conditions',
    'Privacy Policy',
    'Refund Policy',
    'A-TIN-MUSHOK-371817097050',
    'Trade license No, TRAD/DNCC/011197/2023',
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-full sm:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <DDIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">চর্চা</span>
            </Link>
            <div className="mb-4 flex gap-4">
              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center justify-center text-gray-400 hover:text-white"
              >
                <Instagram />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex items-center justify-center text-gray-400 hover:text-white"
              >
                <Youtube />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex items-center justify-center text-gray-400 hover:text-white"
              >
                <Linkedin />
              </a>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> 01825-302379
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> info.chorcha@gmail.com
              </p>
              <p>Dhaka, House-969, Road-09, Avenue-11, Mirpur DOHS, 1216</p>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="mb-4 font-semibold">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
          <p className="text-center text-sm text-gray-500 md:text-left">
            &copy; 2024 Chorcha. All rights reserved.
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row md:mt-0">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Google Play
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <AppleIcon className="mr-2 h-5 w-5" />
              App Store
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

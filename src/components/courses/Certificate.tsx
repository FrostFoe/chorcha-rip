"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useTheme } from "next-themes";
import { useUserData } from "@/providers/UserDataProvider";

interface CertificateProps {
  courseName: string;
}

export function Certificate({ courseName }: CertificateProps) {
  const certificateRef = React.useRef<HTMLDivElement>(null);
  const { profile } = useUserData();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString("en-GB"));
  }, []);

  const handleDownload = () => {
    if (certificateRef.current) {
      // Temporarily set a light theme for the canvas to ensure dark text is visible
      const originalBgColor = certificateRef.current.style.backgroundColor;
      const childElements =
        certificateRef.current.querySelectorAll<HTMLElement>("*");
      const originalTextColors: { el: HTMLElement; color: string }[] = [];
      for (const el of childElements) {
        originalTextColors.push({ el, color: el.style.color });
        el.style.color = "#000"; // Set text to black for canvas
      }
      certificateRef.current.style.backgroundColor = "#FFFFFF";

      html2canvas(certificateRef.current, {
        backgroundColor: "#FFFFFF",
        scale: 2,
      }).then((canvas) => {
        // Restore original styles
        if (certificateRef.current) {
          certificateRef.current.style.backgroundColor = originalBgColor;
        }
        for (const { el, color } of originalTextColors) {
          el.style.color = color;
        }

        const link = document.createElement("a");
        link.download = `Chorcha_Certificate_${courseName.replace(
          /\\s+/g,
          "_",
        )}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading certificate...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div
          ref={certificateRef}
          className="bg-card border-4 border-primary rounded-lg p-8 aspect-[1.414] flex flex-col justify-between"
          style={{
            backgroundImage: "url('/svgs/certificate-bg.svg')",
            backgroundSize: "cover",
          }}
        >
          <div className="text-center">
            <p className="text-xl font-medium text-muted-foreground">
              Certificate of Completion
            </p>
            <h1 className="text-5xl font-bold text-primary mt-2">চর্চা</h1>
          </div>

          <div className="text-center my-8">
            <p className="text-2xl text-foreground/80">
              This is to certify that
            </p>
            <p className="text-4xl font-bold my-4">{profile.full_name}</p>
            <p className="text-2xl text-foreground/80">
              has successfully completed the course
            </p>
            <p className="text-3xl font-semibold text-primary mt-4">
              {courseName}
            </p>
          </div>

          <div className="flex justify-between items-end text-sm">
            <div className="text-center">
              <p className="font-semibold border-t border-muted-foreground pt-2 w-48">
                Instructor
              </p>
            </div>
            <div className="text-center">
              <p className="font-semibold border-t border-muted-foreground pt-2 w-48">
                Date
              </p>
              <p>
                <span>{currentDate}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={handleDownload} size="lg">
            <Download className="mr-2 h-5 w-5" />
            ডাউনলোড করুন
          </Button>
        </div>
      </div>
    </div>
  );
}

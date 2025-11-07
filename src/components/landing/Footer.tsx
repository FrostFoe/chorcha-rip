import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div>
            <div className="flex flex-col gap-3 items-start">
              <Image
                className="h-10 w-auto"
                src="/logo-dark.webp"
                alt="Chorcha"
                width={100}
                height={40}
                data-ai-hint="logo dark"
              />
              <div className="flex space-x-2 mt-2">
                <a
                  href="https://www.facebook.com/chorcha.net"
                  className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-accent rounded-md"
                  aria-label="Chorcha on Facebook"
                >
                  <Facebook className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Chorcha on Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/chorcha_net/"
                  className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-accent rounded-md"
                  aria-label="Chorcha on Instagram"
                >
                  <Instagram className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Chorcha on Instagram</span>
                </a>
                <a
                  href="https://www.youtube.com/@chorcha_net"
                  className="text-muted-foreground hover:text-foreground p-1.5 hover:bg-accent rounded-md"
                  aria-label="Chorcha on YouTube"
                >
                  <Youtube className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Chorcha on YouTube</span>
                </a>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-muted-foreground w-60">
              <div className="flex items-center space-x-2 px-2 py-1.5 hover:bg-accent hover:text-foreground rounded-md">
                <Phone className="h-4 w-4" />
                <span>
                  <a href="tel:01605-002711">01605-002711</a>
                </span>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1.5 hover:bg-accent hover:text-foreground rounded-md">
                <Mail className="h-4 w-4" />
                <span>
                  <a href="mailto:hi@chorcha.net">hi@chorcha.net</a>
                </span>
              </div>
              <div className="flex items-start space-x-2 px-2 py-1.5 hover:bg-accent hover:text-foreground rounded-md">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>
                  <a
                    href="https://maps.app.goo.gl/A6gUqFECtVFvFQFQA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Moho, House No- 568, Road 1/A, Rajshahi 6207
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

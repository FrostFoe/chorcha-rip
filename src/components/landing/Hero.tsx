import Image from "next/image";

export function Hero() {
  return (
    <div className="md:h-screen flex flex-col justify-center bg-background">
      <section className="relative">
        <div className="max-w-screen-xl mx-auto pt-24 pb-16 px-4 md:px-14 flex flex-col md:flex-row items-center">
          <div className="space-y-8">
            <div className="flex flex-col justify-start space-y-6">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl text-center md:text-left font-black tracking-wide text-gradient-gray"
                style={{
                  lineHeight: 1.2,
                }}
              >
                <span className="text-gradient-green">চর্চা</span> করো নিজের
                গতিতে
              </h1>
              <div className="max-w-lg lg:max-w-xl">
                <h2 className="font-normal leading-6 lg:leading-7 text-base lg:text-lg text-center md:text-left tracking-wide text-muted-foreground">
                  নিজের পছন্দমত হাজার হাজার প্রশ্ন থেকে বিষয় ও অধ্যায়ভিত্তিক
                  পরীক্ষা, পূর্বের ভুল রিভিউ, এবং লাইভ পরীক্ষার মাধ্যমে প্রস্তুত
                  হও যেকোন পরীক্ষার জন্য।
                </h2>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 pt-4">
                <a href="https://play.google.com/store/apps/details?id=com.chorcha.main&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                  <Image
                    alt="Get it on Google Play"
                    src="/playstore.svg"
                    className="h-12 w-auto"
                    width={144}
                    height={48}
                    data-ai-hint="google play"
                  />
                </a>
                <a href="https://apps.apple.com/app/chorcha/id6450657679">
                  <Image
                    className="h-12 w-auto"
                    src="/appstore.svg"
                    alt="Download on the app store"
                    width={144}
                    height={48}
                    data-ai-hint="apple appstore"
                  />
                </a>
              </div>
            </div>
          </div>
          <Image
            src="/mk.webp"
            alt="Hero image"
            width={320}
            height={500}
            className="w-80 shrink-0 mr-auto md:mr-0 ml-auto"
            data-ai-hint="mobile app"
            priority
          />
        </div>
      </section>
    </div>
  );
}

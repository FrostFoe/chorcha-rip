
import type { SVGProps } from 'react';
import React from 'react';

export const DDIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="41"
    height="40"
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 38.5V1.5H12.625V38.5H6.5ZM15.6875 38.5V1.5H21.8125V38.5H15.6875Z"
      fill="currentColor"
    />
    <path
      d="M24.875 38.5V1.5H31V16.7917H31.0417V38.5H24.875Z"
      fill="#E5252A"
    />
  </svg>
);

export const FacebookIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="url(#facebook__a)" height="1em" width="1em" {...props}><defs><linearGradient x1="50%" x2="50%" y1="97.078%" y2="0%" id="facebook__a"><stop offset="0%" stopColor="#0062E0" /><stop offset="100%" stopColor="#19AFFF" /></linearGradient></defs><path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z" /><path fill="#FFF" d="m25 23 .8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z" /></svg>;

export const GoogleIcon = (props: SVGProps<SVGSVGElement>) => <svg width="1em" height="1em" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" {...props}><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>;


export const AppleIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="1em" height="1em" viewBox="0 0 814 1000" {...props}><path fill="#fff" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" /></svg>;



// Institution Icons
const AfmcIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/afmc.png" width="32" height="32" />
    </svg>
);
const BupIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/bup.png" width="32" height="32" />
    </svg>
);
const MaritimeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/maritime.png" width="32" height="32" />
    </svg>
);
const BuetIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/buet.png" width="32" height="32" />
    </svg>
);
const GucchoIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/guccho.png" width="32" height="32" />
    </svg>
);
const RuetIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/ruet.png" width="32" height="32" />
    </svg>
);
const KuetIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/kuet.png" width="32" height="32" />
    </svg>
);
const CuetIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/cuet.png" width="32" height="32" />
    </svg>
);
const IutIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/iut.png" width="32" height="32" />
    </svg>
);
const ButexIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/butex.png" width="32" height="32" />
    </svg>
);
const MistIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/mist.png" width="32" height="32" />
    </svg>
);
const MedicalIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/medical.png" width="32" height="32" />
    </svg>
);
const DentalIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/dental.png" width="32" height="32" />
    </svg>
);
const IbaIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/iba.png" width="32" height="32" />
    </svg>
);
const NursingIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/nursing.png" width="32" height="32" />
    </svg>
);
const DuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/du.png" width="32" height="32" />
    </svg>
);
const RuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/ru.png" width="32" height="32" />
    </svg>
);
const JuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/ju.png" width="32" height="32" />
    </svg>
);
const CuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/cu.png" width="32" height="32" />
    </svg>
);
const JnuIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/jnu.png" width="32" height="32" />
    </svg>
);
const AgriIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/agri.png" width="32" height="32" />
    </svg>
);
const BcsIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/bcs.png" width="32" height="32" />
    </svg>
);
const SatCollegeIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="https://storage.googleapis.com/stey-assets/sust.png" width="32" height="32" />
    </svg>
);


// Subject Icons
export const LaptopIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.56a1 1 0 0 1-.9 1.44H3.62a1 1 0 0 1-.9-1.44L4 16" />
  </svg>
);
export const Physics1Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a8 8 0 0 1 16 0M4 11v1M12 12v1m8-1v1m-7-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
        <path d="M6 16v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2H6Z"/>
    </svg>
);
export const Physics2Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12V6l-2 2m4 0-2-2m0 6V4m6 8h-2m-8 0H4m12 5H8a2 2 0 0 0-2 2v1h12v-1a2 2 0 0 0-2-2Z"/>
        <path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
    </svg>
);
export const Chemistry1Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6m-3 0v4m-4 2 2-2 2 2m-2 2v10m-4-6h8m-8 3h8"/>
        <path d="M9 21h6"/>
    </svg>
);
export const Chemistry2Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m5.5 18.5 1-1m12-12-1 1m-4 4-1-1m-1 5-1-1m-3 7 1-1m1-11 1-1m-5 3-1 1m2 2-1 1m9-4 1-1"/>
        <path d="M3 10v4a2 2 0 0 0 2 2h.5a2.5 2.5 0 0 1 2.5 2.5V21h4v-2.5a2.5 2.5 0 0 1 2.5-2.5H19a2 2 0 0 0 2-2v-4H3Z"/>
    </svg>
);
export const HigherMath1Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21 21 3m-9 18h9v-9"/>
    </svg>
);
export const HigherMath2Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 19h4m-2-2v4m-4-6h-4v-4m-2 4h-2m10-6V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6"/>
    </svg>
);
export const Biology1Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z"/>
        <path d="M12 12s4-3 4-6m-8 6s-4-3-4-6m4 6s-3 4-6 4m6-4s3 4 6 4"/>
    </svg>
);
export const Biology2Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 12a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Z"/>
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
    </svg>
);
export const Stats1Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8.11 3.79M22 12A10 10 0 0 0 12 2v10h10Z"/>
    </svg>
);
export const Stats2Icon = (props: SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M7 21V12M12 21V3M17 21V8"/>
    </svg>
);

export {
    AfmcIcon,
    BupIcon,
    MaritimeIcon,
    BuetIcon,
    GucchoIcon,
    RuetIcon,
    KuetIcon,
    CuetIcon,
    IutIcon,
    ButexIcon,
    MistIcon,
    MedicalIcon,
    DentalIcon,
    IbaIcon,
    NursingIcon,
    DuIcon,
    RuIcon,
    JuIcon,
    CuIcon,
    JnuIcon,
    AgriIcon,
    BcsIcon,
    SatCollegeIcon
};


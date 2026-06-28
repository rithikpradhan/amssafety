import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "AMS Safety — Certified Protection Equipment",
  description: "AMS Safety provides ANSI Z89.1 certified head protection and industrial safety equipment engineered for uncompromised safety in extreme environments.",
  keywords: ["AMS Safety", "hard hat", "safety helmet", "industrial safety", "PPE", "ANSI Z89.1"],
  openGraph: {
    title: "AMS Safety — Certified Protection Equipment",
    description: "AMS Safety provides ANSI Z89.1 certified head protection and industrial safety equipment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ── Preconnect to Google Fonts (non-blocking) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load DM Sans asynchronously — does NOT block first render */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          media="print"
          // @ts-expect-error — onload string attribute trick for async CSS
          onLoad="this.media='all'"
        />
        {/* Preload hero helmet image — fixes LCP 12.6s → dramatically lower */}
        <link
          rel="preload"
          as="image"
          href="/ams-product-removebg-preview.webp"
          fetchPriority="high"
        />
      </head>
      <body>
        {/* ── Loading Splash Screen — hides unstyled HTML on first paint ── */}
        <div
          id="ams-splash"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px',
            transition: 'opacity 0.4s ease, visibility 0.4s ease',
          }}
        >
          {/* Animated AMS logo mark */}
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" stroke="#e63946" strokeWidth="2" strokeDasharray="138" strokeDashoffset="138" style={{ animation: 'ams-ring 1.1s ease forwards' }} />
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontFamily="serif" fontSize="16" fontWeight="400" fill="#212529">AMS</text>
          </svg>
          <style>{`
            @keyframes ams-ring {
              to { stroke-dashoffset: 0; }
            }
            @keyframes ams-splash-out {
              0% { opacity: 1; visibility: visible; }
              100% { opacity: 0; visibility: hidden; }
            }
            #ams-splash.ams-hide {
              animation: ams-splash-out 0.4s ease forwards;
              pointer-events: none;
            }
          `}</style>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var splash = document.getElementById('ams-splash');
                function hideSplash() {
                  if (splash) {
                    splash.classList.add('ams-hide');
                    setTimeout(function() { splash.style.display = 'none'; }, 450);
                  }
                }
                // Hide after window load + small buffer for GSAP to init
                if (document.readyState === 'complete') {
                  setTimeout(hideSplash, 200);
                } else {
                  window.addEventListener('load', function() { setTimeout(hideSplash, 200); });
                }
                // Safety net: always hide after 3s max
                setTimeout(hideSplash, 3000);
              })();
            `,
          }}
        />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

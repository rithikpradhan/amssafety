'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const amsRef = useRef<HTMLDivElement>(null);
  const safetyRef = useRef<HTMLDivElement>(null);
  const helmetRef = useRef<HTMLDivElement>(null);
  const helmetImgRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const amsChars = amsRef.current?.querySelectorAll('.char');
      const safetyChars = safetyRef.current?.querySelectorAll('.char');

      // ── 1. Initial Load Entry Sequence ──
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      if (amsChars && amsChars.length > 0) {
        tl.fromTo(
          amsChars,
          {
            opacity: 0,
            y: 80,
            z: -150,
            rotationX: -90,
            rotationY: 35,
            skewX: -20,
            scale: 0.6,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: 'back.out(1.7)',
          },
          0.1
        );
      }

      if (safetyChars && safetyChars.length > 0) {
        tl.fromTo(
          safetyChars,
          {
            opacity: 0,
            y: 100,
            z: -180,
            rotationX: 90,
            rotationY: -40,
            skewX: 25,
            scale: 0.5,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            skewX: 0,
            scale: 1,
            duration: 1.3,
            stagger: 0.08,
            ease: 'elastic.out(1, 0.6)',
          },
          0.3
        );
      }

      tl.fromTo(
        helmetRef.current,
        {
          scale: 0.5,
          y: 140,
          rotationZ: -15,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          rotationZ: 0,
          opacity: 1,
          duration: 1.6,
          ease: 'elastic.out(1, 0.45)',
        },
        0.2
      );

      // Subtext info block entry reveal
      if (infoRef.current) {
        tl.fromTo(
          infoRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' },
          0.6
        );
      }

      // CTA buttons reveal
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'back.out(1.5)' },
          0.7
        );
      }

      // Continuous Breathing Float Loop on Helmet Inner Image
      gsap.to(helmetImgRef.current, {
        y: -18,
        rotationZ: 2.5,
        duration: 3.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });
    }, sectionRef);

    // ── 2. Interactive 3D Parallax Mouse Tracking ──
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 0.8) return;

      const { innerWidth, innerHeight } = window;
      const xRatio = (e.clientX / innerWidth) * 2 - 1;
      const yRatio = (e.clientY / innerHeight) * 2 - 1;

      if (helmetImgRef.current) {
        gsap.to(helmetImgRef.current, {
          rotationY: xRatio * 20,
          rotationX: -yRatio * 20,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    const sectionEl = sectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener('mousemove', handleMouseMove);
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
      if (sectionEl) {
        sectionEl.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const renderSplitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="char"
        style={{
          display: 'inline-block',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="intro"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        perspective: '1200px',
      }}
    >
      {/* ── Helmet Product Showcase ── */}
      <div
        ref={helmetRef}
        className="hero-helmet-box"
        style={{
          position: 'absolute',
          inset: 0,
          margin: 'auto',
          transformStyle: 'preserve-3d',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '16px',
          overflow: 'hidden',
          willChange: 'transform',
          opacity: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={helmetImgRef}
          src="/ams-product-removebg-preview.webp"
          alt="AMS Safety Hard Hat"
          width={640}
          height={640}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
            transformStyle: 'preserve-3d',
          }}
        />
      </div>

      {/* ── AMS — top-left (Black Font Color Preserved) ── */}
      <div
        ref={amsRef}
        className="hero-ams-text"
        aria-label="AMS"
        style={{
          position: 'absolute',
          fontFamily: "'Parisian', 'Playfair Display', 'Times New Roman', serif",
          fontWeight: '400',
          color: '#212529',
          lineHeight: 0.85,
          letterSpacing: '-0.01em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 10,
          perspective: '1000px',
          willChange: 'transform',
          opacity: 1,
        }}
      >
        {renderSplitText('AMS')}
      </div>

      {/* ── Safety — bottom-right ── */}
      <div
        ref={safetyRef}
        className="hero-safety-text"
        aria-label="Safety"
        style={{
          position: 'absolute',
          fontFamily: "'Parisian', 'Playfair Display', 'Times New Roman', serif",
          fontWeight: '400',
          color: '#e63946',
          lineHeight: 0.85,
          letterSpacing: '-0.01em',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 10,
          perspective: '1000px',
          willChange: 'transform',
          opacity: 1,
        }}
      >
        {renderSplitText('Safety')}
      </div>

      {/* ── Restored Subtext Information Block (Bottom Left) ── */}
      <div
        ref={infoRef}
        className="hero-info-block"
        style={{
          position: 'absolute',
          fontFamily: "'Parisian', 'Playfair Display', 'Times New Roman', serif",
          color: '#212529',
          zIndex: 10,
          pointerEvents: 'none',
          userSelect: 'none',
          willChange: 'transform',
          opacity: 0,
        }}
      >
        <h3 className="info-title" style={{ fontWeight: '400', lineHeight: 1.1, marginBottom: '6px', letterSpacing: '0.01em' }}>
          Certified Protection
        </h3>
        <p className="info-desc" style={{ fontWeight: '400', lineHeight: 1.25, opacity: 0.85 }}>
          ANSI Z89.1 Type I Class E standard. Engineered for uncompromised safety in extreme environments.
        </p>
      </div>

      {/* ── Call To Action (CTA) Buttons ── */}
      <div
        ref={ctaRef}
        className="hero-cta-group"
        style={{
          position: 'absolute',
          bottom: '44px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          willChange: 'transform, opacity',
          opacity: 0,
        }}
      >
        <button
          onClick={() => scrollToSection('products')}
          className="btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            backgroundColor: '#e63946',
            color: '#ffffff',
            border: 'none',
            borderRadius: '40px',
            fontFamily: 'var(--font-halyard-display-variable)',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(230, 57, 70, 0.25)',
            transition: 'all 0.3s ease',
          }}
        >
          Explore Products
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </button>

        <button
          onClick={() => scrollToSection('about-us')}
          className="btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 26px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(10px)',
            color: '#111827',
            border: '1.5px solid #e5e7eb',
            borderRadius: '40px',
            fontFamily: 'var(--font-halyard-display-variable)',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.3s ease',
          }}
        >
          About Us
        </button>
      </div>

      <style jsx>{`
        /* Desktop Defaults */
        .hero-ams-text {
          top: clamp(80px, 12vh, 160px);
          left: clamp(80px, 12vw, 180px);
          font-size: clamp(90px, 13vw, 210px);
        }

        .hero-safety-text {
          bottom: clamp(60px, 10vh, 140px);
          right: clamp(80px, 12vw, 180px);
          font-size: clamp(90px, 13vw, 210px);
        }

        .hero-helmet-box {
          width: clamp(340px, 44vw, 640px);
          height: clamp(340px, 44vw, 640px);
        }

        .hero-info-block {
          bottom: clamp(50px, 8vh, 100px);
          left: clamp(50px, 8vw, 120px);
          max-width: clamp(240px, 24vw, 340px);
        }
        .info-title {
          font-size: clamp(22px, 2.5vw, 38px);
        }
        .info-desc {
          font-size: clamp(12px, 1.1vw, 16px);
        }

        .btn-primary:hover {
          background-color: #d62839 !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(230, 57, 70, 0.35) !important;
        }
        .btn-secondary:hover {
          border-color: #111827 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
        }

        /* Mobile Layout & Proportions - Clean Balanced Composition with CTAs */
        @media (max-width: 768px) {
          .hero-info-block {
            display: none !important;
          }

          .hero-ams-text {
            top: 20vh !important;
            left: 0 !important;
            right: 0 !important;
            margin: 0 auto !important;
            font-size: clamp(80px, 22vw, 135px) !important;
            text-align: center !important;
            width: 100% !important;
          }

          .hero-helmet-box {
            width: clamp(320px, 84vw, 440px) !important;
            height: clamp(320px, 84vw, 440px) !important;
          }

          .hero-safety-text {
            bottom: 18vh !important;
            left: 0 !important;
            right: 0 !important;
            margin: 0 auto !important;
            font-size: clamp(80px, 22vw, 135px) !important;
            text-align: center !important;
            width: 100% !important;
          }

          .hero-cta-group {
            bottom: 6vh !important;
            width: 90% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 480px) {
          .hero-ams-text {
            top: 19vh !important;
            font-size: clamp(75px, 21vw, 110px) !important;
          }
          .hero-helmet-box {
            width: 330px !important;
            height: 330px !important;
          }
          .hero-safety-text {
            bottom: 17vh !important;
            font-size: clamp(75px, 21vw, 110px) !important;
          }
          .hero-cta-group {
            bottom: 5vh !important;
            gap: 10px !important;
          }
          .btn-primary, .btn-secondary {
            padding: 12px 20px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

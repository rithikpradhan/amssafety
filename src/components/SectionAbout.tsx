'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headline lines reveal
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.querySelectorAll('.reveal-line'),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // 2. Ghost Watermark Scroll Scrub
      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          x: 35,
          opacity: 0.25,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 3. Bottom cards Curtain Aperture Slide Reveal on Scroll
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.about-card');
        gsap.fromTo(
          cards,
          { opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
          {
            opacity: 1,
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            duration: 1.2,
            stagger: 0.18,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="about-section"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#111827',
        fontFamily: 'var(--font-halyard-display-variable)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1700px', margin: '0 auto' }}>
        {/* ── 1. Top Typographic Composition Row ── */}
        <div ref={headlineRef} className="about-headline-container" style={{ position: 'relative' }}>
          {/* Line 1 */}
          <div className="reveal-line" style={{ display: 'block' }}>
            <h2 className="about-title-large">
              THE FOUNDATION
            </h2>
          </div>

          {/* Line 2 Grid: Ghost brand + OF + Narrative */}
          <div className="reveal-line about-middle-row">
            {/* Unified Ghost Watermark Text */}
            <span
              ref={watermarkRef}
              className="about-watermark-text"
            >
              AMS Safety
            </span>

            {/* OF */}
            <span className="about-of-text">
              OF
            </span>

            {/* Narrative Paragraph */}
            <p className="about-narrative-paragraph">
              We’ve grown into a full-service industrial safety engineering team trusted by leaders of all sizes — while staying committed to zero-compromise protection and long-term partnership.
            </p>
          </div>

          {/* Line 3 */}
          <div className="reveal-line" style={{ display: 'block' }}>
            <h2 className="about-title-large red-highlight">
              OUR MISSION
            </h2>
          </div>
        </div>

        {/* ── 2. Bottom 3 Showcase Cards Grid (Clean Authentic Photography) ── */}
        <div
          ref={cardsRef}
          className="about-cards-grid"
        >
          {/* Card 1: Authentic Real-World Industrial Engineering Photography */}
          <div
            className="about-card"
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
              willChange: 'clip-path, opacity',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-team-1.webp"
              alt="AMS Safety Industrial Engineering Team"
              width={600}
              height={500}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Card 2: Typography Statement Card */}
          <div
            className="about-card text-card-bg"
            style={{
              position: 'relative',
              borderRadius: '28px',
              backgroundColor: '#111827',
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(230,57,70,0.15) 0%, rgba(17,24,39,1) 80%)',
              padding: '40px 30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              willChange: 'clip-path, opacity',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.03) 18px, rgba(255,255,255,0.03) 20px)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.16em',
                  color: '#e63946',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  display: 'block',
                }}
              >
                Zero Compromise
              </span>
              <h3
                style={{
                  fontFamily: "'Parisian', 'Playfair Display', serif",
                  fontSize: 'clamp(28px, 3.2vw, 42px)',
                  fontWeight: '400',
                  color: '#ffffff',
                  lineHeight: 1.2,
                  marginBottom: '16px',
                }}
              >
                The AMS Safety Foundation
              </h3>
              <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.5, maxWidth: '260px', margin: '0 auto' }}>
                Engineering certified, life-saving protection for high-risk industrial sites worldwide.
              </p>
            </div>
          </div>

          {/* Card 3: Authentic Real-World Inspection Specialist Photography */}
          <div
            className="about-card"
            style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
              willChange: 'clip-path, opacity',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-team-2.webp"
              alt="AMS Safety Research and Testing Facility"
              width={600}
              height={500}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 100px 40px 120px;
        }
        .about-headline-container {
          margin-bottom: 80px;
        }
        .about-title-large {
          font-size: clamp(42px, 6.5vw, 96px);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1;
          color: #111827;
          text-transform: uppercase;
        }
        .about-title-large.red-highlight {
          color: #e63946;
        }
        .about-middle-row {
          display: grid;
          grid-template-columns: auto auto 1fr;
          align-items: baseline;
          gap: clamp(20px, 4vw, 60px);
          margin: 12px 0;
        }
        .about-watermark-text {
          display: inline-block;
          font-family: 'Parisian', 'Playfair Display', serif;
          font-size: clamp(56px, 9vw, 130px);
          font-weight: 400;
          color: rgba(230, 57, 70, 0.15);
          line-height: 0.8;
          user-select: none;
          will-change: transform, opacity;
        }
        .about-of-text {
          font-size: clamp(42px, 6.5vw, 96px);
          font-weight: 300;
          color: #111827;
          line-height: 1;
          text-transform: uppercase;
        }
        .about-narrative-paragraph {
          font-size: clamp(14px, 1.3vw, 18px);
          color: #4b5563;
          line-height: 1.5;
          max-width: 480px;
          align-self: center;
        }

        .about-cards-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.9fr 0.9fr;
          gap: 28px;
          align-items: stretch;
        }
        .about-card {
          height: 420px;
        }

        /* Responsive Tablet Breakpoints */
        @media (max-width: 1024px) {
          .about-section {
            padding: 80px 32px 100px;
          }
          .about-headline-container {
            margin-bottom: 60px;
          }
          .about-middle-row {
            gap: 24px;
          }
          .about-cards-grid {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .about-card {
            height: 380px;
          }
          .about-card.text-card-bg {
            grid-column: span 2;
            height: 300px;
          }
        }

        /* Responsive Mobile Breakpoints */
        @media (max-width: 768px) {
          .about-section {
            padding: 60px 20px 80px;
          }
          .about-headline-container {
            margin-bottom: 48px;
          }
          .about-middle-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin: 16px 0;
          }
          .about-of-text {
            display: none;
          }
          .about-narrative-paragraph {
            font-size: 15px;
            max-width: 100%;
          }
          .about-cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .about-card {
            height: 340px !important;
          }
          .about-card.text-card-bg {
            grid-column: span 1 !important;
            height: 340px !important;
          }
        }
      `}</style>
    </section>
  );
}

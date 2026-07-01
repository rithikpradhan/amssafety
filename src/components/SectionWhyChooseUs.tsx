'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AccordionItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

const ITEMS: AccordionItem[] = [
  {
    id: '1',
    number: '01',
    title: 'Certified Safety Compliance',
    description: 'Every safety product meets or exceeds ANSI Z89.1, OSHA, and CE international standards, backed by rigorous lab stress testing.',
    image: '/ams-product-removebg-preview.png',
  },
  {
    id: '2',
    number: '02',
    title: 'Precision Ergonomic Engineering',
    description: 'Engineered for extreme high-risk sites with featherweight materials and active thermal ventilation for all-day worker comfort.',
    image: '/prod-boots.png',
  },
  {
    id: '3',
    number: '03',
    title: 'Rapid Global Supply Chain',
    description: 'We maintain extensive inventory networks to deploy certified safety gear instantly to major industrial facilities and remote sites alike.',
    image: '/prod-extinguisher.png',
  },
  {
    id: '4',
    number: '04',
    title: 'Uncompromised Durability',
    description: 'Constructed with impact-resistant polymers and heavy-duty reinforced webbings designed to endure severe environmental conditions.',
    image: '/prod-harness.png',
  },
];

const STATEMENT_BLOCKS = [
  { text: 'We are ', isRed: false },
  { text: 'AMS Safety. ', isRed: true },
  { text: 'We help our industrial partners protect their workforce, ', isRed: false },
  { text: 'engineer certified protection, ', isRed: true },
  { text: 'and scale operations with ', isRed: false },
  { text: 'zero compromise.', isRed: true },
];

export default function SectionWhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Unmistakable Scroll-Scrubbed 3D Flip & Highlight Fill Reveal
      if (statementRef.current) {
        const words = statementRef.current.querySelectorAll('.kinetic-word');
        gsap.fromTo(
          words,
          {
            opacity: 0.15,
            rotateX: -85,
            y: 40,
            filter: 'blur(4px)',
            transformOrigin: '50% 100% -40px',
          },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 80%',
              end: 'bottom 50%',
              scrub: 1,
            },
          }
        );

        // Pill button pop-in
        const btn = statementRef.current.querySelector('.statement-btn');
        if (btn) {
          gsap.fromTo(
            btn,
            { opacity: 0, scale: 0.85, y: 25 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: statementRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // List items reveal
      if (listRef.current) {
        const rows = listRef.current.querySelectorAll('.why-item-row');
        gsap.fromTo(
          rows,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 85%',
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
      id="why-choose-us"
      className="why-section"
      style={{
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#111827',
        fontFamily: 'var(--font-halyard-display-variable)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1700px', margin: '0 auto' }}>
        {/* ── 1. Top Centered Statement Block (Scroll-Scrubbed 3D Flip Reveal) ── */}
        <div
          ref={statementRef}
          className="why-statement-container"
          style={{
            textAlign: 'center',
            maxWidth: '1000px',
            margin: '0 auto 80px',
          }}
        >
          <h2 className="why-statement-title">
            {STATEMENT_BLOCKS.map((block, bIdx) => {
              const words = block.text.split(' ');
              return words.map((word, wIdx) => {
                if (!word) return null;
                return (
                  <span
                    key={`${bIdx}-${wIdx}`}
                    className="kinetic-word"
                    style={{
                      display: 'inline-block',
                      marginRight: '0.28em',
                      color: block.isRed ? '#e63946' : '#111827',
                      fontWeight: block.isRed ? '500' : '400',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity, filter',
                    }}
                  >
                    {word}
                  </span>
                );
              });
            })}
          </h2>

          {/* Contact Us Pill Button with Arrow Badge */}
          <div className="statement-btn" style={{ display: 'inline-block', willChange: 'transform, opacity' }}>
            <button
              onClick={() => {
                // Smooth scroll to top or inquiry
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '6px 8px 6px 24px',
                backgroundColor: '#ffffff',
                border: '1.5px solid #e5e7eb',
                borderRadius: '40px',
                fontSize: '15px',
                fontWeight: '500',
                color: '#111827',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#e63946';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(230,57,70,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
              }}
            >
              Contact us
              <span
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#e63946',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* ── 2. Why Choose Us / What We Stand For Header ── */}
        <div
          ref={headerRef}
          className="why-header-row"
        >
          <h3 className="why-header-title">
            Why Choose Us
          </h3>
          <p className="why-header-desc">
            We help our global industrial partners achieve sustainable workplace safety through values rooted in engineering integrity, certified compliance, and strategic reliability.
          </p>
        </div>

        {/* ── 3. Accordion / List Rows ── */}
        <div ref={listRef} style={{ borderBottom: '1px solid #e5e7eb', position: 'relative' }}>
          {ITEMS.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={item.id}
                className="why-item-row"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isHovered ? null : index)}
                style={{
                  borderTop: '1px solid #e5e7eb',
                  borderLeft: isHovered ? '4px solid #e63946' : '4px solid transparent',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor: isHovered ? 'rgba(249, 250, 251, 0.7)' : 'transparent',
                  transition: 'all 0.3s ease',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Title and Number */}
                <div className="why-item-title-box">
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: isHovered ? '#e63946' : '#111827',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item.number} - {item.title}
                  </span>
                </div>

                {/* Description */}
                <p className="why-item-desc">
                  {item.description}
                </p>

                {/* Arrow Icon Badge */}
                <div
                  className="why-item-arrow"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: isHovered ? '#e63946' : '#f3f4f6',
                    color: isHovered ? '#ffffff' : '#111827',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>

                {/* Ultra-Smooth Floating Thumbnail Preview on Right / Desktop */}
                <div
                  className="why-floating-thumb"
                  style={{
                    position: 'absolute',
                    right: '80px',
                    top: '50%',
                    width: '130px',
                    height: '130px',
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    padding: '12px',
                    boxShadow: '0 20px 40px rgba(17,24,39,0.12)',
                    border: '1px solid #f0f0f0',
                    pointerEvents: 'none',
                    zIndex: 10,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered
                      ? 'translateY(-50%) rotate(6deg) scale(1)'
                      : 'translateY(-40%) rotate(0deg) scale(0.85)',
                    transition: 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '14px',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .why-section {
          padding: 100px 40px 120px;
        }
        .why-statement-title {
          font-size: clamp(32px, 4.2vw, 56px);
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: -0.02em;
          color: #111827;
          margin-bottom: 40px;
          perspective: 1200px;
        }
        .why-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 24px;
          margin-bottom: 48px;
          will-change: transform, opacity;
        }
        .why-header-title {
          font-size: clamp(36px, 4vw, 48px);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #111827;
        }
        .why-header-desc {
          font-size: 15px;
          color: #6b7280;
          max-width: 440px;
          line-height: 1.5;
        }
        .why-item-row {
          padding: 36px 0 36px 20px;
          display: grid;
          grid-template-columns: 1.2fr 2fr auto;
          align-items: center;
          gap: 24px;
        }
        .why-item-title-box {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        .why-item-desc {
          font-size: 15px;
          color: #4b5563;
          line-height: 1.6;
          margin: 0;
        }

        /* Responsive Tablet Breakpoints */
        @media (max-width: 1024px) {
          .why-section {
            padding: 80px 32px 100px;
          }
          .why-statement-container {
            margin-bottom: 60px !important;
          }
          .why-statement-title {
            font-size: clamp(26px, 3.8vw, 42px);
            margin-bottom: 30px;
          }
          .why-item-row {
            grid-template-columns: 1.1fr 1.8fr auto;
            padding: 28px 0 28px 16px;
            gap: 16px;
          }
          .why-floating-thumb {
            right: 50px !important;
            width: 110px !important;
            height: 110px !important;
          }
        }

        /* Responsive Mobile Breakpoints */
        @media (max-width: 768px) {
          .why-section {
            padding: 60px 20px 80px;
          }
          .why-statement-container {
            margin-bottom: 44px !important;
          }
          .why-statement-title {
            font-size: clamp(22px, 5.5vw, 32px);
            line-height: 1.35;
            margin-bottom: 24px;
          }
          .why-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 32px;
          }
          .why-header-title {
            font-size: clamp(28px, 6vw, 36px);
          }
          .why-header-desc {
            font-size: 14px;
            max-width: 100%;
          }
          .why-item-row {
            grid-template-columns: 1fr auto !important;
            padding: 24px 0 24px 12px !important;
            gap: 12px !important;
          }
          .why-item-title-box {
            grid-column: 1 / 2;
          }
          .why-item-arrow {
            grid-column: 2 / 3;
            width: 34px !important;
            height: 34px !important;
          }
          .why-item-desc {
            grid-column: 1 / -1;
            font-size: 14px;
            line-height: 1.5;
          }
          .why-floating-thumb {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

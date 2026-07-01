'use client';

import { useEffect, useRef, useState } from 'react';
import Nav from '@/components/Nav';

export default function AboutPage() {
  const containerRef1 = useRef<HTMLDivElement>(null);
  const endWordRef1 = useRef<HTMLSpanElement>(null);
  const imageRef1 = useRef<HTMLImageElement>(null);

  const containerRef2 = useRef<HTMLDivElement>(null);
  const imageRef2 = useRef<HTMLImageElement>(null);
  const startWordRef2 = useRef<HTMLSpanElement>(null);

  const [coords1, setCoords1] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [coords2, setCoords2] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useEffect(() => {
    const updateCoords = () => {
      if (
        containerRef1.current &&
        endWordRef1.current &&
        imageRef1.current &&
        containerRef2.current &&
        imageRef2.current &&
        startWordRef2.current
      ) {
        const c1 = containerRef1.current.getBoundingClientRect();
        const t1 = endWordRef1.current.getBoundingClientRect();
        const img1 = imageRef1.current.getBoundingClientRect();

        setCoords1({
          x1: t1.right - c1.left + 8, // exactly 8px to the right of the word "risk."
          y1: t1.top + t1.height / 2 - c1.top, // vertically centered on the word "risk."
          x2: img1.left - c1.left,
          y2: img1.top + img1.height / 2 - c1.top - 20,
        });

        const c2 = containerRef2.current.getBoundingClientRect();
        const img2 = imageRef2.current.getBoundingClientRect();
        const t2 = startWordRef2.current.getBoundingClientRect();

        setCoords2({
          x1: img2.right - c2.left,
          y1: img2.bottom - c2.top - 220, // middle-right edge of the image (above the bottom badge)
          x2: t2.left - c2.left - 10, // exactly 10px to the left of the word "Making"
          y2: t2.top + t2.height / 2 - c2.top, // vertically centered on the word "Making"
        });
      }
    };

    updateCoords();

    window.addEventListener('resize', updateCoords);
    const timer = setTimeout(updateCoords, 300);

    return () => {
      window.removeEventListener('resize', updateCoords);
      clearTimeout(timer);
    };
  }, []);

  const getPath1 = () => {
    const { x1, y1, x2, y2 } = coords1;
    if (x1 === 0 && x2 === 0) return '';
    const dx = x2 - x1;
    const dy = y2 - y1;
    const midX = x1 + dx * 0.5;
    const midY = y1 + dy * 0.5;

    return `M ${x1},${y1} 
            C ${x1 + dx * 0.35},${y1 - 30} ${midX - 90},${midY + 110} ${midX},${midY + 70}
            C ${midX + 70},${midY + 40} ${midX - 70},${midY - 40} ${midX},${midY - 20}
            C ${midX + 50},${midY - 60} ${x2 - dx * 0.35},${y2} ${x2},${y2}`;
  };

  const getPath2 = () => {
    const { x1, y1, x2, y2 } = coords2;
    if (x1 === 0 && x2 === 0) return '';
    const dx = x2 - x1;
    const dy = y2 - y1;
    const midX = x1 + dx * 0.5;
    const midY = y1 + dy * 0.5;

    return `M ${x1},${y1} 
            C ${x1 + dx * 0.35},${y1} ${midX - 80},${midY + 80} ${midX},${midY + 40}
            C ${midX + 60},${midY + 10} ${midX - 60},${midY - 60} ${midX},${midY - 30}
            C ${midX + 40},${midY - 10} ${x2 - dx * 0.25},${y2} ${x2},${y2}`;
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        minHeight: '100vh',
        color: '#212529',
        fontFamily: 'var(--font-halyard-display-variable)',
        paddingTop: '76px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Nav />

      {/* ── Main Layout Container ── */}
      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 40px 140px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        
        {/* ── Section 1: We're designing a new way to protect ── */}
        <section
          ref={containerRef1}
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '80px',
            alignItems: 'center',
            marginBottom: '160px',
            position: 'relative',
          }}
          className="about-section"
        >
          {/* Dynamic Section 1 Connector SVG (text to image) - Raised zIndex to layer over elements */}
          <div className="section-connector" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 12 }}>
            <svg style={{ width: '100%', height: '100%' }} fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="s1-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e63946" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e63946" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              {coords1.x1 !== 0 && (
                <>
                  <path
                    d={getPath1()}
                    stroke="url(#s1-gradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx={coords1.x1} cy={coords1.y1} r="5" fill="#e63946" />
                  <circle cx={coords1.x2} cy={coords1.y2} r="5" fill="#e63946" />
                </>
              )}
            </svg>
          </div>

          {/* Left Column Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 2 }}>
            <h1
              style={{
                fontFamily: "'Parisian', 'Playfair Display', serif",
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 'bold',
                color: '#212529',
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              We&apos;re designing a new way to protect
            </h1>
            <p
              style={{
                fontSize: '16.5px',
                lineHeight: 1.7,
                color: '#4b5563',
                margin: 0,
                maxWidth: '520px',
              }}
            >
              Our certified safety solutions help connect industrial enterprises with secure work environments, companies with protected employees, and move their projects forward without <span ref={endWordRef1} style={{ display: 'inline-block' }}>risk.</span>
            </p>
          </div>

          {/* Right Column Image Block with 3D Offset & Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            
            {/* The Offset Background Card Shape */}
            <div
              className="offset-card-bg red-offset"
              style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                width: '100%',
                maxWidth: '380px',
                height: '460px',
                backgroundColor: 'rgba(230, 57, 70, 0.05)',
                borderRadius: '16px',
                zIndex: -1,
              }}
            />

            {/* Overlapping White Compliance Notification Badge */}
            <div
              style={{
                position: 'absolute',
                top: '60px',
                left: '-40px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderLeft: '4px solid #e63946',
                padding: '14px 20px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                maxWidth: '280px',
              }}
              className="badge-animate"
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#e63946',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Compliance Verified!
              </span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#212529', lineHeight: 1.4 }}>
                Vanguard Helmet ANSI Z89.1 [Approval Certificate]
              </span>
            </div>

            {/* Portrait Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef1}
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600&h=800"
              alt="Male Safety Inspector"
              style={{
                width: '100%',
                maxWidth: '380px',
                height: '460px',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
              }}
            />
          </div>
        </section>

        {/* ── Section 2: Making it easy to say "yes" (Alternating Layout) ── */}
        <section
          ref={containerRef2}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '80px',
            alignItems: 'center',
            position: 'relative',
          }}
          className="about-section alt-grid"
        >
          {/* Dynamic Section 2 Connector SVG (image to text) - Raised zIndex to layer over elements */}
          <div className="section-connector" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 12 }}>
            <svg style={{ width: '100%', height: '100%' }} fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="s2-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e63946" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#e63946" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {coords2.x1 !== 0 && (
                <>
                  <path
                    d={getPath2()}
                    stroke="url(#s2-gradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <circle cx={coords2.x1} cy={coords2.y1} r="5" fill="#e63946" />
                  <circle cx={coords2.x2} cy={coords2.y2} r="5" fill="#e63946" />
                </>
              )}
            </svg>
          </div>

          {/* Left Column Image Block with 3D Offset & Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }} className="image-col-alt">
            
            {/* The Offset Background Card Shape (Grey accent) */}
            <div
              className="offset-card-bg grey-offset"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '100%',
                maxWidth: '380px',
                height: '460px',
                backgroundColor: 'rgba(33, 37, 41, 0.04)',
                borderRadius: '16px',
                zIndex: -1,
              }}
            />

            {/* Overlapping White Standards Approved Notification Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '60px',
                right: '-40px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderLeft: '4px solid #e63946',
                padding: '14px 20px',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                maxWidth: '280px',
              }}
              className="badge-animate"
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#e63946',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Standards Approved!
              </span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#212529', lineHeight: 1.4 }}>
                ASTM F2413 Steel Toe Boots [Site Inspection Approved]
              </span>
            </div>

            {/* Portrait Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef2}
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600&h=800"
              alt="Female Structural Engineer"
              style={{
                width: '100%',
                maxWidth: '380px',
                height: '460px',
                objectFit: 'cover',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.06)',
              }}
            />
          </div>

          {/* Right Column Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 2 }}>
            <h2
              style={{
                fontFamily: "'Parisian', 'Playfair Display', serif",
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 'bold',
                color: '#212529',
                lineHeight: 1.15,
                margin: 0,
                letterSpacing: '-0.02em',
                width: 'fit-content',
              }}
            >
              <span ref={startWordRef2} style={{ display: 'inline-block', marginRight: '14px' }}>Making</span>it easy to say &quot;yes&quot;
            </h2>
            <p
              style={{
                fontSize: '16.5px',
                lineHeight: 1.7,
                color: '#4b5563',
                margin: 0,
                maxWidth: '520px',
              }}
            >
              Millions of forward-thinking industrial managers trust AMS Safety to power their project protection guidelines. Our components streamline safety audits, secure compliance validation, and allow crews to operate with confidence.
            </p>
          </div>
        </section>

      </main>

      {/* ── Responsive styling overrides ── */}
      <style jsx>{`
        .badge-animate {
          transition: transform 0.3s ease;
        }
        .badge-animate:hover {
          transform: scale(1.03) translateY(-2px);
        }

        @media (max-width: 968px) {
          .section-connector {
            display: none !important;
          }
          .about-section {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
            margin-bottom: 120px !important;
          }
          .about-section div {
            align-items: center;
          }
          .about-section p {
            max-width: 100% !important;
          }
          .image-col-alt {
            order: -1;
          }
          .badge-animate {
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 85% !important;
            max-width: 320px !important;
          }
          .badge-animate:hover {
            transform: translateX(-50%) scale(1.02) !important;
          }
          .offset-card-bg {
            left: 50% !important;
            right: auto !important;
          }
          .offset-card-bg.red-offset {
            transform: translateX(-44%) !important;
          }
          .offset-card-bg.grey-offset {
            transform: translateX(-56%) !important;
          }
        }
      `}</style>
    </div>
  );
}

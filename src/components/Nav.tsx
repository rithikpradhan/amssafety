'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAV_ITEMS = [
  { label: 'About Us', targetId: 'about-us' },
  { label: 'Product', targetId: 'products' },
  { label: 'Contact', targetId: 'contact' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!wordmarkRef.current) return;
    const letters = wordmarkRef.current.querySelectorAll('.nav-char');
    gsap.fromTo(
      letters,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.04,
        delay: 0.2,
      }
    );

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      const chars = item.querySelectorAll('.nav-char');
      gsap.fromTo(
        chars,
        { opacity: 0, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.025,
          delay: 0.35 + i * 0.08,
        }
      );
    });
  }, []);

  const splitToChars = (text: string) =>
    text.split('').map((char, i) => (
      <span key={i} className="nav-char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback searches
      const fallback = document.querySelector(`[id*="${targetId}"]`);
      if (fallback) fallback.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className="main-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px',
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.03)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Brand Wordmark Logo */}
      <div
        ref={wordmarkRef}
        className="nav-wordmark"
        style={{
          fontFamily: "'Parisian', 'Playfair Display', serif",
          fontSize: '22px',
          fontWeight: '400',
          color: '#111827',
          letterSpacing: '-0.01em',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="AMS Safety — Home"
      >
        {splitToChars('AMS Safety')}
      </div>

      {/* Nav Items List */}
      <ul className="nav-items-list" style={{ display: 'flex', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
        {NAV_ITEMS.map((item, i) => (
          <li
            key={item.label}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="nav-link-item"
            style={{
              fontFamily: 'var(--font-halyard-display-variable)',
              fontSize: '15px',
              fontWeight: '500',
              color: '#111827',
              cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: 'color 0.25s ease',
              userSelect: 'none',
            }}
            onClick={() => scrollToSection(item.targetId)}
          >
            {splitToChars(item.label)}
          </li>
        ))}
      </ul>

      <style jsx>{`
        .main-nav {
          padding: 0 80px;
        }
        .nav-items-list {
          gap: 44px;
        }
        .nav-link-item:hover {
          color: #e63946 !important;
        }

        @media (max-width: 1024px) {
          .main-nav {
            padding: 0 40px;
          }
          .nav-items-list {
            gap: 32px;
          }
        }

        @media (max-width: 768px) {
          .main-nav {
            height: 64px;
            padding: 0 24px;
          }
          .nav-wordmark {
            font-size: 18px !important;
          }
          .nav-items-list {
            gap: 20px;
          }
          .nav-link-item {
            font-size: 13px !important;
          }
        }

        @media (max-width: 480px) {
          .main-nav {
            padding: 0 16px;
          }
          .nav-items-list {
            gap: 14px;
          }
          .nav-link-item {
            font-size: 12px !important;
          }
        }
      `}</style>
    </nav>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  sold: number;
  image: string;
}

const CATEGORIES = [
  'All Products',
  'Head Protection',
  'Footwear',
  'Fire Safety',
  'Apparel',
  'Fall Protection',
  'Hearing & Eye',
];

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Vanguard Industrial Hard Hat',
    category: 'Head Protection',
    price: '$150.50',
    stock: 544,
    sold: 256,
    image: '/ams-product-removebg-preview.png',
  },
  {
    id: '2',
    name: 'ProShield Steel Toe Safety Boots',
    category: 'Footwear',
    price: '$160.40',
    stock: 544,
    sold: 256,
    image: '/prod-boots.png',
  },
  {
    id: '3',
    name: 'Titan ABC Fire Extinguisher 5kg',
    category: 'Fire Safety',
    price: '$120.30',
    stock: 544,
    sold: 256,
    image: '/prod-extinguisher.png',
  },
  {
    id: '4',
    name: 'High-Vis Thermal Safety Jacket',
    category: 'Apparel',
    price: '$120.99',
    stock: 544,
    sold: 256,
    image: '/prod-jacket.png',
  },
  {
    id: '5',
    name: 'Quantum Full-Body Fall Harness',
    category: 'Fall Protection',
    price: '$150.50',
    stock: 544,
    sold: 256,
    image: '/prod-harness.png',
  },
  {
    id: '6',
    name: 'Acoustic Pro Ear Defenders 34dB',
    category: 'Hearing & Eye',
    price: '$110.20',
    stock: 544,
    sold: 256,
    image: '/prod-earmuffs.png',
  },
  {
    id: '7',
    name: 'Stealth Z87 Clear Safety Glasses',
    category: 'Hearing & Eye',
    price: '$85.50',
    stock: 544,
    sold: 256,
    image: '/prod-glasses.png',
  },
  {
    id: '8',
    name: 'Apex Heavy Duty Welding Visor',
    category: 'Head Protection',
    price: '$175.00',
    stock: 544,
    sold: 256,
    image: '/ams-product-removebg-preview.png',
  },
];

export default function ProductGridSection() {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // ── GSAP ScrollTrigger Animations for Clean UI Elements ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 50, rotationX: -15 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Categories reveal
      if (categoriesRef.current) {
        const buttons = categoriesRef.current.querySelectorAll('button');
        gsap.fromTo(
          buttons,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Grid cards stagger reveal
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.product-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 70, scale: 0.92, rotationX: 10 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredProducts = PRODUCTS.filter((product) => {
    return activeCategory === 'All Products' || product.category === activeCategory;
  });

  return (
    <section
      ref={sectionRef}
      id="products"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '60px 40px 100px',
        color: '#111827',
        fontFamily: 'var(--font-halyard-display-variable)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* ── 1. Top Header Row ── */}
        <div style={{ marginBottom: '32px' }}>
          <h2
            ref={headingRef}
            style={{
              fontSize: 'clamp(32px, 4vw, 104px)',
              fontWeight: '600',
              fontFamily: "'Parisian', 'Playfair Display', 'Times New Roman', serif",
              letterSpacing: '-0.02em',
              color: '#111827',
              willChange: 'transform, opacity',
            }}
          >
            Products
          </h2>
        </div>

        {/* ── 2. Category Filter Tabs Row ── */}
        <div
          ref={categoriesRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '36px',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '14px',
                  fontWeight: isActive ? '500' : '400',
                  backgroundColor: isActive ? '#f3f4f6' : 'transparent',
                  color: isActive ? '#111827' : '#6b7280',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  willChange: 'transform, opacity',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#111827';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#6b7280';
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* ── 3. Products Cards Grid ── */}
        <div ref={gridRef} className="products-grid-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                padding: '16px',
                border: '1px solid #f0f0f0',
                transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                willChange: 'transform, opacity',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
                const img = e.currentTarget.querySelector('.card-img') as HTMLElement;
                if (img) img.style.transform = 'scale(1.08) translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                const img = e.currentTarget.querySelector('.card-img') as HTMLElement;
                if (img) img.style.transform = 'scale(1) translateY(0)';
              }}
            >
              <div>
                {/* Product Inner Image Box */}
                <div
                  style={{
                    width: '100%',
                    height: '220px',
                    backgroundColor: '#f4f5f7',
                    borderRadius: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    marginBottom: '16px',
                    overflow: 'hidden',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="card-img"
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                  />
                </div>

                {/* Product Title */}
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}
                >
                  {product.name}
                </h3>

                {/* Price */}
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '16px',
                  }}
                >
                  {product.price}
                </p>
              </div>

              {/* Stock and Sold Footer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '13px',
                  color: '#6b7280',
                  borderTop: '1px solid #f3f4f6',
                  paddingTop: '12px',
                }}
              >
                <span>
                  Stock: <strong style={{ color: '#111827' }}>{product.stock}</strong>
                </span>
                <span>
                  Sold: <strong style={{ color: '#111827' }}>{product.sold}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .products-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        @media (max-width: 1100px) {
          .products-grid-4 {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .products-grid-4 {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        @media (max-width: 480px) {
          .products-grid-4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

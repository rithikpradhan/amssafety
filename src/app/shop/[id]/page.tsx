'use client';

import { use } from 'react';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { PRODUCTS } from '@/lib/products';
import Nav from '@/components/Nav';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  // Resolve params Promise using React.use()
  const { id } = use(params);

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div
        style={{
          backgroundColor: '#ffffff',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#212529',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <Nav />
        <h2 style={{ fontFamily: "'Parisian', serif", fontSize: '32px', marginBottom: '16px' }}>
          Equipment Not Found
        </h2>
        <p style={{ color: '#4b5563', marginBottom: '24px' }}>
          The requested safety equipment ID does not exist in our catalog.
        </p>
        <Link
          href="/shop"
          style={{
            backgroundColor: '#25D366',
            color: '#ffffff',
            padding: '12px 28px',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  // Helper to extract net weight or primary descriptor
  const getCapacityText = () => {
    if (product.specs['Weight']) return `Net weight ${product.specs['Weight']}`;
    if (product.specs['Weight Capacity']) return `Max capacity ${product.specs['Weight Capacity']}`;
    if (product.specs['Capacity']) return `Capacity ${product.specs['Capacity']}`;
    if (product.specs['Noise Reduction']) return `Attenuation ${product.specs['Noise Reduction']}`;
    if (product.specs['Shade Control']) return `Shade Range ${product.specs['Shade Control']}`;
    return 'Certified Protective Equipment';
  };

  // Pipe separated claims matching the serum layout style
  const getSubFeaturesText = () => {
    const defaultClaims = ['Heavy-Duty', 'Non-toxic', 'Certified'];
    if (product.category === 'Head Protection') return ['ANSI Z89.1 Certified', 'Impact Absorbing', 'Adjustable Fit'];
    if (product.category === 'Footwear') return ['ASTM F2413 Certified', 'Slip Resistant', 'Waterproof'];
    if (product.category === 'Fire Safety') return ['UL Listed', 'Class A B C Rated', 'Commercial Grade'];
    if (product.category === 'Apparel') return ['ANSI Class 3', 'Thermal Insulated', 'Waterproof'];
    if (product.category === 'Fall Protection') return ['OSHA Compliant', 'ANSI Z359.11', 'High Capacity'];
    if (product.category === 'Hearing & Eye') return ['ANSI S3.19 Certified', 'High Attenuation', 'Anti-Fog Lens'];
    return defaultClaims;
  };

  // Pre-fill links for WhatsApp and Email
  const whatsappLink = `https://wa.me/919999999999?text=${encodeURIComponent(
    `Hi AMS Safety, I am interested in inquiring about the "${product.name}" (${product.price}). Please provide availability, bulk discounts, and shipping times.`
  )}`;

  const emailSubject = `Inquiry: ${product.name} (ID: ${product.id})`;
  const emailBody = `Hi AMS Safety,\n\nI would like to enquire about the "${product.name}".\n\nPrice: ${product.price}\nCategory: ${product.category}\n\nPlease share the technical specifications sheet and a quote for bulk ordering.\n\nThank you!`;
  const emailLink = `mailto:info@amssafety.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

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

      {/* ── Main Detail Content Container ── */}
      <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '40px 40px 100px', position: 'relative', zIndex: 2 }}>

        {/* ── Top Navigation Row ── */}
        <div
          className="breadcrumbs-nav-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px',
          }}
        >
          {/* Breadcrumbs */}
          <nav
            className="breadcrumbs-list"
            style={{
              fontSize: '13px',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Link href="/" style={{ textDecoration: 'none', color: '#6b7280' }} className="hover-red">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" style={{ textDecoration: 'none', color: '#6b7280' }} className="hover-red">
              Shop
            </Link>
            <span>/</span>
            <span style={{ color: '#4b5563' }}>{product.category}</span>
            <span className="breadcrumb-product-sep">/</span>
            <span className="breadcrumb-product-name" style={{ color: '#212529', fontWeight: '500' }}>{product.name}</span>
          </nav>

          {/* Back button with type nav-back */}
          <Link
            href="/shop"
            transitionTypes={['nav-back']}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              color: '#212529',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'transform 0.2s',
            }}
            className="back-btn back-catalog-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Catalog
          </Link>
        </div>

        {/* ── 3 Column Product Details Layout (Refined Serum Style) ── */}
        <div
          className="product-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr 1fr',
            gap: '50px',
            alignItems: 'center',
            minHeight: '650px',
          }}
        >

          {/* ── Column 1 (Left Details): Name, Price, Business Enquiry CTAs ── */}
          <div className="details-left-col" style={{ display: 'flex', flexDirection: 'column', gap: '26px', zIndex: 3, maxWidth: '340px' }}>

            {/* Category Tag */}
            <span
              style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: '600',
                color: '#e63946',
                backgroundColor: 'rgba(230, 57, 70, 0.08)',
                padding: '4px 10px',
                borderRadius: '6px',
                width: 'fit-content',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {product.category}
            </span>

            {/* Product Title */}
            <ViewTransition name={`product-title-${product.id}`}>
              <h1
                style={{
                  fontFamily: "'Parisian', 'Playfair Display', serif",
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  fontWeight: 'bold',
                  color: '#212529',
                  lineHeight: 1.2,
                  margin: 0,
                  letterSpacing: '-0.019em',
                }}
              >
                {product.name}
              </h1>
            </ViewTransition>

            {/* Price Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '26px', fontWeight: '600', color: '#1c1917' }}>
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '18px', textDecoration: 'line-through', color: '#a8a29e' }}>
                    {product.originalPrice}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Inclusive of standard safety testing & certifications
              </span>
            </div>

            {/* Business Enquiry Action Buttons (WhatsApp and Email) */}
            <div className="enquiry-buttons-row" style={{ display: 'flex', gap: '16px', marginTop: '16px', width: '100%' }}>

              {/* WhatsApp Enquiry Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="b2b-btn-3d wa"
              >
                <div className="badge-circle">
                  {/* Clean inline SVG WhatsApp Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.004 2c-5.517 0-9.996 4.478-9.996 9.996 0 1.764.46 3.424 1.264 4.887l-1.258 4.593 4.707-1.235c1.41.77 3.007 1.207 4.71 1.207 5.517 0 9.996-4.478 9.996-9.996 0-5.517-4.479-9.996-9.996-9.996zm5.82 14.195c-.244.688-1.233 1.252-1.706 1.298-.426.04-.973.06-1.58-.135-.373-.12-1.57-.54-2.99-1.17-2.883-1.278-4.737-4.223-4.88-4.414-.144-.191-1.155-1.536-1.155-2.93 0-1.393.72-2.078.977-2.357.258-.28.566-.35.756-.35h.54c.17 0 .398-.06.623.47.247.587.844 2.057.917 2.204.073.148.12.32.02.518-.1.196-.15.32-.294.49-.144.17-.3.38-.43.51-.144.14-.294.3-.127.587.167.288.74 1.218 1.587 1.97.11.096.223.18.337.26 1.09.917 1.71 1.207 2.03 1.348.32.14.507.12.697-.097.19-.217.824-.96.994-1.29.17-.33.34-.275.57-.19s1.47.69 1.724.82c.254.13.424.195.485.3.06.108.06.62-.185 1.31z" />
                  </svg>
                </div>
                <div className="pill-body">
                  <span>Enquire via</span>
                </div>
              </a>

              {/* Email Enquiry Button */}
              <a
                href={emailLink}
                className="b2b-btn-3d em"
              >
                <div className="badge-circle">
                  {/* Clean inline SVG Mail Envelope Icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="pill-body">
                  <span>Enquire via</span>
                </div>
              </a>
            </div>
          </div>

          {/* ── Column 2 (Center Visual): Enlarged Stadium Frame, Image, Starburst, Giant AMS Text ── */}
          <div
            className="center-col"
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '620px',
              zIndex: 1,
            }}
          >

            {/* Giant "AMS" Watermark Background Text (Enlarged) */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Parisian', 'Playfair Display', serif",
                fontSize: 'clamp(180px, 24vw, 360px)',
                fontWeight: '400',
                color: 'rgba(230, 57, 70, 0.035)',
                letterSpacing: '0.04em',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: -2,
                whiteSpace: 'nowrap',
              }}
            >
              AMS
            </div>

            {/* Custom Multi-Point Starburst Background SVG (Enlarged) */}
            <div
              style={{
                position: 'absolute',
                bottom: '8%',
                left: '6%',
                transform: 'translate(-20%, 20%)',
                width: '180px',
                height: '180px',
                pointerEvents: 'none',
                zIndex: -1,
                opacity: 0.85,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 0 L54 35 L85 15 L65 43 L100 50 L65 57 L85 85 L54 65 L50 100 L46 65 L15 85 L35 57 L0 50 L35 43 L15 15 L46 35 Z"
                  fill="rgba(230, 57, 70, 0.07)"
                />
              </svg>
            </div>

            {/* Central Vertical Capsule Container (Enlarged to fill space) */}
            <div
              className="vertical-capsule"
              style={{
                width: '390px',
                height: '560px',
                borderRadius: '195px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                backgroundColor: '#ffffff',
                backdropFilter: 'blur(4px)',
                boxShadow: 'inset 0 0 40px rgba(230, 57, 70, 0.01)',
                position: 'relative',
              }}
            >
              <ViewTransition name={`product-image-${product.id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxHeight: '92%',
                    maxWidth: '92%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 40px rgba(27, 24, 21, 0.1))',
                  }}
                />
              </ViewTransition>
            </div>

            {/* Vertical Pagination Dots next to capsule */}
            <div
              className="indicator-dots"
              style={{
                position: 'absolute',
                right: '1%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '3px',
                  height: '24px',
                  borderRadius: '3px',
                  backgroundColor: '#25D366',
                }}
              />
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#c8c2b7' }} />
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#c8c2b7' }} />
            </div>
          </div>

          {/* ── Column 3 (Right Details): Expanded Description, Capacity, Claims ── */}
          <div className="details-right-col" style={{ display: 'flex', flexDirection: 'column', gap: '32px', zIndex: 3 }}>

            {/* Description heading & expanded text */}
            <div>
              <h2
                style={{
                  fontFamily: "'Parisian', 'Playfair Display', serif",
                  fontSize: '19px',
                  fontWeight: '600',
                  color: '#212529',
                  margin: '0 0 16px',
                  letterSpacing: '0.02em',
                }}
              >
                Product description
              </h2>

              {/* Expanded general paragraph */}
              <p
                style={{
                  color: '#212529',
                  fontSize: '15px',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {product.description}
              </p>

              {/* Added detail paragraph incorporating specs and design parameters to fill space */}
              <p
                style={{
                  color: '#4b5563',
                  fontSize: '14.5px',
                  lineHeight: 1.65,
                  marginTop: '16px',
                  marginBottom: 0,
                }}
              >
                This industrial equipment is designed for high-risk zones and challenging environments. Built using premium raw materials and subject to stringent safety tests, it features an optimized layout that withstands heavy impacts, pressure variations, and weather conditions. Recommended for structural assembly, site inspections, and logistics operations.
              </p>
            </div>

            {/* Spec details / Capacity block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '15px', color: '#212529', fontWeight: '600' }}>
                {getCapacityText()}
              </span>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>
                Standards compliance: {product.specs['Certification'] || product.specs['Standards'] || 'ANSI/OSHA Certified'}
              </span>
            </div>

            {/* Horizontal pipe-separated claims list */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                color: '#6b7280',
                fontWeight: '600',
              }}
            >
              {getSubFeaturesText().map((claim, idx, arr) => (
                <span key={claim} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{claim}</span>
                  {idx < arr.length - 1 && <span style={{ color: '#e5e7eb', fontSize: '14px' }}>|</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ── Dynamic Details Styling ── */}
      <style jsx>{`
        .hover-red:hover {
          color: #e63946 !important;
        }
        .back-btn:hover {
          color: #e63946 !important;
          transform: translateX(-4px);
        }


        @media (max-width: 1024px) {
          .product-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .details-left-col {
            max-width: 100% !important;
            align-items: center !important;
            margin: 0 auto;
          }
          .details-left-col :global(.enquiry-buttons-row) {
            justify-content: center !important;
          }
          .center-col {
            order: -1;
            height: 480px !important;
          }
          .vertical-capsule {
            height: 450px !important;
            width: 310px !important;
            border-radius: 155px !important;
            padding: 24px !important;
          }
          .indicator-dots {
            display: none !important;
          }
          .details-right-col {
            align-items: center !important;
            margin: 0 auto;
          }
          .details-right-col div[style*="display: flex; flex-direction: column"] {
            align-items: center !important;
          }
          .details-right-col div[style*="display: flex; flex-wrap: wrap"] {
            justify-content: center !important;
          }
        }
        @media (max-width: 768px) {
          .breadcrumbs-nav-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
            margin-bottom: 24px !important;
          }
          .breadcrumbs-list {
            flex-wrap: wrap !important;
            line-height: 1.6 !important;
          }
        }
        @media (max-width: 640px) {
          .breadcrumb-product-sep,
          .breadcrumb-product-name {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .center-col {
            height: 390px !important;
          }
          .vertical-capsule {
            height: 360px !important;
            width: 250px !important;
            border-radius: 125px !important;
            padding: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { PRODUCTS, CATEGORIES } from '@/lib/products';
import Nav from '@/components/Nav';

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number>(250);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // Load wishlist from localStorage on client mount
  useEffect(() => {
    const saved = localStorage.getItem('ams-wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          setWishlist(parsed);
        }, 0);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (wishlist.includes(id)) {
      updated = wishlist.filter((item) => item !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    localStorage.setItem('ams-wishlist', JSON.stringify(updated));
  };

  // Filter and Sort Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'All Products' || product.category === activeCategory;
    const matchesPrice = product.priceVal <= priceRange;
    const matchesStock = !showInStockOnly || product.stock > 0;
    return matchesCategory && matchesPrice && matchesStock;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') {
      return a.priceVal - b.priceVal;
    }
    if (sortBy === 'Price: High to Low') {
      return b.priceVal - a.priceVal;
    }
    if (sortBy === 'Top Rated') {
      return b.rating - a.rating;
    }
    // Default 'Featured' (by original position / stock)
    return parseInt(a.id) - parseInt(b.id);
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(
          <span key={i} style={{ color: '#d97706', fontSize: '13px' }}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} style={{ color: '#e5e7eb', fontSize: '13px' }}>
            ★
          </span>
        );
      }
    }
    return stars;
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
      }}
    >
      <Nav />

      {/* ── Outer Page Container ── */}
      <main style={{ maxWidth: '1700px', margin: '0 auto', padding: '40px 40px 100px' }}>

        {/* ── Breadcrumb Bar ── */}
        <nav
          style={{
            fontSize: '13px',
            color: '#6b7280',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', color: '#6b7280', transition: 'color 0.2s' }} className="hover-dark">
            Home
          </Link>
          <span>/</span>
          <span style={{ color: '#212529', fontWeight: '500' }}>Shop</span>
        </nav>

        {/* ── Header Title Row ── */}
        <div
          className="shop-header-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Parisian', 'Playfair Display', serif",
                fontSize: 'clamp(36px, 5vw, 68px)',
                fontWeight: '400',
                color: '#212529',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              All Products
            </h1>
            <p style={{ color: '#4b5563', fontSize: '15px', marginTop: '10px', maxWidth: '600px' }}>
              Engineered protection and safety gear built for extreme industrial environments. Tested to ANSI and OSHA standards.
            </p>
          </div>
          <div style={{ fontSize: '14px', color: '#4b5563', fontWeight: '500' }}>
            Showing 1–{sortedProducts.length} of {PRODUCTS.length} results
          </div>
        </div>

        {/* ── Filters & Options Bar ── */}
        <div
          className="filters-options-bar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '14px 24px',
            borderRadius: '100px',
            boxShadow: '0 4px 30px rgba(27, 24, 21, 0.03)',
            border: '1px solid #e5e7eb',
            marginBottom: '36px',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left: Filter Toggle */}
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: isFilterPanelOpen ? '#212529' : '#f3f4f6',
              color: isFilterPanelOpen ? '#ffffff' : '#1c1917',
              border: '1px solid #e5e7eb',
              padding: '10px 22px',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            className="filter-toggle-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Filters
          </button>

          {/* Middle: Category Pills Wrapper */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, maxWidth: '60%' }} className="category-scroll-wrapper">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                width: '100%',
                paddingRight: '24px',
              }}
              className="category-scroll-container"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    style={{
                      backgroundColor: isActive ? '#1c1917' : 'transparent',
                      color: isActive ? '#ffffff' : '#786e64',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: isActive ? '500' : '400',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                    }}
                    className={`category-pill ${isActive ? '' : 'hover-bg'}`}
                  >
                    {category === 'All Products' ? 'All' : category}
                  </button>
                );
              })}
            </div>

            {/* Pulsing Horizontal Scroll indicator arrow with White Fade Background Overlay */}
            <div
              className="category-scroll-indicator"
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '60px',
                background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 50%, #ffffff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '6px',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <svg className="scroll-arrow-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: '#786e64' }}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>

          {/* Right: Sort and Grid Toggles */}
          <div className="sort-toggle-container" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#786e64' }}>
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#212529',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '13px',
                  outline: 'none',
                }}
              >
                <option value="Featured">Featured</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Top Rated">Top Rated</option>
              </select>
            </div>

            <div
              style={{
                width: '1px',
                height: '20px',
                backgroundColor: '#e5e7eb',
              }}
            />

            {/* Layout Toggles */}
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  border: 'none',
                  backgroundColor: viewMode === 'grid' ? '#f3f4f6' : 'transparent',
                  color: viewMode === 'grid' ? '#1c1917' : '#a8a29e',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Grid View"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>

              <button
                onClick={() => setViewMode('list')}
                style={{
                  border: 'none',
                  backgroundColor: viewMode === 'list' ? '#f3f4f6' : 'transparent',
                  color: viewMode === 'list' ? '#1c1917' : '#a8a29e',
                  padding: '6px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="List View"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Content Grid Layout ── */}
        <div style={{ display: 'flex', gap: '30px', position: 'relative' }}>

          {/* ── Mobile Filter Backdrop Overlay ── */}
          {isFilterPanelOpen && (
            <div
              onClick={() => setIsFilterPanelOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(4px)',
                zIndex: 999,
              }}
              className="filter-backdrop-mobile"
            />
          )}

          {/* ── Slide-down / Collapsible Filter Panel ── */}
          <div
            style={{
              width: '280px',
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '1px solid #e5e7eb',
              padding: '24px',
              boxShadow: '0 4px 30px rgba(27, 24, 21, 0.03)',
              display: isFilterPanelOpen ? 'block' : 'none',
              height: 'fit-content',
              position: 'sticky',
              top: '100px',
              zIndex: 10,
              animation: 'slide-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="filter-sidebar"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#1c1917' }}>Filter Options</h3>
              <button
                onClick={() => setIsFilterPanelOpen(false)}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  color: '#4b5563',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="filter-close-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Price Filter */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#786e64' }}>Max Price:</span>
                <span style={{ fontWeight: '600', color: '#1c1917' }}>${priceRange}</span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#1c1917',
                  cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#a8a29e', marginTop: '4px' }}>
                <span>$50</span>
                <span>$250</span>
              </div>
            </div>

            {/* In Stock toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="stock-toggle"
                checked={showInStockOnly}
                onChange={() => setShowInStockOnly(!showInStockOnly)}
                style={{
                  accentColor: '#1c1917',
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer',
                }}
              />
              <label htmlFor="stock-toggle" style={{ fontSize: '14px', color: '#4b5563', cursor: 'pointer', userSelect: 'none' }}>
                In Stock Only
              </label>
            </div>

            {/* Clear button */}
            <button
              onClick={() => {
                setPriceRange(250);
                setShowInStockOnly(false);
                setActiveCategory('All Products');
                setSortBy('Featured');
              }}
              style={{
                width: '100%',
                backgroundColor: '#ffffff',
                color: '#212529',
                border: '1px solid #e5e7eb',
                padding: '10px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              className="hover-bg-light"
            >
              Reset All Filters
            </button>
          </div>

          {/* ── Product List Display ── */}
          <div style={{ flex: 1 }}>
            {sortedProducts.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '80px 0',
                  textAlign: 'center',
                }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#a8a29e" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h3 style={{ margin: '16px 0 8px', fontSize: '18px', color: '#212529', fontWeight: '500' }}>No products found</h3>
                <p style={{ color: '#4b5563', fontSize: '14px', maxWidth: '320px', margin: 0 }}>
                  Try adjusting your filters or price range to discover other protection gear.
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid Layout */
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '30px',
                }}
                className="grid-4-cols"
              >
                {sortedProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <Link
                      key={product.id}
                      href={`/shop/${product.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '24px',
                          padding: '16px',
                          border: '1px solid #e5e7eb',
                          boxShadow: '0 4px 20px rgba(27, 24, 21, 0.02)',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease',
                        }}
                        className="product-card-shop"
                      >
                        {/* Tags & Heart Icons Box */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '28px',
                            left: '28px',
                            right: '28px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: 2,
                          }}
                        >
                          {/* Sale Tag */}
                          {product.discount ? (
                            <span
                              style={{
                                backgroundColor: '#e63946',
                                color: '#ffffff',
                                fontSize: '12px',
                                fontWeight: '600',
                                padding: '4px 10px',
                                borderRadius: '30px',
                              }}
                            >
                              {product.discount}
                            </span>
                          ) : (
                            <span />
                          )}

                          {/* Heart Circle */}
                          <button
                            onClick={(e) => toggleWishlist(product.id, e)}
                            style={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e5e7eb',
                              width: '36px',
                              height: '36px',
                              borderRadius: '50px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                              transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            }}
                            className="heart-btn"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill={isWishlisted ? '#B04F3D' : 'none'}
                              stroke={isWishlisted ? '#e63946' : '#6b7280'}
                              strokeWidth="2"
                              style={{ transition: 'all 0.2s' }}
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                          </button>
                        </div>

                        {/* Image Box */}
                        <div
                          style={{
                            backgroundColor: '#f3f4f6',
                            borderRadius: '18px',
                            height: '240px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '30px',
                            marginBottom: '16px',
                            overflow: 'hidden',
                          }}
                        >
                          <ViewTransition name={`product-image-${product.id}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                              }}
                              className="card-img-shop"
                            />
                          </ViewTransition>
                        </div>

                        {/* Text Details Box */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div>
                            {/* Category Pill Tag */}
                            <span
                              style={{
                                display: 'inline-block',
                                fontSize: '11px',
                                fontWeight: '500',
                                color: '#e63946',
                                backgroundColor: 'rgba(230, 57, 70, 0.08)',
                                padding: '3px 8px',
                                borderRadius: '6px',
                                marginBottom: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em',
                              }}
                            >
                              {product.category}
                            </span>

                            {/* Product Title */}
                            <ViewTransition name={`product-title-${product.id}`}>
                              <h3
                                style={{
                                  fontSize: '17px',
                                  fontWeight: '600',
                                  color: '#212529',
                                  margin: '0 0 6px',
                                  lineHeight: 1.35,
                                }}
                              >
                                {product.name}
                              </h3>
                            </ViewTransition>

                            {/* Star Ratings */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                              <div style={{ display: 'flex' }}>{renderStars(product.rating)}</div>
                              <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: '500' }}>
                                {product.rating} ({product.reviews})
                              </span>
                            </div>
                          </div>

                          {/* Price Row */}
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
                            <span style={{ fontSize: '18px', fontWeight: '700', color: '#1c1917' }}>
                              {product.price}
                            </span>
                            {product.originalPrice && (
                              <span style={{ fontSize: '14px', textDecoration: 'line-through', color: '#a8a29e' }}>
                                {product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              /* List Layout */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {sortedProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <Link
                      key={product.id}
                      href={`/shop/${product.id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div
                        style={{
                          backgroundColor: '#ffffff',
                          borderRadius: '24px',
                          padding: '16px',
                          border: '1px solid #e5e7eb',
                          boxShadow: '0 4px 20px rgba(27, 24, 21, 0.02)',
                          display: 'flex',
                          gap: '24px',
                          alignItems: 'center',
                          position: 'relative',
                          cursor: 'pointer',
                          transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease',
                        }}
                        className="product-card-shop list-card"
                      >
                        {/* Image Box */}
                        <div
                          className="card-img-shop-wrapper"
                          style={{
                            backgroundColor: '#f3f4f6',
                            borderRadius: '18px',
                            width: '200px',
                            height: '180px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px',
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <ViewTransition name={`product-image-${product.id}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                              }}
                              className="card-img-shop"
                            />
                          </ViewTransition>
                        </div>

                        {/* Details Panel */}
                        <div style={{ flex: 1 }}>
                          {/* Category Tag */}
                          <span
                            style={{
                              display: 'inline-block',
                              fontSize: '11px',
                              fontWeight: '500',
                              color: '#e63946',
                              backgroundColor: 'rgba(230, 57, 70, 0.08)',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              marginBottom: '6px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.03em',
                            }}
                          >
                            {product.category}
                          </span>

                          {/* Product Title */}
                          <ViewTransition name={`product-title-${product.id}`}>
                            <h3
                              style={{
                                fontSize: '20px',
                                fontWeight: '600',
                                color: '#212529',
                                margin: '0 0 6px',
                              }}
                            >
                              {product.name}
                            </h3>
                          </ViewTransition>

                          {/* Ratings */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                            <div style={{ display: 'flex' }}>{renderStars(product.rating)}</div>
                            <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: '500' }}>
                              {product.rating} ({product.reviews} reviews)
                            </span>
                          </div>

                          {/* Snippet Description */}
                          <p style={{ color: '#4b5563', fontSize: '14px', margin: '0 0 12px', lineClamp: 2, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {product.description}
                          </p>

                          {/* Price */}
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <span style={{ fontSize: '20px', fontWeight: '700', color: '#1c1917' }}>
                              {product.price}
                            </span>
                            {product.originalPrice && (
                              <span style={{ fontSize: '14px', textDecoration: 'line-through', color: '#a8a29e' }}>
                                {product.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Top-Right Heart Button */}
                        <button
                          onClick={(e) => toggleWishlist(product.id, e)}
                          style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                            transition: 'all 0.2s',
                          }}
                          className="heart-btn"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={isWishlisted ? '#B04F3D' : 'none'}
                            stroke={isWishlisted ? '#e63946' : '#6b7280'}
                            strokeWidth="2"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Page Styles ── */}
      <style jsx>{`
        .hover-dark:hover {
          color: #1c1917 !important;
        }
        .hover-bg:hover {
          background-color: #f3f4f6 !important;
          color: #1c1917 !important;
        }
        .hover-bg-light:hover {
          background-color: #f3f4f6 !important;
        }
        .product-card-shop:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 36px rgba(27, 24, 21, 0.08) !important;
        }
        .product-card-shop:hover .card-img-shop {
          transform: scale(1.06);
        }
        .heart-btn:hover {
          transform: scale(1.15);
        }
        @keyframes slide-right {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @media (min-width: 769px) {
          .filter-close-btn {
            display: none !important;
          }
          .filter-backdrop-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .category-scroll-indicator {
            display: none !important;
          }
        }
        @media (max-width: 1024px) {
          .category-scroll-wrapper {
            max-width: 100% !important;
            width: 100% !important;
            order: 3;
          }
          .category-scroll-container {
            max-width: 100% !important;
            width: 100% !important;
            justify-content: flex-start;
          }
          .filters-options-bar {
            padding: 14px 20px !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 768px) {
          .shop-header-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .filters-options-bar {
            border-radius: 16px !important;
            padding: 16px !important;
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 14px !important;
          }
          .filter-toggle-btn {
            width: 100% !important;
            justify-content: center !important;
            order: 1;
          }
          .sort-toggle-container {
            width: 100% !important;
            justify-content: space-between !important;
            order: 2;
          }
          .category-scroll-wrapper {
            order: 3;
            width: 100% !important;
            max-width: 100% !important;
          }
          .category-scroll-container {
            width: 100% !important;
            max-width: 100% !important;
          }
          .filter-sidebar {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 1000 !important;
            box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important;
            width: calc(100% - 32px) !important;
            max-width: 340px !important;
            margin: 0 !important;
            display: ${isFilterPanelOpen ? 'block' : 'none'} !important;
          }
        }
        @media (max-width: 640px) {
          .product-card-shop.list-card {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
            padding: 16px !important;
          }
          .product-card-shop.list-card .card-img-shop-wrapper {
            width: 100% !important;
            height: 180px !important;
          }
        }
        @media (max-width: 480px) {
          .grid-4-cols {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .product-card-shop:not(.list-card) {
            padding: 16px !important;
            border-radius: 20px !important;
          }
          .product-card-shop:not(.list-card) :global(.card-img-shop) {
            border-radius: 16px !important;
          }
          .product-card-shop:not(.list-card) h3 {
            font-size: 16px !important;
            margin: 12px 0 6px !important;
          }
          .product-card-shop:not(.list-card) span {
            font-size: 14px !important;
          }
        }
        
        .scroll-arrow-svg {
          animation: pulse-arrow-svg 1.5s infinite ease-in-out;
        }
        @keyframes pulse-arrow-svg {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.4;
          }
          50% {
            transform: translateX(4px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

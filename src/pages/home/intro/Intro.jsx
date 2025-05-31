import { useState, useEffect, useRef } from 'react';
import './Intro.scss';
import intro1 from '../../../assets/images/home/intro/intro1.png'
import intro2 from '../../../assets/images/home/intro/intro2.png'
import intro3 from '../../../assets/images/home/intro/intro3.png'
import intro4 from '../../../assets/images/home/intro/intro4.png'

export const Intro = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const totalSlides = 4;
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoplayRef = useRef(null);

  const slides = [
    {
      id: 1,
      type: 'orange',
      image: intro1,
      alt: 'Trendy Bag',
      label: 'Accessories collection',
      title: 'New Trendy Bags'
    },
    {
      id: 2,
      type: 'blue',
      image: intro2,
      alt: 'Designer Handbag',
      label: 'Designer collection',
      title: 'Luxury Handbags'
    },
    {
      id: 3,
      type: 'orange',
      image: intro3,
      alt: 'Vintage Bag',
      label: 'Vintage collection',
      title: 'Classic Styles'
    },
    {
      id: 4,
      type: 'blue',
      image: intro4,
      alt: 'Modern Bag',
      label: 'Modern collection',
      title: 'Urban Essentials'
    }
  ];

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    if (autoplayEnabled) {
      autoplayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    resetAutoplay(); // Reset autoplay timer on manual navigation
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    resetAutoplay(); // Reset autoplay timer on manual navigation
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetAutoplay(); // Reset autoplay timer on manual navigation
  };

  // Touch/Swipe functionality
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      previousSlide();
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Mouse drag functionality for desktop
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseMove = (e) => {
    if (touchStartX.current === 0) return; // Only track if mouse is down
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!touchStartX.current || !touchEndX.current) {
      touchStartX.current = 0;
      touchEndX.current = 0;
      return;
    }

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      previousSlide();
    }

    // Reset positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Autoplay functionality
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplayEnabled]);

  // Pause/resume autoplay on hover
  const handleMouseEnter = () => {
    setAutoplayEnabled(false);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setAutoplayEnabled(true);
    resetAutoplay();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        previousSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div
      className="swiper-container"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="swiper-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`swiper-slide ${slide.type} ${index === currentSlide ? 'active' : ''
              } ${index === currentSlide - 1 || (currentSlide === 0 && index === totalSlides - 1) ? 'prev' : ''}`}
          >
            <div className="slide-content">
              <div className="slide-image">
                <img src={slide.image} alt={slide.alt} />
              </div>
              <div className="slide-text">
                <div className="collection-label">{slide.label}</div>
                <h1 className="main-title">{slide.title}</h1>
                <button className="shop-button">Shop Accessories</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="swiper-nav swiper-nav-prev" onClick={previousSlide}>
        <svg viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </div>
      <div className="swiper-nav swiper-nav-next" onClick={nextSlide}>
        <svg viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </div>

      {/* Pagination */}
      <div className="swiper-pagination">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`pagination-bullet ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Intro;
'use client';

import { useEffect, useState } from 'react';

export default function ScrollButtons() {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show buttons after scrolling down 200px
      setShowButtons(window.scrollY > 200);
    };

    // Listen for scrolling
    window.addEventListener('scroll', handleScroll);

    // Run once on mount to set the correct initial state
    handleScroll();

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to the very top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Scroll to the very bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Hide buttons until the user has scrolled down
  if (!showButtons) return null;

  return (
    <div className="scroll-buttons">
      <button
        type="button"
        className="scroll-btn"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to Top"
      >
        ↑
      </button>

      <button
        type="button"
        className="scroll-btn"
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        title="Scroll to Bottom"
      >
        ↓
      </button>
    </div>
  );
}
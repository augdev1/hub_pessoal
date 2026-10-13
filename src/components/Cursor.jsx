import React, { useEffect, useRef, useState } from 'react';

const Cursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Se for dispositivo móvel / touch, não ativa o cursor customizado nem adiciona listeners
    const isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window) || window.innerWidth < 768;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const handleMouseMove = (e) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const checkHoverState = (element) => {
      const hoverTags = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
      return hoverTags.includes(element.tagName) || element.closest('a, button, input, textarea, select');
    };

    const handleMouseOver = (e) => {
      if (checkHoverState(e.target)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (checkHoverState(e.target)) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current && !isTouchDevice) {
      cursorRef.current.style.transform = `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;
    }
  }, [isHovering, isTouchDevice]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          borderColor: isHovering ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)',
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
          transition: 'transform 0.15s ease-out, border-color 0.15s ease-out, background-color 0.15s ease-out',
        }}
      />
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default Cursor;

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface ImageSwiperProps {
  images: string[];
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

export const ImageSwiper: React.FC<ImageSwiperProps> = ({
  images,
  cardWidth = 220,
  cardHeight = 300,
  className = "",
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: images.length }, (_, i) => i)
  );

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return [];
    return [...cardStackRef.current.querySelectorAll(".image-card")] as HTMLElement[];
  }, []);

  const getActiveCard = useCallback((): HTMLElement | null => {
    const cards = getCards();
    return cards[0] || null;
  }, [getCards]);

  const updatePositions = useCallback(() => {
    const cards = getCards();
    cards.forEach((card, i) => {
      card.style.setProperty("--i", (i + 1).toString());
      card.style.setProperty("--swipe-x", "0px");
      card.style.setProperty("--swipe-rotate", "0deg");
      card.style.opacity = "1";
    });
  }, [getCards]);

  const applySwipeStyles = useCallback((deltaX: number) => {
    const card = getActiveCard();
    if (!card) return;
    card.style.setProperty("--swipe-x", `${deltaX}px`);
    card.style.setProperty("--swipe-rotate", `${deltaX * 0.15}deg`);
    card.style.opacity = (1 - Math.min(Math.abs(deltaX) / 120, 1) * 0.7).toString();
  }, [getActiveCard]);

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    const deltaX = currentX.current - startX.current;
    const threshold = 60;
    const card = getActiveCard();

    if (card) {
      card.style.transition = "transform 0.3s ease, opacity 0.3s ease";

      if (Math.abs(deltaX) > threshold) {
        const direction = Math.sign(deltaX);
        card.style.setProperty("--swipe-x", `${direction * 400}px`);
        card.style.setProperty("--swipe-rotate", `${direction * 25}deg`);
        card.style.opacity = "0";

        setTimeout(() => {
          setCardOrder((prev) => {
            if (prev.length === 0) return [];
            return [...prev.slice(1), prev[0]];
          });
        }, 300);
      } else {
        applySwipeStyles(0);
      }
    }

    isSwiping.current = false;
    startX.current = 0;
    currentX.current = 0;
  }, [getActiveCard, applySwipeStyles]);

  const handleMove = useCallback((clientX: number) => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    animationFrameId.current = requestAnimationFrame(() => {
      currentX.current = clientX;
      const deltaX = currentX.current - startX.current;
      applySwipeStyles(deltaX);
    });
  }, [applySwipeStyles]);

  const handleStart = useCallback((clientX: number) => {
    if (isSwiping.current) return;
    isSwiping.current = true;
    startX.current = clientX;
    currentX.current = clientX;
    const card = getActiveCard();
    if (card) card.style.transition = "none";
  }, [getActiveCard]);

  useEffect(() => {
    const el = cardStackRef.current;
    if (!el) return;
    const onDown = (e: PointerEvent) => handleStart(e.clientX);
    const onMove = (e: PointerEvent) => handleMove(e.clientX);
    const onUp = () => handleEnd();
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onUp);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updatePositions();
  }, [cardOrder, updatePositions]);

  return (
    <section
      ref={cardStackRef}
      className={`relative grid place-content-center select-none ${className}`}
      style={{
        width: cardWidth + 40,
        height: cardHeight + 40,
        touchAction: "none",
        transformStyle: "preserve-3d",
      }}
    >
      {cardOrder.map((originalIndex, displayIndex) => (
        <article
          key={`${originalIndex}-${displayIndex}`}
          className="image-card absolute place-self-center rounded-2xl shadow-2xl overflow-hidden will-change-transform cursor-grab active:cursor-grabbing"
          style={{
            "--i": (displayIndex + 1).toString(),
            zIndex: images.length - displayIndex,
            width: cardWidth,
            height: cardHeight,
            border: "1px solid rgba(99,102,241,0.2)",
            transform: `perspective(700px)
              translateZ(calc(-1 * 14px * var(--i)))
              translateY(calc(8px * var(--i)))
              translateX(var(--swipe-x, 0px))
              rotateY(var(--swipe-rotate, 0deg))`,
          } as React.CSSProperties}
        >
          <img
            src={images[originalIndex]}
            alt={`Image ${originalIndex + 1}`}
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />
        </article>
      ))}
    </section>
  );
};

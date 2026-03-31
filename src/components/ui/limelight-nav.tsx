"use client";
import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

const DefaultHomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>;
const DefaultCompassIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></svg>;
const DefaultBellIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>;

export type NavItem = {
  id: string | number;
  icon?: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

const defaultNavItems: NavItem[] = [
  { id: 'default-home', icon: <DefaultHomeIcon />, label: 'Home' },
  { id: 'default-explore', icon: <DefaultCompassIcon />, label: 'Explore' },
  { id: 'default-notifications', icon: <DefaultBellIcon />, label: 'Notifications' },
];

type LimelightNavProps = {
  items?: NavItem[];
  defaultActiveIndex?: number;
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items = defaultNavItems,
  defaultActiveIndex = 0,
  activeIndex: externalActiveIndex,
  onTabChange,
  className = "",
  limelightClassName = "",
  iconContainerClassName = "",
  iconClassName = "",
}: LimelightNavProps) => {
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);
  const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) {
    return null; 
  }

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setInternalActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-14 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-2 ${className}`}>
      {items.map(({ id, icon, label, onClick }, index) => (
          <a
            key={id}
            ref={el => { navItemRefs.current[index] = el; }}
            className={`relative z-20 flex h-full cursor-pointer items-center justify-center px-4 md:px-6 ${iconContainerClassName}`}
            onClick={() => handleItemClick(index, onClick)}
            aria-label={label}
          >
            {icon && cloneElement(icon, {
              className: `w-5 h-5 transition-opacity duration-200 ease-in-out ${
                activeIndex === index ? 'opacity-100 text-white' : 'opacity-50 text-zinc-100'
              } ${icon.props.className || ''} ${iconClassName || ''}`,
            })}
            
            {label && (
                <span className={`text-sm tracking-wide transition-all duration-300 ease-in-out ${
                    activeIndex === index ? 'opacity-100 font-medium text-white' : 'opacity-60 font-light text-zinc-300'
                } ${icon ? 'ml-2' : ''}`}>
                    {label}
                </span>
            )}
          </a>
      ))}

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-12 h-[3px] rounded-full bg-white shadow-[0_20px_20px_rgba(255,255,255,0.8)] ${
          isReady ? 'transition-[left] duration-300 ease-in-out' : ''
        } ${limelightClassName}`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-50%] top-[3px] w-[200%] h-12 [clip-path:polygon(10%_100%,30%_0,70%_0,90%_100%)] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};

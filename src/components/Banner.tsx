import React, { useEffect, useRef, ReactNode } from "react";

interface BannerProps {
  direction: "left" | "right";
  children: ReactNode;
}

export const Banner: React.FC<BannerProps> = ({ direction, children }) => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveText = (
      element: HTMLDivElement | null,
      dir: "left" | "right"
    ) => {
      let position = 0;
      const move = () => {
        position += dir === "left" ? -2 : 2;
        if (element) {
          element.style.transform = `translateX(${position}px)`;
          if (dir === "left" && position <= -element.clientWidth) {
            position = window.innerWidth;
          } else if (dir === "right" && position >= window.innerWidth) {
            position = -element.clientWidth;
          }
        }
        requestAnimationFrame(move);
      };
      move();
    };

    moveText(bannerRef.current, direction);
  }, [direction]);

  return (
    <div
      ref={bannerRef}
      className={`absolute ${
        direction === "left" ? "top" : "bottom"
      }-0 left-0 w-full h-10 bg-black bg-opacity-70 flex items-center overflow-hidden`}
    >
      <span className="text-white text-lg flex items-center">{children}</span>
    </div>
  );
};

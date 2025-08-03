import { useEffect, useState } from 'react';

export const Background = ({ children }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;

      setMousePos({ x, y });

      const bg = document.getElementById('bg');
      if (bg) {
        const moveX = x * -400;
        const moveY = y * -400;
        bg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.5)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <img
          id="bg"
          src="/Test_0094.png"
          alt="colorful background"
          className="w-full h-full object-cover transition-transform duration-75 ease-out"
          style={{ minWidth: '180%', minHeight: '180%' }}
        />
      </div>

      <div className="relative z-10 w-full h-full min-h-screen">{children}</div>
    </div>
  );
};

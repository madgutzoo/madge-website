import { useRef, useEffect } from 'react';
import { ThreeService } from './Three';
export const ThreeCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const service = new ThreeService();
    service.init(canvasRef.current);

    service.loadModel('/src/assets/snowflake.glb');

    return () => {
      service.dispose();
    };
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <canvas className="w-full h-full" ref={canvasRef}></canvas>
    </div>
  );
};

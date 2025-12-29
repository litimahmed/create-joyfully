import { useState, useEffect } from 'react';

interface PageLoaderProps {
  onLoadComplete?: () => void;
}

const PageLoader = ({ onLoadComplete }: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
          onLoadComplete?.();
        }, 400);
      }, 600);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Modern 3D Cube Loader */}
      <div className="perspective-[200px] w-16 h-16 mb-8">
        <div className="relative w-full h-full animate-[spin_2s_linear_infinite] transform-style-3d">
          {/* Cube faces */}
          <div className="absolute inset-0 bg-primary/20 border-2 border-primary animate-pulse" 
               style={{ transform: 'translateZ(32px)' }} />
          <div className="absolute inset-0 bg-primary/10 border-2 border-primary/60" 
               style={{ transform: 'rotateY(90deg) translateZ(32px)' }} />
          <div className="absolute inset-0 bg-primary/15 border-2 border-primary/80" 
               style={{ transform: 'rotateX(90deg) translateZ(32px)' }} />
        </div>
      </div>
      
      {/* Brand Name */}
      <h1 className="font-brand text-2xl md:text-3xl tracking-wide text-foreground">
        Sourire & Santé
      </h1>

      {/* Decorative line */}
      <div className="mt-6 w-24 h-0.5 bg-primary rounded-full animate-pulse" />
    </div>
  );
};

export default PageLoader;

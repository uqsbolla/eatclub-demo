"use client";

import { useState, useEffect, useRef } from "react";

interface RestaurantImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function RestaurantImage({
  src,
  alt,
  className = "",
}: RestaurantImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Reset states when src changes
    setHasError(false);
    setIsLoading(true);

    const handleError = () => {
      console.log(`Image failed to load: ${src}`);
      setHasError(true);
      setIsLoading(false);
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    // Add native event listeners
    img.addEventListener("error", handleError);
    img.addEventListener("load", handleLoad);

    // Check if image is already loaded (cached)
    if (img.complete) {
      if (img.naturalHeight === 0) {
        handleError();
      } else {
        handleLoad();
      }
    }

    return () => {
      img.removeEventListener("error", handleError);
      img.removeEventListener("load", handleLoad);
    };
  }, [src]);

  if (hasError) {
    return (
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-700 text-sm font-medium">
        Restaurant Image Unavailable
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 w-full h-48 bg-gray-200 animate-pulse" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </>
  );
}

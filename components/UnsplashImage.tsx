'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { UnsplashImage, searchUnsplashImages, getOptimizedImageUrl } from "@/lib/unsplash";

interface UnsplashImageComponentProps {
  query: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  orientation?: 'landscape' | 'portrait' | 'squarish';
  fallbackSrc?: string;
}

export function UnsplashImageComponent({
  query,
  alt,
  width,
  height,
  className,
  fill,
  priority,
  orientation = 'landscape',
  fallbackSrc
}: UnsplashImageComponentProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchImage() {
      try {
        const images = await searchUnsplashImages(query, 1, orientation);
        
        if (isMounted && images.length > 0) {
          const imageUrl = getOptimizedImageUrl(images[0], width, height);
          setImageSrc(imageUrl);
        } else if (isMounted) {
          setError(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [query, width, height, orientation]);

  if (isLoading) {
    return (
      <div className={`bg-gray-800 animate-pulse ${className}`} style={fill ? {} : { width, height }}>
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Loading...
        </div>
      </div>
    );
  }

  if (error || !imageSrc) {
    return fallbackSrc ? (
      <Image
        src={fallbackSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        fill={fill}
        priority={priority}
      />
    ) : (
      <div className={`bg-gray-700 ${className}`} style={fill ? {} : { width, height }}>
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          Image unavailable
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={className}
      fill={fill}
      priority={priority}
    />
  );
} 
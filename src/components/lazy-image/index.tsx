import { useRef, useState, useEffect } from "react";
import { Image, Skeleton } from "@mantine/core";

interface LazyImageProps {
  src: string;
  alt: string;
  height: number;
  width?: number;
  radius?: string;
  fit?: "cover" | "contain" | "fill";
  priority?: boolean;
}

const LazyImage = ({
  src,
  alt,
  height,
  width,
  radius,
  fit = "cover",
  priority = false,
}: LazyImageProps) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={imgRef} style={{ width: width || "100%", height }}>
      {!isVisible ? (
        <Skeleton height={height} width={width} radius={radius} />
      ) : (
        <>
          {!isLoaded && <Skeleton height={height} width={width} radius={radius} />}
          <Image
            src={src}
            alt={alt}
            height={height}
            width={width}
            radius={radius}
            fit={fit}
            onLoad={() => setIsLoaded(true)}
            style={{ display: isLoaded ? "block" : "none" }}
            {...(priority && { fetchPriority: "high" })}
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;

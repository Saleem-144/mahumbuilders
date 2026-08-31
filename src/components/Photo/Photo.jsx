import { useState } from "react";
import { cn } from "../../lib/cn";

/**
 * Renders a stock/placeholder image and degrades to a clean labeled panel
 * (never a broken-image icon) if the third-party source fails to load —
 * important while the site is running on placeholder photography.
 */
export default function Photo({ src, alt = "", fallback, className, imgClassName, zoom = true, loading = "lazy", sizes }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("fig", zoom && "fig-zoom", className)}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          sizes={sizes}
          decoding="async"
          className={imgClassName}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="fig-fallback" role="img" aria-label={alt || fallback}>
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M3 21 L9 12 L14 17 L17 13 L21 21 Z" />
              <circle cx="8" cy="7" r="2" />
              <rect x="2.5" y="3.5" width="19" height="17" rx="1" />
            </svg>
            <span className="eyebrow text-[color:var(--color-mist)]">{fallback || "Image"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

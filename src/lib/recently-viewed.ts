"use client";

import { useEffect, useState } from "react";

const KEY = "memberridge-recently-viewed";
const MAX = 8;

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/**
 * Records `currentSlug` as viewed (if given) and returns the other recently
 * viewed product slugs, most recent first. Empty during SSR and first paint.
 */
export function useRecentlyViewed(currentSlug?: string) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    const previous = read().filter((s) => s !== currentSlug);
    if (currentSlug) {
      try {
        window.localStorage.setItem(
          KEY,
          JSON.stringify([currentSlug, ...previous].slice(0, MAX))
        );
      } catch {
        // storage full or blocked — recently viewed is a nicety, not a feature
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of client-only storage
    setSlugs(previous);
  }, [currentSlug]);

  return slugs;
}

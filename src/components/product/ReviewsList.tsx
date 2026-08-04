import { Star, BadgeCheck } from "lucide-react";
import type { Review } from "@/lib/types";

export function ReviewsList({
  reviews,
  rating,
  reviewCount,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mb-12">
        <div>
          <p className="font-display text-5xl">{rating.toFixed(1)}</p>
          <div className="flex gap-1 text-copper mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={16}
                fill={i <= Math.round(rating) ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <p className="text-sm text-coffee mt-2">{reviewCount} reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {reviews.map((review, i) => (
          <div key={i}>
            <div className="flex gap-1 text-copper mb-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={13}
                  fill={s <= review.rating ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <p className="font-display text-lg mb-2">{review.title}</p>
            <p className="text-sm text-coffee leading-relaxed mb-4">{review.body}</p>
            <div className="flex items-center gap-2 text-xs text-espresso/60">
              <span className="font-medium text-espresso">{review.author}</span>
              <span>· {review.location}</span>
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-olive">
                  <BadgeCheck size={13} /> Verified
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

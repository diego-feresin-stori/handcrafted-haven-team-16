"use client";

import { useState } from "react";
import ReviewForm from "@/app/seller/[id]/components/ReviewForm";
import ReviewList from "@/app/seller/[id]/components/ReviewList";

export default function ReviewSection({ productId }: { productId: string }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div>
      <ReviewForm
        productId={productId}
        onReviewAdded={() => setRefreshTrigger((t) => t + 1)}
      />
      <ReviewList productId={productId} refreshTrigger={refreshTrigger} />
    </div>
  );
}
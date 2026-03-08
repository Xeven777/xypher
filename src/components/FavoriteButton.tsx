"use client";

import { useState } from "react";
import { toggleFavorite } from "@/actions/prisma";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

export default function FavoriteButton({
  id,
  isFavorite: initialIsFavorite,
}: {
  id: string;
  isFavorite: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const onToggle = async () => {
    setLoading(true);
    const res = await toggleFavorite(id, isFavorite);
    if (res) {
      setIsFavorite(!isFavorite);
      toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
    } else {
      toast.error("Failed to update favorite");
    }
    setLoading(false);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      disabled={loading}
    >
      <Star
        size={28}
        className={
          isFavorite
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        }
      />
    </Button>
  );
}

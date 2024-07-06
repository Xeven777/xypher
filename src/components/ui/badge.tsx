import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        Login: "border-transparent bg-blue-500 text-white hover:bg-blue-400",
        Education:
          "border-transparent bg-green-500 text-white hover:bg-green-400",
        Software:
          "border-transparent bg-indigo-500 text-white hover:bg-indigo-400",
        Finance:
          "border-transparent bg-yellow-500 text-white hover:bg-yellow-400",
        Shopping: "border-transparent bg-pink-500 text-white hover:bg-pink-400",
        Email: "border-transparent bg-teal-500 text-white hover:bg-teal-400",
        Entertainment:
          "border-transparent bg-purple-500 text-white hover:bg-purple-400",
        Social:
          "border-transparent bg-orange-500 text-white hover:bg-orange-400",
        Other: "border-transparent bg-gray-500 text-white hover:bg-gray-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

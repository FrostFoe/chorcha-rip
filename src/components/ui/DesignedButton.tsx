import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const designedButtonVariants = cva("btn-3d transition-colors duration-200", {
  variants: {
    variant: {
      primary: "btn-3d-primary text-black hover:text-black",
      outline: "btn-3d-outline text-foreground",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface DesignedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof designedButtonVariants> {
  asChild?: boolean;
}

const DesignedButton = React.forwardRef<HTMLButtonElement, DesignedButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(designedButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
DesignedButton.displayName = "DesignedButton";

export { DesignedButton, designedButtonVariants };

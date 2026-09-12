"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          className={cn(
            "flex h-9 w-full appearance-none bg-[#09090B] border border-[#27272A] px-3 py-1 pr-8 font-mono text-xs text-zinc-200 shadow-sm transition-colors focus-visible:outline-none focus-visible:border-amber-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-zinc-500 pointer-events-none" />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }

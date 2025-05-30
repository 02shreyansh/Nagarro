// src/components/ui/typography.tsx
import { cn } from "../../lib/utils"
import { type ReactNode } from "react"

type Variant = "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "lead" | "small"

interface TypographyProps {
  variant?: Variant
  className?: string
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  lead: "text-xl text-muted-foreground",
  small: "text-sm font-medium leading-none",
}

export function Typography({ variant = "p", className, children }: TypographyProps) {
  const Component = variant === "lead" || variant === "small" ? "p" : variant
  return (
    <Component className={cn(variantClasses[variant], className)}>
      {children}
    </Component>
  )
}
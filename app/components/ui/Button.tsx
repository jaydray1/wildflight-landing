import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles = "font-bold uppercase tracking-wide transition-all text-center inline-block border-2";

  const variants = {
    primary: "bg-[#FF6B35] text-white border-[#FF6B35] hover:bg-[#E55A2B] hover:border-[#E55A2B]",
    secondary: "bg-[#004E89] text-white border-[#004E89] hover:bg-[#003A6B] hover:border-[#003A6B]",
    outline: "bg-transparent text-[#222222] border-[#222222] hover:bg-[#222222] hover:text-white",
    ghost: "bg-transparent text-[#666666] border-transparent hover:text-[#222222]",
  };

  const sizes = {
    sm: "px-6 py-3 text-base",
    md: "px-8 py-4 text-lg",
    lg: "px-10 py-5 text-xl",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

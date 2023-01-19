import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  label: string;
  variant: "primary" | "secondary";
  onClick: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ label, className, variant, onClick }) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={twMerge(
        `leading-none px-4 py-1 rounded-sm border-2 cursor-pointer text-white 
          transition-all duration-150 shadow-sm font-semibold`,
        variant === "primary"
          ? "bg-blue-700 border-blue-800 hover:bg-blue-600 hover:border-blue-700"
          : "",
        variant === "secondary"
          ? "bg-gray-600 border-gray-500 hover:border-gray-400"
          : "",
        className
      )}
    >
      {label}
    </button>
  );
};

export default Button;

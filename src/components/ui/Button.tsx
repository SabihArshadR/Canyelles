"use client";
import React from "react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`bg-darkblue rounded-[8px] text-[20px] text-white font-semibold py-2 max-w-[499px] w-full hover:cursor-pointer px-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;

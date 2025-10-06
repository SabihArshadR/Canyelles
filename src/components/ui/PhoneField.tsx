"use client";
import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const CustomPhoneInput: React.FC<CustomInputProps> = ({
  className = "",
  ...props
}) => {
  return (
    <div className="flex border-2 border-darkblue rounded-[8px] overflow-hidden w-full bg-white">
      <div className="bg-darkblue flex items-center justify-center px-3">
        <span className="text-white text-xs">▼</span>
      </div>

      <input
        type="text"
        className={`flex-1 px-3 py-2 text-base outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default CustomPhoneInput;

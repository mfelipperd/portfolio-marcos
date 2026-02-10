"use client";

interface ThreeDTextProps {
  text: string;
  className?: string;
}

export default function ThreeDText({ text, className = "" }: ThreeDTextProps) {
  return (
    <h1 className={`text-3d ${className}`}>
      {text}
    </h1>
  );
}

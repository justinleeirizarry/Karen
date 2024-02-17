import React from "react";
import { Button } from "./ui/button";

interface ConfirmButtonProps {
  isConfirmed: boolean;
  onClick: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  isConfirmed,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full font-medium text-neutral-200 transition-all duration-300 ${
        isConfirmed ? "bg-transparent" : "hover:w-32 bg-sky-500"
      } ${isConfirmed ? "pointer-events-none" : ""}`}
    >
      <div
        className={`inline-flex whitespace-nowrap opacity-0 transition-all duration-200 ${
          !isConfirmed
            ? "group-hover:-translate-x-3 group-hover:opacity-100"
            : ""
        }`}
      >
        {isConfirmed ? "Confirmed" : "Confirm"}
      </div>
      <div className="absolute right-3.5">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
        >
          <path
            d="M5.5 11L2 7.5L3.12132 6.37868L5.5 8.75736L11.8787 2.37868L13 3.5L5.5 11Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </Button>
  );
};

export default ConfirmButton;

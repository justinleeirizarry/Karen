import React from "react";

const Checkmark: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes stroke {
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes scale {
            50% {
              transform: scale(1.1);
            }
          }

          @keyframes fill {
            to {
              box-shadow: inset 0px 0px 0px 30px #7ac142;
            }
          }

          .checkmark-circle {
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
          }

          .checkmark-check {
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.6s forwards;
          }

          .checkmark-svg {
            animation: fill 0.4s ease-in-out 0.6s forwards, scale 0.3s ease-in-out 0.9s both;
          }
        `}
      </style>
      <div className="flex items-center justify-center h-0 mt-4 ">
        <div className="inline-block w-14 h-14 rounded-full shadow-lg overflow-hidden">
          <svg
            className="checkmark-svg w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke="#7ac142"
              strokeWidth="2"
              className="checkmark-circle"
              strokeDasharray="166"
              strokeDashoffset="166"
            />
            <path
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
              className="checkmark-check"
              strokeDasharray="48"
              strokeDashoffset="48"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Checkmark;

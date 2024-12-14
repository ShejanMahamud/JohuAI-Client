"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const PrimaryButton = ({
  buttonStyles,
  text,
  textStyles,
  link,
  linkPath = "/",
  icon,
}: {
  buttonStyles?: string;
  text: string;
  textStyles?: string;
  link?: boolean;
  linkPath?: string;
  icon?: ReactNode;
}) => {
  const router = useRouter();
  return (
    <>
      {link && (
        <button
          onClick={() => router.push(linkPath)}
          className={`${buttonStyles} rounded-full bg-white hover:bg-transparent text-black ${
            icon && "flex items-center gap-2"
          } hover:text-white hover:border hover:border-white py-2 border font-medium
             transition-all duration-300 ease-in-out`}
        >
          {icon}
          <span className={`${textStyles}`}>{text}</span>
        </button>
      )}
      {!link && (
        <button
          className={`${buttonStyles} ${textStyles} rounded-full bg-white text-black hover:text-white hover:border hover:border-white hover:bg-transparent py-2 border font-medium transition-all duration-300 ease-in-out `}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default PrimaryButton;

import { ReactNode } from "react";

const SecondaryButton = ({
  buttonStyles,
  text,
  icon,
}: {
  buttonStyles?: string;
  text: string;
  icon?: ReactNode;
}) => {
  return (
    <button
      className={`${buttonStyles} rounded-full bg-transparent text-white hover:text-black hover:bg-white border-white py-2 border font-medium transition-all duration-300 ease-in-out flex items-center gap-3 group`}
    >
      {text} {icon}
    </button>
  );
};

export default SecondaryButton;

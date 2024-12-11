import Link from "next/link";

const PrimaryButton = ({
  buttonStyles,
  text,
  textStyles,
  link,
  linkPath = "/",
}: {
  buttonStyles?: string;
  text: string;
  textStyles?: string;
  link?: boolean;
  linkPath?: string;
}) => {
  return (
    <>
      {link && (
        <button
          className={`rounded-full bg-white hover:bg-transparent text-black hover:text-white hover:border hover:border-white py-2 border font-medium transition-all duration-300 ease-in-out ${buttonStyles}`}
        >
          <Link href={linkPath} className={`${textStyles}`}>
            {text}
          </Link>
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

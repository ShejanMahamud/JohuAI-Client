const HeadingText = ({
  headingStyles,
  paragraphStyles,
  heading,
  paragraph,
  boxStyles,
}: {
  headingStyles?: string;
  paragraphStyles?: string;
  paragraph: string;
  heading: string;
  boxStyles?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${boxStyles}`}
    >
      <h1
        className={` ${headingStyles} text-white lg:text-4xl text-2xl text-center leading-[52px] font-bold mb-2`}
      >
        {heading}
      </h1>
      <p
        className={`${paragraphStyles} text-[#ffffff99] text-sm text-center font-manrope lg:px-80 mt-3 px-10 `}
      >
        {paragraph}
      </p>
    </div>
  );
};

export default HeadingText;

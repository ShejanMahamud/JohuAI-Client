const PrimaryButton = ({
  buttonStyles,
  text,
}: {
  buttonStyles?: string;
  text: string;
}) => {
  return (
    <button
      className={`${buttonStyles} rounded-full bg-white text-black hover:text-white hover:bg-transparent hover:border hover:border-white py-2 border font-medium transition-all duration-300 ease-in-out`}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;

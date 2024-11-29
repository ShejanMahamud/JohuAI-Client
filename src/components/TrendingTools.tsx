import Image from "next/image";
import { FaWandMagicSparkles } from "react-icons/fa6";
import HeadingText from "./HeadingText";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
const TrendingTools = () => {
  return (
    <div className="w-full my-28">
      <HeadingText
        heading="See Trending Tools"
        paragraph="Discover endless creativity with PromptVerse. Generate diverse content effortlessly using prompts. Stay updated with real-time trends, automate tasks, and extract insights from any document or URL. All within a sleek, futuristic design. Create more, effortlessly."
      />
      <div className="flex items-center justify-center gap-5 mt-5">
        <SecondaryButton
          text="Start generating"
          buttonStyles="px-6 text-sm"
          icon={
            <FaWandMagicSparkles className="text-white group-hover:text-black" />
          }
        />
        <PrimaryButton text="Get Started" buttonStyles="px-6 py-2" />
      </div>
      <Image
        src={"/trendingtool-demo.png"}
        alt=""
        width={500}
        height={500}
        className="w-full mt-10 px-28"
      />
    </div>
  );
};

export default TrendingTools;

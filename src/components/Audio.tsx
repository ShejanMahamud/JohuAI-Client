import React from "react";
import HeadingText from "./HeadingText";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import HeroVideoDialog from "./ui/hero-video-dialog";

const Audio: React.FC = () => {
  return (
    <div className="w-full">
      <HeadingText
        headingStyles="font-manrope"
        heading="Generate audio and music"
        paragraph="Discover endless creativity with PromptVerse. Generate diverse content effortlessly using prompts. Stay updated with real-time trends, automate tasks, and extract insights from any document or URL. All within a sleek, futuristic design. Create more, effortlessly."
        boxStyles="my-20"
      />
      <div className="w-full lg:px-20 px-10 grid lg:grid-cols-2 grid-cols-1 row-auto items-center justify-center gap-10">
        <div className="w-full flex flex-col items-start gap-y-5 text-white">
          <h1 className="font-manrope text-3xl">
            Enhance Your Projects with Ultra-Realistic AI Voices
          </h1>
          <ul className="text-sm *:mb-5 *:text-[#ffffff99]">
            <li>
              Create engaging voice content with unique AI Voices perfect for
              your audience.
            </li>
            <li>
              Generate Conversational, Long-form or Short-form Voice Content
              With Consistent Quality and Performances.
            </li>
            <li>
              Secure and Private Voice Generations with Full Commercial and
              Copyrights
            </li>
          </ul>
          <div className="w-full flex items-center flex-wrap gap-x-5 gap-y-4">
            <SecondaryButton
              text="Train voice model"
              buttonStyles="px-6 lg:text-sm text-xs"
            />
            <SecondaryButton
              text="Text-to-speech"
              buttonStyles="px-6 lg:text-sm text-xs"
            />
            <SecondaryButton
              text="AI voice generation"
              buttonStyles="px-6 lg:text-sm text-xs"
            />
            <SecondaryButton
              text="AI music production"
              buttonStyles="px-6 lg:text-sm text-xs"
            />
            <SecondaryButton
              text="AI Composition"
              buttonStyles="px-6 lg:text-sm text-xs"
            />
            <PrimaryButton
              text="Generate now"
              buttonStyles="px-6 lg:text-sm text-xs"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <HeroVideoDialog
            className="hidden dark:block w-full h-full object-cover rounded-xl"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>
    </div>
  );
};

export default Audio;

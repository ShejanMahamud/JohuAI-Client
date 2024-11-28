import React from "react";
import { HeroHeaderText } from "./HeroHeaderText";
import BlurIn from "./ui/blur-in";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
const Hero: React.FC = () => {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  return (
    <div
      className={`w-full h-auto font-poppins relative`}
      style={{
        backgroundImage: "url('/hero-light.png')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <svg
        className="absolute top-5 left-5"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <g clipPath="url(#clip0_1_7271)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.05557 0.829712C8.69623 -0.156779 7.30181 -0.156779 6.94246 0.829712L5.31187 5.31242L0.829162 6.94301C-0.157328 7.30235 -0.157328 8.69677 0.829162 9.05612L5.31187 10.6867L6.94246 15.1694C7.30181 16.1559 8.69623 16.1559 9.05557 15.1694L10.6862 10.6867L15.1689 9.05612C16.1554 8.69677 16.1554 7.30235 15.1689 6.94301L10.6862 5.31242L9.05557 0.829712Z"
            fill="#CCCCCC"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_7271">
            <rect
              width="15.82"
              height="15.82"
              fill="white"
              transform="translate(0.0890503 0.0893555)"
            />
          </clipPath>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        className="absolute top-10 right-40"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
      >
        <g clipPath="url(#clip0_1_7275)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.77594 0.655238C8.45794 -0.217762 7.22394 -0.217762 6.90594 0.655238L5.46294 4.62224L1.49594 6.06524C0.622936 6.38324 0.622936 7.61724 1.49594 7.93524L5.46294 9.37824L6.90594 13.3452C7.22394 14.2182 8.45794 14.2182 8.77594 13.3452L10.2189 9.37824L14.1859 7.93524C15.0589 7.61724 15.0589 6.38324 14.1859 6.06524L10.2189 4.62224L8.77594 0.655238Z"
            fill="#CCCCCC"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_7275">
            <rect
              width="14"
              height="14"
              fill="white"
              transform="translate(0.840942)"
            />
          </clipPath>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="top-20 absolute left-96"
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
      >
        <g clipPath="url(#clip0_1_7269)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.8072 1.30999C16.1712 -0.436012 13.7032 -0.436012 13.0672 1.30999L10.1812 9.24399L2.24724 12.13C0.501244 12.766 0.501244 15.234 2.24724 15.87L10.1812 18.756L13.0672 26.69C13.7032 28.436 16.1712 28.436 16.8072 26.69L19.6932 18.756L27.6272 15.87C29.3732 15.234 29.3732 12.766 27.6272 12.13L19.6932 9.24399L16.8072 1.30999Z"
            fill="#CCCCCC"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_7269">
            <rect
              width="28"
              height="28"
              fill="white"
              transform="translate(0.9375)"
            />
          </clipPath>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-64 left-52"
        width="14"
        height="15"
        viewBox="0 0 14 15"
        fill="none"
      >
        <g clipPath="url(#clip0_1_7263)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.93499 1.15499C7.61699 0.281994 6.38299 0.281994 6.06499 1.15499L4.62199 5.12199L0.654994 6.56499C-0.218006 6.88299 -0.218006 8.11699 0.654994 8.43499L4.62199 9.87799L6.06499 13.845C6.38299 14.718 7.61699 14.718 7.93499 13.845L9.37799 9.87799L13.345 8.43499C14.218 8.11699 14.218 6.88299 13.345 6.56499L9.37799 5.12199L7.93499 1.15499Z"
            fill="#CCCCCC"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_7263">
            <rect
              width="14"
              height="14"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
      <svg
        className="absolute left-5 bottom-28"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <g clipPath="url(#clip0_1_7265)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.4024 1.48237C11.9254 0.172869 10.0744 0.172869 9.59737 1.48237L7.43287 7.43287L1.48237 9.59737C0.172869 10.0744 0.172869 11.9254 1.48237 12.4024L7.43287 14.5669L9.59737 20.5174C10.0744 21.8269 11.9254 21.8269 12.4024 20.5174L14.5669 14.5669L20.5174 12.4024C21.8269 11.9254 21.8269 10.0744 20.5174 9.59737L14.5669 7.43287L12.4024 1.48237Z"
            fill="#CCCCCC"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_7265">
            <rect
              width="21"
              height="21"
              fill="white"
              transform="translate(0.5 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
      <svg
        className="absolute right-10 top-52"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <g clipPath="url(#clip0_1_7273)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.8697 1.30974C15.2337 -0.436256 12.7657 -0.436256 12.1297 1.30974L9.24374 9.24374L1.30974 12.1297C-0.436256 12.7657 -0.436256 15.2337 1.30974 15.8697L9.24374 18.7557L12.1297 26.6897C12.7657 28.4357 15.2337 28.4357 15.8697 26.6897L18.7557 18.7557L26.6897 15.8697C28.4357 15.2337 28.4357 12.7657 26.6897 12.1297L18.7557 9.24374L15.8697 1.30974Z"
            fill="#CCCCCC"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_7273">
            <rect width="28" height="28" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-20 bottom-20"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <g clipPath="url(#clip0_1_7277)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.93499 0.654994C7.61699 -0.218006 6.38299 -0.218006 6.06499 0.654994L4.62199 4.62199L0.654994 6.06499C-0.218006 6.38299 -0.218006 7.61699 0.654994 7.93499L4.62199 9.37799L6.06499 13.345C6.38299 14.218 7.61699 14.218 7.93499 13.345L9.37799 9.37799L13.345 7.93499C14.218 7.61699 14.218 6.38299 13.345 6.06499L9.37799 4.62199L7.93499 0.654994Z"
            fill="#CCCCCC"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_7277">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 transform -translate-x-1/2 right-0 bottom-0"
        width="56"
        height="24"
        viewBox="0 0 56 24"
        fill="none"
      >
        <g clipPath="url(#clip0_1_7267)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.7392 2.61924C30.4672 -0.872756 25.5312 -0.872756 24.2592 2.61924L18.4872 18.4872L2.61924 24.2592C-0.872756 25.5312 -0.872756 30.4672 2.61924 31.7392L18.4872 37.5112L24.2592 53.3792C25.5312 56.8712 30.4672 56.8712 31.7392 53.3792L37.5112 37.5112L53.3792 31.7392C56.8712 30.4672 56.8712 25.5312 53.3792 24.2592L37.5112 18.4872L31.7392 2.61924Z"
            fill="#CCCCCC"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_7267">
            <rect width="56" height="56" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div className="w-full flex flex-col items-center justify-center py-40 gap-y-10">
        <div className=" flex flex-col items-center justify-center w-full">
          <HeroHeaderText />
          <BlurIn
            word={
              <h1 className="text-white lg:text-5xl text-3xl text-center lg:leading-[60px] mb-7">
                Find Inspiration.
                <br /> Create, Generate,
                <br /> Produce & Automate.
              </h1>
            }
          />
          <p className="text-[#ffffff99] lg:text-base text-sm text-center font-manrope lg:w-[60%] w-[80%] tracking-[-0.288px] leading-6">
            Welcome to PromptVerse. Effortlessly create content, explore endless
            prompts, and stay ahead with real-time trends. Automate emails,
            social media, and more while our AI extracts knowledge from any
            document or URL. Experience a stunning, futuristic design that
            boosts productivity.
          </p>
        </div>
        <div className="flex items-center justify-center gap-5 w-full">
          <PlaceholdersAndVanishInput placeholders={placeholders} />
          {/* <Button className="text-white border border-white rounded-full p-6">
            <span>Start Generating</span>
            <FaWandMagicSparkles className="text-white" />
          </Button> */}
          {/* <Button className="text-black bg-white rounded-full p-6">
            <span>Get Started</span>
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;

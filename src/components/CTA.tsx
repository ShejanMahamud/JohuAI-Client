import PrimaryButton from "@/components/PrimaryButton";
import React from "react";
const CTA: React.FC = () => {
  return (
    <div
      className="w-[80%] mx-auto my-28 py-28 rounded-2xl border border-[#ffffff1a] bg-[#0E0E0E] flex items-center justify-center flex-col relative"
      style={{
        backgroundImage: `url('/cta-bg-light.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="194"
        height="218"
        viewBox="0 0 194 218"
        fill="none"
        className="absolute top-0 left-0"
      >
        <path
          d="M-50.7517 82.539L29.4192 53.3563L58.5827 -26.7954C59.2513 -28.6316 60.4686 -30.2176 62.0694 -31.3383C63.6701 -32.4589 65.5769 -33.0601 67.531 -33.0601C69.4851 -33.0601 71.3918 -32.4589 72.9926 -31.3383C74.5934 -30.2176 75.8107 -28.6316 76.4793 -26.7954L105.662 53.3755L185.833 82.539C187.669 83.2076 189.255 84.4249 190.376 86.0256C191.496 87.6264 192.097 89.5332 192.097 91.4873C192.097 93.4414 191.496 95.3481 190.376 96.9489C189.255 98.5497 187.669 99.767 185.833 100.436L105.643 129.618L76.4793 209.789C75.8107 211.625 74.5934 213.211 72.9926 214.332C71.3918 215.453 69.4851 216.054 67.531 216.054C65.5769 216.054 63.6701 215.453 62.0694 214.332C60.4686 213.211 59.2513 211.625 58.5827 209.789L29.4 129.599L-50.7517 100.436C-52.5879 99.767 -54.1739 98.5497 -55.2945 96.9489C-56.4152 95.3481 -57.0164 93.4414 -57.0164 91.4873C-57.0164 89.5332 -56.4152 87.6264 -55.2945 86.0256C-54.1739 84.4249 -52.5879 83.2076 -50.7517 82.539Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2.47243"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-5 left-40"
        width="47"
        height="47"
        viewBox="0 0 47 47"
        fill="none"
      >
        <path
          d="M2.40213 22.2376L16.5434 17.0901L21.6875 2.95218C21.8055 2.62831 22.0202 2.34855 22.3025 2.15088C22.5849 1.9532 22.9212 1.84717 23.2659 1.84717C23.6106 1.84717 23.9469 1.9532 24.2293 2.15088C24.5116 2.34855 24.7264 2.62831 24.8443 2.95218L29.9918 17.0934L44.1331 22.2376C44.4569 22.3555 44.7367 22.5702 44.9344 22.8526C45.132 23.1349 45.2381 23.4713 45.2381 23.816C45.2381 24.1606 45.132 24.497 44.9344 24.7793C44.7367 25.0617 44.4569 25.2764 44.1331 25.3943L29.9884 30.5418L24.8443 44.6831C24.7264 45.007 24.5116 45.2867 24.2293 45.4844C23.9469 45.6821 23.6106 45.7881 23.2659 45.7881C22.9212 45.7881 22.5849 45.6821 22.3025 45.4844C22.0202 45.2867 21.8055 45.007 21.6875 44.6831L16.54 30.5385L2.40213 25.3943C2.07826 25.2764 1.7985 25.0617 1.60083 24.7793C1.40315 24.497 1.29712 24.1606 1.29712 23.816C1.29712 23.4713 1.40315 23.1349 1.60083 22.8526C1.7985 22.5702 2.07826 22.3555 2.40213 22.2376Z"
          stroke="white"
          strokeOpacity="0.21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-5 right-10"
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M2.67692 29.6115L22.4234 22.4237L29.6065 2.68192C29.7712 2.22968 30.0711 1.83904 30.4653 1.56301C30.8596 1.28698 31.3293 1.13892 31.8106 1.13892C32.2919 1.13892 32.7615 1.28698 33.1558 1.56301C33.5501 1.83904 33.8499 2.22968 34.0146 2.68192L41.2024 22.4284L60.9489 29.6115C61.4012 29.7762 61.7918 30.0761 62.0678 30.4703C62.3439 30.8646 62.4919 31.3343 62.4919 31.8156C62.4919 32.2969 62.3439 32.7665 62.0678 33.1608C61.7918 33.5551 61.4012 33.8549 60.9489 34.0196L41.1977 41.2074L34.0146 60.9539C33.8499 61.4062 33.5501 61.7968 33.1558 62.0728C32.7615 62.3489 32.2919 62.4969 31.8106 62.4969C31.3293 62.4969 30.8596 62.3489 30.4653 62.0728C30.0711 61.7968 29.7712 61.4062 29.6065 60.9539L22.4187 41.2027L2.67692 34.0196C2.22467 33.8549 1.83403 33.5551 1.558 33.1608C1.28197 32.7665 1.13391 32.2969 1.13391 31.8156C1.13391 31.3343 1.28197 30.8646 1.558 30.4703C1.83403 30.0761 2.22467 29.7762 2.67692 29.6115Z"
          stroke="white"
          strokeOpacity="0.21"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        className="absolute bottom-10 right-40"
      >
        <path
          d="M2.77015 24.2045L18.4858 18.4839L24.2026 2.77198C24.3337 2.41205 24.5723 2.10115 24.8861 1.88147C25.1999 1.66178 25.5737 1.54395 25.9567 1.54395C26.3398 1.54395 26.7136 1.66178 27.0274 1.88147C27.3412 2.10115 27.5798 2.41205 27.7109 2.77198L33.4314 18.4876L49.1471 24.2045C49.507 24.3355 49.8179 24.5741 50.0376 24.8879C50.2573 25.2017 50.3751 25.5755 50.3751 25.9586C50.3751 26.3416 50.2573 26.7154 50.0376 27.0292C49.8179 27.343 49.507 27.5816 49.1471 27.7127L33.4277 33.4333L27.7109 49.1489C27.5798 49.5088 27.3412 49.8197 27.0274 50.0394C26.7136 50.2591 26.3398 50.377 25.9567 50.377C25.5737 50.377 25.1999 50.2591 24.8861 50.0394C24.5723 49.8197 24.3337 49.5088 24.2026 49.1489L18.482 33.4295L2.77015 27.7127C2.41022 27.5816 2.09932 27.343 1.87963 27.0292C1.65995 26.7154 1.54211 26.3416 1.54211 25.9586C1.54211 25.5755 1.65995 25.2017 1.87963 24.8879C2.09932 24.5741 2.41022 24.3355 2.77015 24.2045Z"
          stroke="white"
          strokeOpacity="0.21"
          strokeWidth="1.59174"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h1 className="text-white font-manrope lg:text-4xl text-2xl text-center mb-5 lg:leading-[52px] leading-[40px] tracking-[-0.48px]">
        Johu AI has no limitation.
        <br />
        Get Started in a journey with promptverse.
      </h1>
      <PrimaryButton text="Get Started" buttonStyles="px-6 text-sm" />
    </div>
  );
};

export default CTA;

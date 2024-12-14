"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="flex items-center mb-5 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image
        width={48}
        height={48}
        src={"/logo.png"}
        alt="johuai-logo.png"
        className=""
      />
      <h1 className="dark:text-white font-bold font-manrope text-2xl">
        Johu AI
      </h1>
    </div>
  );
};

export default Logo;

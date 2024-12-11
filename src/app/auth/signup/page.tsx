import SignupForm from "@/components/SignUpForm";
import Image from "next/image";

const Signup = () => {
  return (
    <div className="lg:max-w-lg max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className="flex items-center mb-5">
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
      <h2 className="font-bold text-2xl mb-4 text-neutral-800 dark:text-neutral-200">
        Sign up for an account
      </h2>

      <SignupForm />
    </div>
  );
};

export default Signup;
export const metadata = {
  title: "Sign Up - Johu AI",
};

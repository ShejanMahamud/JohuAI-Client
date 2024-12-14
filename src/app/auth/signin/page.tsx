import Logo from "@/components/Logo";
import SignInForm from "@/components/SignInForm";

const SignIn = () => {
  return (
    <div className="max-w-lg h-full min-h-screen w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <Logo />
      <h2 className="font-bold text-2xl mb-4 text-neutral-800 dark:text-neutral-200">
        Sign in to your account
      </h2>
      <SignInForm />
    </div>
  );
};

export default SignIn;
export const metadata = {
  title: "Sign In - Johu AI",
};

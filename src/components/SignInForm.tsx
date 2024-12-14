"use client";
import { FormInput as Input } from "@/components/ui/form-input";
import { FormLabel as Label } from "@/components/ui/form-label";
import { useToast } from "@/hooks/use-toast";
import { signInUser } from "@/lib/postSignIn";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconCheck,
  IconError404,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastAction } from "./ui/toast";

const SignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signInUser({ email, password });
      if (res.success) {
        toast({
          title: "Logged in successfully",
          description: (
            <div className="flex items-center space-x-2">
              <IconCheck className="w-5 h-5 text-green-500" />
              <span>{res.message}</span>
            </div>
          ),
          variant: "default",
          action: (
            <ToastAction altText="Redirecting">
              <Link href="/dashboard">Redirecting...</Link>
            </ToastAction>
          ),
        });
        return setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
      } else {
        return toast({
          title: "Something Went Wrong",

          description: (
            <div className="flex items-center space-x-2">
              <IconError404 className="w-5 h-5 text-white" />
              <span>{res.message || res.error}</span>
            </div>
          ),
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Something Went Wrong",
        description: (
          <div className="flex items-center space-x-2">
            <IconError404 className="w-5 h-5 text-white-500" />
            <span>{(err as Error).message}</span>
          </div>
        ),
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    window.open(
      process.env.NEXT_PUBLIC_SERVER_URL + "/v1/api/auth/google",
      "_self"
    );
  };

  const handleGithubLogin = async () => {
    window.open(
      process.env.NEXT_PUBLIC_SERVER_URL + "/v1/api/auth/github",
      "_self"
    );
  };

  return (
    <form className="my-8" onSubmit={handleSubmit}>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="projectmayhem@fc.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </LabelInputContainer>

      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        Sign In &rarr;
        <BottomGradient />
      </button>

      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleGithubLogin}
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="button"
        >
          <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            GitHub
          </span>
          <BottomGradient />
        </button>
        <button
          onClick={handleGoogleLogin}
          className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
          type="button"
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-neutral-700 dark:text-neutral-300 text-sm">
            Google
          </span>
          <BottomGradient />
        </button>
      </div>
      <Link
        href={"/auth/signup"}
        className="font-manrope text-white text-center mt-5 text-xs font-medium w-full flex items-center justify-center"
      >
        {`Don't have an account? `}
        <span className="font-bold hover:underline underline-offset-8">
          {" "}
          Sign Up here
        </span>
      </Link>
    </form>
  );
};

export default SignInForm;

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

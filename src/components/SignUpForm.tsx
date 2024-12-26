"use client";

import { FormInput as Input } from "@/components/ui/form-input";
import { FormLabel as Label } from "@/components/ui/form-label";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/lib/postRegisterUser";
import { verifyOtp } from "@/lib/postVerifyOtp";
import { cn } from "@/lib/utils";
import { ToastAction } from "@radix-ui/react-toast";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconCheck,
  IconError404,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Logo from "./Logo";
import OTPStage from "./OTPStage";

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const [otp, setOTP] = useState<string>("");
  const [isOTPStage, setIsOTPStage] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await registerUser({
        email,
        password,
        name: fullName,
        profile_picture: `https://robohash.org/${fullName}?bgset=bg1&set=set1`,
      });
      if (data.success) {
        setIsOTPStage(true);
        toast({
          title: "Account created successfully",
          description: (
            <div className="flex items-center space-x-2">
              <IconCheck className="w-5 h-5 text-green-500" />
              <span>You can now sign in to your account</span>
            </div>
          ),
          variant: "default",
        });
      } else {
        return toast({
          title: "Something Went Wrong",
          description: (
            <div className="flex items-center space-x-2">
              <IconError404 className="w-5 h-5 text-green-500" />
              <span>{data.message || data.error}</span>
            </div>
          ),
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Something Went Wrong",
        description: (
          <div className="flex items-center space-x-2">
            <IconError404 className="w-5 h-5 text-green-500" />
            <span>{(e as Error).message}</span>
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

  const handleOTPVerification = async () => {
    try {
      const res = await verifyOtp(email, otp);
      if (res.success) {
        toast({
          title: "Your email has been verified",
          description: "You can now sign in to your account.",
          action: (
            <ToastAction altText="Redirecting">
              <Link href="/dashboard">Redirecting...</Link>
            </ToastAction>
          ),
        });
        setTimeout(() => {
          router.push("/auth/signin");
        }, 5000);
      } else {
        toast({
          title: "Invalid OTP",
          description: res.message || res.error,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "OTP Verification Failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {isOTPStage ? (
        <div className="h-full w-full flex items-center justify-center">
          <OTPStage
            otp={otp}
            setOTP={setOTP}
            handleOTPVerification={handleOTPVerification}
          />
        </div>
      ) : (
        <div className="lg:max-w-lg max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <Logo />
          <h2 className="font-bold text-2xl mb-4 text-neutral-800 dark:text-neutral-200">
            Sign up for an account
          </h2>
          <form className="my-8" onSubmit={handleSubmit}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                placeholder="Durden"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
            </LabelInputContainer>
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
              Sign up &rarr;
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
              href={"/auth/signin"}
              className="font-manrope text-white text-center mt-5 text-xs font-medium w-full flex items-center justify-center"
            >
              {`Already have an account? `}
              <span className="font-bold hover:underline underline-offset-8">
                {" "}
                Sign In here
              </span>
            </Link>
          </form>
        </div>
      )}
    </>
  );
};

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

export default SignupForm;

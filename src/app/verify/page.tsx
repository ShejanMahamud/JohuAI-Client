"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { sendOtp } from "@/lib/postSendOtp";
import { verifyOtp } from "@/lib/postVerifyOtp"; // Adjust to your API paths
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Verify = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [resendLoading, setResendLoading] = useState<boolean>(false);
  useEffect(() => {
    // Get query params from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email") || "";
    const otpParam = queryParams.get("code") || "";
    setEmail(emailParam);

    if (emailParam && otpParam) {
      handleOTPVerification(emailParam, otpParam);
    } else {
      toast({
        title: "Invalid URL",
        description: "Email or OTP is missing in the URL.",
        variant: "destructive",
      });
    }
  }, []);

  const handleOTPVerification = async (email: string, otp: string) => {
    try {
      const res = await verifyOtp(email, otp);
      if (res.success) {
        toast({
          title: "Email Verified",
          description: "You can now sign in to your account.",
          action: (
            <ToastAction altText="Redirecting">
              <a href="/auth/signin">Redirecting...</a>
            </ToastAction>
          ),
        });
        setTimeout(() => {
          router.push("/auth/signin");
        }, 3000);
      } else {
        toast({
          title: "Invalid OTP",
          description: res.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      const res = await sendOtp(email);
      if (res.success) {
        toast({
          title: "OTP Resent",
          description: "A new OTP has been sent to your email.",
        });
      } else {
        toast({
          title: "Failed to Resend OTP",
          description: res.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>
            Verifying your email. Please wait...
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="default" onClick={handleResendOtp}>
            {resendLoading ? "Resending..." : "Resend OTP"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;

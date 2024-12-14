import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "./Logo";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

const OTPStage = ({
  otp,
  setOTP,
  handleOTPVerification,
}: {
  otp: string;
  setOTP: (value: string) => void;
  handleOTPVerification: () => void;
}) => {
  return (
    <div className="flex items-center flex-col">
      <Logo />
      <Card className="max-w-md mx-auto border rounded-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-center">
            Verify Your OTP
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Please enter the 6-digit code sent to your email.
          </p>
          {/* Using InputOTP Structure */}
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value: string) => setOTP(value)}
            >
              <InputOTPGroup>
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <InputOTPSlot className="p-4" key={index} index={index} />
                  ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="default"
            className="w-full"
            onClick={handleOTPVerification}
          >
            Verify OTP
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OTPStage;

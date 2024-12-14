"use client";
import { cn } from "@/lib/utils";
import { IconEye, IconEyeOff } from "@tabler/icons-react"; // Add tabler icons for eye and eye-off
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import * as React from "react";

const FormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  const radius = 100; // Change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input relative"
    >
      <input
        type={type === "password" && showPassword ? "text" : type}
        className={cn(
          `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-3 py-2 text-sm 
          file:border-0 file:bg-transparent rounded-md
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
          disabled:cursor-not-allowed disabled:opacity-50
          dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
          group-hover/input:shadow-none transition duration-400
          `,
          className
        )}
        ref={ref}
        {...props}
      />
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2.5 text-neutral-500 dark:text-neutral-400"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <IconEyeOff className="h-5 w-5" />
          ) : (
            <IconEye className="h-5 w-5" />
          )}
        </button>
      )}
    </motion.div>
  );
});
FormInput.displayName = "Input";

export { FormInput };

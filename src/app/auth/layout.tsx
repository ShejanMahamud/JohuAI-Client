import { AuthLayoutSidebar } from "@/components/AuthLayoutSidebar";
import React from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full grid grid-cols-2 row-auto items-center">
      {children}
      <div className=" w-full h-full bg-[#171717] flex flex-col space-y-2 items-center justify-center">
        <AuthLayoutSidebar />
      </div>
    </section>
  );
}

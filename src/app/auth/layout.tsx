import { AuthLayoutSidebar } from "@/components/AuthLayoutSidebar";
import React from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full grid lg:grid-cols-2 grid-cols-1 row-auto items-center">
      {children}
      <div className="hidden w-full h-full bg-[#171717] lg:flex flex-col space-y-2 items-center justify-center">
        <AuthLayoutSidebar />
      </div>
    </section>
  );
}

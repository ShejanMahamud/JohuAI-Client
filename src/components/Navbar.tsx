"use client";
import { useAuthStore } from "@/app/stores/authStore";
import {
  IconCheck,
  IconDashboard,
  IconError404,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import { useToast } from "@/hooks/use-toast";
import { logOut } from "@/lib/postLogout";
import { MenubarSeparator } from "@radix-ui/react-menubar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import SparklesText from "./ui/sparkles-text";
import { ToastAction } from "./ui/toast";
const Navbar: React.FC = () => {
  const { user, loading, setUser } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const res = await logOut();
      if (res.success) {
        setUser(null);
        toast({
          title: "Logout Successfully",
          description: (
            <div className="flex items-center space-x-2">
              <IconCheck className="w-5 h-5 text-green-500" />
              <span>{res.message}</span>
            </div>
          ),
          variant: "default",
          action: (
            <ToastAction altText="Redirecting">
              <Link href="/auth/signin">Redirecting...</Link>
            </ToastAction>
          ),
        });
        return setTimeout(() => {
          router.push("/auth/signin");
        }, 5000);
      }
    } catch (error) {
      return toast({
        title: "Something Went Wrong",
        description: (
          <div className="flex items-center space-x-2">
            <IconError404 className="w-5 h-5 text-green-500" />
            <span>{(error as Error).message}</span>
          </div>
        ),
        variant: "default",
      });
    }
  };

  const leftMenu = [
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Discover", href: "/about" },
  ];

  const rightMenu = [
    { name: "Team", href: "/team" },
    { name: "Pricing", href: "/pricing" },
    { name: "Buy Premium", href: "/buy-premium" },
  ];

  return (
    <nav className="w-full flex items-center justify-between p-6 border-b border-b-[#ffffff33]">
      <div className="w-full flex items-center justify-between md:gap-5 z-50">
        {/* Left Menu */}
        <div className="hidden lg:flex items-center gap-5">
          {leftMenu.map((item, index) => (
            <Link key={index} className="text-white text-sm" href={item.href}>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="31"
            viewBox="0 0 32 31"
            fill="none"
          >
            <path
              d="M16 0.125C11.9223 0.125 8.0116 1.74486 5.12823 4.62823C2.24486 7.5116 0.625 11.4223 0.625 15.5C0.625 19.5777 2.24486 23.4884 5.12823 26.3718C8.0116 29.2551 11.9223 30.875 16 30.875C20.0777 30.875 23.9884 29.2551 26.8718 26.3718C29.7551 23.4884 31.375 19.5777 31.375 15.5C31.375 11.4223 29.7551 7.5116 26.8718 4.62823C23.9884 1.74486 20.0777 0.125 16 0.125ZM24.535 16.385C24.3458 16.6339 24.0836 16.8174 23.785 16.91L21.37 17.72C20.632 17.9722 19.9604 18.3875 19.405 18.935C18.8533 19.4871 18.4374 20.1598 18.19 20.9L17.365 23.315C17.254 23.5873 17.0729 23.8254 16.84 24.005C16.591 24.1854 16.2925 24.2849 15.985 24.29C15.676 24.2945 15.3745 24.1941 15.13 24.005C14.8805 23.8259 14.6921 23.5746 14.59 23.285L13.795 20.87C13.5479 20.1272 13.1302 19.4526 12.5754 18.9004C12.0205 18.3481 11.344 17.9336 10.6 17.69L8.2 16.895C7.91039 16.7929 7.65907 16.6045 7.48 16.355C7.29302 16.1094 7.19278 15.8087 7.195 15.5C7.19702 15.1874 7.29666 14.8832 7.48 14.63C7.65227 14.3869 7.90015 14.2075 8.185 14.12L10.6 13.31C11.3465 13.0572 12.0278 12.6423 12.595 12.095C13.15 11.534 13.5655 10.85 13.81 10.1L14.62 7.73C14.7099 7.4462 14.8822 7.19556 15.115 7.01C15.3542 6.80798 15.6569 6.69648 15.97 6.695C16.2676 6.68989 16.56 6.77343 16.81 6.935C17.074 7.0991 17.2748 7.34751 17.38 7.64L18.19 10.085C18.442 10.8395 18.862 11.5265 19.42 12.095C19.9837 12.6392 20.6595 13.0539 21.4 13.31L23.815 14.15C24.102 14.2415 24.3501 14.4263 24.52 14.675C24.6951 14.9258 24.7893 15.2241 24.79 15.53C24.7885 15.833 24.7 16.13 24.535 16.385Z"
              fill="white"
            />
          </svg>
          <SparklesText text="Johu AI" />
          {/* <span className="text-white text-lg font-medium uppercase">
            
          </span> */}
        </div>

        {/* Menu Icon for Mobile */}
        <div
          className="md:hidden flex items-center z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>

      {/* Right Menu */}
      <div className="hidden md:flex items-center gap-5 w-full justify-end">
        {rightMenu.map((item, index) => (
          <Link key={index} className="text-white text-sm" href={item.href}>
            {item.name}
          </Link>
        ))}
        {loading ? (
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
        ) : user ? (
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger>
                <Avatar>
                  <AvatarImage src={user?.profile_picture} />
                  <AvatarFallback>
                    <span>{user?.name[0]}</span>
                  </AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  onClick={() => router.push("/dashboard")}
                  className="font-manrope py-3"
                >
                  <IconDashboard className="mr-2 h-5 w-5" />
                  Dashboard
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  className="font-manrope py-3"
                  onClick={() => router.push("/profile")}
                >
                  <IconUser className="mr-2 h-5 w-5" />
                  Profile
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem
                  className="font-manrope py-3"
                  onClick={() => router.push("/settings")}
                >
                  <IconSettings className="mr-2 h-5 w-5" />
                  Settings
                </MenubarItem>
                <MenubarItem
                  className="text-red-500 hover:bg-red-100 font-manrope py-3"
                  onClick={handleLogout}
                >
                  <IconLogout className="mr-2 h-5 w-5" />
                  Logout
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <PrimaryButton
            link={true}
            textStyles="text-sm"
            linkPath="/auth/signup"
            text="Get Started"
            buttonStyles="px-6"
          />
        )}
      </div>

      {/* Mobile Menu with Framer Motion Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-16 right-5 bg-black text-white p-5 flex flex-col items-center gap-3 z-50 border border-[#ffffff33] rounded-xl w-[50%] shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {leftMenu.map((item, index) => (
              <Link key={index} className="text-white text-sm" href={item.href}>
                {item.name}
              </Link>
            ))}
            {rightMenu.map((item, index) => (
              <Link key={index} className="text-white text-sm" href={item.href}>
                {item.name}
              </Link>
            ))}
            <PrimaryButton
              link={true}
              textStyles="text-sm"
              linkPath="/auth/signup"
              text="Get Started"
              buttonStyles="px-8"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

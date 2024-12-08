"use client";
import React from "react";
import PrimaryButton from "./PrimaryButton";
import SparklesText from "./ui/sparkles-text";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-t-[#ffffff33] py-12 w-full bg-black text-white bg-[url('/cta-bg-light.png')] bg-cover bg-top relative z-0">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black opacity-90"></div>

      {/* Decorative Glows */}
      <div className="absolute -top-10 left-1/3 w-72 h-72 bg-gradient-to-r from-white via-gray-400 to-transparent opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-purple-500 via-gray-700 to-transparent opacity-25 rounded-full blur-3xl"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Brand Overview */}
          <div>
            <SparklesText text="Johu AI" className="text-3xl mb-2" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing content creation with AI. Simplify workflows and
              unlock your productivity with cutting-edge solutions designed for
              the future.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>
                <a
                  href="#features"
                  className="hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#support"
                  className="hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Get in Touch */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <p className="text-sm text-gray-400">Email: support@johuai.com</p>
            <p className="text-sm text-gray-400">Phone: +123 456 7890</p>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Column 4: Subscribe */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-sm text-gray-400 mb-4">
              Join our newsletter to get the latest AI insights and updates.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <PrimaryButton text="Subscribe" buttonStyles="rounded-md" />
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} JohuAI. All rights reserved. Powered by
            cutting-edge AI.
          </p>
          <p className="mt-2">Crafted with ❤️ by the JohuAI Team.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

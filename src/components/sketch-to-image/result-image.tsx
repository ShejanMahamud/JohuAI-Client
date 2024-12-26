"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";

interface ResultImageProps {
  src: string;
}

export default function ResultImage({ src }: ResultImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = src;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-4"
    >
      <h2 className="text-2xl font-semibold">Generated Image</h2>
      <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}
        <motion.img
          src={src}
          alt="Generated image"
          className="w-full h-full object-cover"
          onLoad={() => setIsLoading(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <Button onClick={handleDownload} className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download Image
      </Button>
    </motion.div>
  );
}

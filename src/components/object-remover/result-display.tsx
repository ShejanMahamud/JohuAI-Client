"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Download, RefreshCw } from "lucide-react";

interface ResultDisplayProps {
  result: string;
  onReset: () => void;
}

export default function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = result;
    link.download = "object-removed.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        className="border rounded-lg overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img src={result} alt="Result" className="w-full h-auto" />
      </motion.div>
      <div className="flex justify-between gap-4">
        <Button variant="outline" onClick={onReset} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Remove Another Object
        </Button>
        <Button onClick={handleDownload} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Result
        </Button>
      </div>
    </motion.div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export default function ImageUploader({ file, setFile }: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag & drop your sketch here, or click to select a file
        </p>
      </motion.div>
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 bg-gray-100 rounded-lg"
        >
          <span className="text-sm text-gray-600 truncate">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            <X className="h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

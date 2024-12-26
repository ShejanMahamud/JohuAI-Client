"use client";

import { motion } from "framer-motion";
import { ImageIcon, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onUpload(file);
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <motion.div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-gray-300 dark:border-gray-700"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input {...getInputProps()} />
      {preview ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-64"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {isDragActive ? (
            <ImageIcon className="mx-auto h-16 w-16 text-primary" />
          ) : (
            <Upload className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-600" />
          )}
          <p className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">
            {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            or click to select a file from your computer
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

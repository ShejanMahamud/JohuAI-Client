"use client";

import { useAuthStore } from "@/app/stores/authStore";
import Canvas from "@/components/object-remover/editing-canvas";
import ImageUploader from "@/components/object-remover/image-uploader";
import ToolBar from "@/components/object-remover/toolbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sendObjectRemoverPrompt } from "@/lib/object-remover-routes";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ObjectRemover() {
  const [image, setImage] = useState<string | null>(null);
  const [mask, setMask] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const { user, loading } = useAuthStore();

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setActiveTab("edit");
    };
    reader.readAsDataURL(file);
  };

  const handleMaskCreate = (maskData: string) => {
    setMask(maskData);
  };

  const handleRemoveObject = async () => {
    if (!image || !mask) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("image_file", await fetch(image).then((r) => r.blob()));
    formData.append("mask_file", await fetch(mask).then((r) => r.blob()));
    formData.append("userId", user?._id as string);

    try {
      const data = await sendObjectRemoverPrompt(formData);
      if (data.success) {
        setResult(data.data);
      } else {
        console.error("Error removing object:", data.message);
      }
    } catch (error) {
      console.error("Error removing object:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setMask(null);
    setResult(null);
    setActiveTab("upload");
  };

  const handleDownload = () => {
    if (result) {
      const link = document.createElement("a");
      link.href = result;
      link.download = "object-removed.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className=" shadow-2xl rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="edit" disabled={!image}>
                Edit
              </TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="upload">
                  <ImageUploader onUpload={handleImageUpload} />
                </TabsContent>
                <TabsContent value="edit">
                  {image && (
                    <div className="space-y-6">
                      <Canvas image={image} onMaskCreate={handleMaskCreate} />
                      <ToolBar
                        onRemove={handleRemoveObject}
                        onReset={handleReset}
                        isLoading={isLoading}
                      />
                    </div>
                  )}
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 space-y-4"
            >
              <h3 className="text-lg font-semibold">Result</h3>
              <div className="border rounded-lg overflow-hidden">
                <img src={result} alt="Result" className="w-full h-auto" />
              </div>
              <Button onClick={handleDownload} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Result
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

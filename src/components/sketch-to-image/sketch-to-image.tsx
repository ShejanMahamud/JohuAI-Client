"use client";

import { useAuthStore } from "@/app/stores/authStore";
import DrawingCanvas from "@/components/sketch-to-image/drawing-canvas";
import ImageUploader from "@/components/sketch-to-image/image-uploader";
import ResultImage from "@/components/sketch-to-image/result-image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendSketchToImagePrompt } from "@/lib/sketch-to-image-routes";
import { motion } from "framer-motion";
import { Loader2, Wand2 } from "lucide-react";
import { useState } from "react";

export default function SketchToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [drawingData, setDrawingData] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user, loading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file && !drawingData) {
      toast({
        title: "No image provided",
        description: "Please upload a sketch image or draw one.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    if (file) {
      formData.append("image", file);
    } else if (drawingData) {
      formData.append("image", dataURLtoFile(drawingData, "drawing.png"));
    }
    formData.append("prompt", prompt);
    formData.append("userId", user?._id as string);

    try {
      const response = await sendSketchToImagePrompt(formData);
      if (response.success) {
        setResultImage(response.data);
        toast({
          title: "Success!",
          description: "Your image has been generated.",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
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
      className="max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="draw">Draw</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <ImageUploader file={file} setFile={setFile} />
          </TabsContent>
          <TabsContent value="draw">
            <DrawingCanvas setDrawingData={setDrawingData} />
          </TabsContent>
        </Tabs>
        <div className="space-y-2">
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Describe the image you want to generate..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="h-32"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || (!file && !drawingData)}
          className="w-full"
        >
          {isLoading ? (
            "Generating..."
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>
      </form>
      {resultImage && <ResultImage src={resultImage} />}
    </motion.div>
  );
}

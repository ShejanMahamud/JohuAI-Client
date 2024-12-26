"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Eraser, PenTool } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DrawingCanvasProps {
  setDrawingData: (data: string | null) => void;
}

export default function DrawingCanvas({ setDrawingData }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const handleResize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.beginPath(); // Reset the path to disconnect the current drawing path.
    }
    if (canvas) {
      setDrawingData(canvas.toDataURL());
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = tool === "eraser" ? "white" : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setDrawingData(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button
          variant={tool === "pen" ? "default" : "outline"}
          size="sm"
          type="button"
          onClick={() => setTool("pen")}
        >
          <PenTool className="h-4 w-4 mr-2" />
          Pen
        </Button>
        <Button
          variant={tool === "eraser" ? "default" : "outline"}
          size="sm"
          type="button"
          onClick={() => setTool("eraser")}
        >
          <Eraser className="h-4 w-4 mr-2" />
          Eraser
        </Button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-9 w-9 rounded-md border border-input"
        />
        <div className="flex-1 flex items-center space-x-2">
          <Label htmlFor="brush-size" className="w-14">
            Size: {brushSize}
          </Label>
          <Slider
            id="brush-size"
            min={1}
            max={20}
            step={1}
            value={[brushSize]}
            onValueChange={(value) => setBrushSize(value[0])}
          />
        </div>
      </div>
      <div className="relative aspect-square w-full border-2 border-dashed rounded-lg overflow-hidden">
        <motion.canvas
          ref={canvasRef}
          width={500}
          height={500}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onMouseMove={draw}
          className="w-full h-full cursor-crosshair"
          // whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        />
      </div>
      <Button
        onClick={clearCanvas}
        variant="outline"
        className="w-full"
        type="button"
      >
        Clear Canvas
      </Button>
    </div>
  );
}

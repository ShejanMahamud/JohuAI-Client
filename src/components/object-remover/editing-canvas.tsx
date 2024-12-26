"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { Eraser, Paintbrush, Redo, Undo, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface CanvasProps {
  image: string;
  onMaskCreate: (maskData: string) => void;
}

export default function Canvas({ image, onMaskCreate }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [brushSize, setBrushSize] = useState(40);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    const maskCtx = maskCanvas?.getContext("2d");
    if (!canvas || !ctx || !maskCanvas || !maskCtx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      maskCanvas.width = img.width;
      maskCanvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      saveState();
    };
    img.src = image;
  }, [image]);

  const saveState = useCallback(() => {
    const maskCanvas = maskCanvasRef.current;
    const maskCtx = maskCanvas?.getContext("2d");
    if (!maskCanvas || !maskCtx) return;

    const imageData = maskCtx.getImageData(
      0,
      0,
      maskCanvas.width,
      maskCanvas.height
    );
    setHistory((prevHistory) => [
      ...prevHistory.slice(0, historyIndex + 1),
      imageData,
    ]);
    setHistoryIndex((prevIndex) => prevIndex + 1);
  }, [historyIndex]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    setLastPoint(null);
    saveState();
    const maskCanvas = maskCanvasRef.current;
    if (maskCanvas) {
      onMaskCreate(maskCanvas.toDataURL());
    }
  }, [saveState, onMaskCreate]);

  const getPoint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = maskCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom,
    };
  };

  const draw = useCallback(
    (
      start: { x: number; y: number },
      end: { x: number; y: number },
      isInitial = false
    ) => {
      const maskCanvas = maskCanvasRef.current;
      const maskCtx = maskCanvas?.getContext("2d");
      if (!maskCanvas || !maskCtx) return;

      maskCtx.globalCompositeOperation = isEraser
        ? "destination-out"
        : "source-over";
      maskCtx.strokeStyle = isEraser
        ? "rgba(0, 0, 0, 1)" // Full opacity for eraser
        : "rgba(255, 0, 0, 0.2)"; // Lower opacity for drawing
      maskCtx.lineWidth = brushSize;
      maskCtx.lineCap = "round";
      maskCtx.lineJoin = "round";

      if (isInitial) {
        // Avoid drawing a large circle; draw a tiny line segment instead
        maskCtx.beginPath();
        maskCtx.moveTo(start.x, start.y);
        maskCtx.lineTo(start.x + 0.01, start.y + 0.01); // Minimal line segment
        maskCtx.stroke();
      } else {
        // Draw a continuous line between points
        maskCtx.beginPath();
        maskCtx.moveTo(start.x, start.y);
        maskCtx.lineTo(end.x, end.y);
        maskCtx.stroke();
      }
    },
    [isEraser, brushSize]
  );

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true);
      const point = getPoint(e);
      setLastPoint(point);
      draw(point, point, true); // Pass true for the initial draw
    },
    [draw]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      const newPoint = getPoint(e);
      if (lastPoint) {
        draw(lastPoint, newPoint);
      }
      setLastPoint(newPoint);
    },
    [isDrawing, lastPoint, draw]
  );

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const maskCanvas = maskCanvasRef.current;
      const maskCtx = maskCanvas?.getContext("2d");
      if (!maskCanvas || !maskCtx) return;

      setHistoryIndex((prevIndex) => prevIndex - 1);
      maskCtx.putImageData(history[historyIndex - 1], 0, 0);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const maskCanvas = maskCanvasRef.current;
      const maskCtx = maskCanvas?.getContext("2d");
      if (!maskCanvas || !maskCtx) return;

      setHistoryIndex((prevIndex) => prevIndex + 1);
      maskCtx.putImageData(history[historyIndex + 1], 0, 0);
    }
  }, [history, historyIndex]);

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  const handleZoomOut = () =>
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));

  return (
    <TooltipProvider>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full h-[400px] overflow-auto border rounded-lg">
          <div
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >
            <canvas ref={canvasRef} className="absolute top-0 left-0" />
            <canvas
              ref={maskCanvasRef}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={handleMouseMove}
              onMouseLeave={stopDrawing}
              className="absolute top-0 left-0 cursor-crosshair"
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isEraser ? "secondary" : "default"}
                  size="icon"
                  onClick={() => setIsEraser(false)}
                >
                  <Paintbrush className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Brush</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isEraser ? "default" : "secondary"}
                  size="icon"
                  onClick={() => setIsEraser(true)}
                >
                  <Eraser className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Eraser</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                >
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <span className="text-sm font-medium">Brush Size:</span>
            <Slider
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              min={5}
              max={100}
              step={5}
              className="w-full max-w-xs"
            />
            <span className="text-sm font-medium w-8">{brushSize}px</span>
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}

import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Wand2 } from "lucide-react";

interface ToolBarProps {
  onRemove: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export default function ToolBar({
  onRemove,
  onReset,
  isLoading,
}: ToolBarProps) {
  return (
    <div className="flex justify-between gap-4">
      <Button variant="outline" onClick={onReset} className="w-full">
        <Trash2 className="mr-2 h-4 w-4" />
        Start Over
      </Button>
      <Button onClick={onRemove} disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Remove Object
          </>
        )}
      </Button>
    </div>
  );
}

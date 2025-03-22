import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Download, Printer, Trash, Trash2, X } from "lucide-react";

interface ComparisonActionsProps {
  onPrint?: () => void;
  onExport?: () => void;
  onRemoveItem?: (itemId: string) => void;
  onClearAll?: () => void;
  comparedItems?: Array<{ id: string; name: string }>;
  className?: string;
}

const ComparisonActions = ({
  onPrint = () => console.log("Print comparison"),
  onExport = () => console.log("Export comparison"),
  onRemoveItem = (itemId) => console.log(`Remove item ${itemId}`),
  onClearAll = () => console.log("Clear all items"),
  comparedItems = [
    { id: "1", name: "Medical Device A" },
    { id: "2", name: "Medical Device B" },
    { id: "3", name: "Medical Device C" },
  ],
  className,
}: ComparisonActionsProps) => {
  return (
    <div className={cn("w-full bg-card p-4 rounded-md shadow-sm", className)}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {comparedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-muted px-3 py-1.5 rounded-full text-sm"
            >
              <span className="mr-2 truncate max-w-[150px]">{item.name}</span>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                aria-label={`Remove ${item.name} from comparison`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onPrint}
                  className="h-9 w-9 p-0"
                >
                  <Printer size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Print comparison</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onExport}
                  className="h-9 w-9 p-0"
                >
                  <Download size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export comparison data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onClearAll}
                  className="h-9 px-3"
                >
                  <Trash2 size={16} className="mr-1" />
                  <span className="hidden sm:inline">Clear All</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove all items from comparison</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ComparisonActions;

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Eye, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id?: string;
  name?: string;
  image?: string;
  category?: string;
  price?: string;
  inStock?: boolean;
  description?: string;
  onViewDetails?: (id: string) => void;
  onAddToComparison?: (id: string) => void;
}

const ProductCard = ({
  id = "123",
  name = "Medical Pulse Oximeter",
  image = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
  category = "Diagnostic Equipment",
  price = "$129.99",
  inStock = true,
  description = "Professional-grade pulse oximeter for accurate SpO2 and pulse rate monitoring with OLED display.",
  onViewDetails = () => {},
  onAddToComparison = () => {},
}: ProductCardProps) => {
  return (
    <Card className="w-full max-w-[280px] overflow-hidden flex flex-col h-full bg-card">
      <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge
          className={cn(
            "absolute top-2 right-2",
            inStock ? "bg-green-500" : "bg-red-500",
          )}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg line-clamp-1">{name}</CardTitle>
            <CardDescription className="text-xs">{category}</CardDescription>
          </div>
          <div className="font-bold text-primary">{price}</div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onViewDetails(id)}
        >
          <Eye className="mr-1 h-4 w-4" />
          Details
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={() => onAddToComparison(id)}
        >
          <BarChart2 className="mr-1 h-4 w-4" />
          Compare
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

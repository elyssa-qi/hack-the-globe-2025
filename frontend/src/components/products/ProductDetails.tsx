import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  BarChart2,
  Heart,
  ShoppingCart,
  ArrowLeft,
  Star,
  Info,
  FileText,
  Truck,
  Shield,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetailsProps {
  id?: string;
  name?: string;
  manufacturer?: string;
  image?: string;
  price?: string;
  rating?: number;
  category?: string;
  inStock?: boolean;
  description?: string;
  features?: string[];
  specifications?: Record<string, string | boolean | number>;
  onAddToComparison?: (id: string) => void;
}

const ProductDetails = ({
  id = "123",
  name = "Advanced Glucose Monitor Pro",
  manufacturer = "MediTech",
  image = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
  price = "$299.99",
  rating = 4.8,
  category = "Diagnostic Equipment",
  inStock = true,
  description = "Professional-grade glucose monitor for accurate blood sugar monitoring with advanced features including continuous monitoring, smartphone connectivity, and trend analysis.",
  features = [
    "Continuous glucose monitoring",
    "Bluetooth 5.0 connectivity",
    "14-day battery life",
    "Water-resistant design",
    "Smartphone app integration",
    "Customizable alerts",
    "Trend analysis and reporting",
  ],
  specifications = {
    "Battery Life": "14 days",
    Connectivity: "Bluetooth 5.0",
    Display: "Color LCD",
    "Data Storage": "90 days",
    "Water Resistant": true,
    Weight: "45g",
    Dimensions: "38 x 38 x 12mm",
    Warranty: "2 years",
    "Continuous Monitoring": true,
    "Alarm System": true,
  },
  onAddToComparison = () => {},
}: ProductDetailsProps) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />,
        );
      } else {
        stars.push(
          <Star key={i} className="h-5 w-5 text-gray-300 dark:text-gray-600" />,
        );
      }
    }
    return stars;
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-muted rounded-lg overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-auto object-contain aspect-square"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>{manufacturer}</span>
              <span>•</span>
              <span>{category}</span>
            </div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">{renderStars(rating)}</div>
              <span className="text-sm text-muted-foreground">
                {rating} out of 5
              </span>
            </div>
          </div>

          <div>
            <div className="text-3xl font-bold">{price}</div>
            <Badge
              className={cn(
                "mt-2",
                inStock
                  ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100",
              )}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <p className="text-muted-foreground">{description}</p>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="gap-2 flex-1" disabled={!inStock}>
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="gap-2 flex-1"
                onClick={() => onAddToComparison(id)}
              >
                <BarChart2 className="h-4 w-4" />
                Compare
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(isFavorite && "text-red-500")}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={cn("h-4 w-4", isFavorite && "fill-current")}
                />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Free Shipping</p>
                <p className="text-muted-foreground">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">2 Year Warranty</p>
                <p className="text-muted-foreground">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Technical Support</p>
                <p className="text-muted-foreground">24/7 available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="features" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="p-4 border rounded-md mt-2">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent
          value="specifications"
          className="p-4 border rounded-md mt-2"
        >
          <div className="space-y-4">
            {Object.entries(specifications).map(([key, value], index) => (
              <div key={index}>
                <div className="flex justify-between py-2">
                  <span className="font-medium">{key}</span>
                  <span>
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )
                    ) : (
                      value
                    )}
                  </span>
                </div>
                {index < Object.entries(specifications).length - 1 && (
                  <Separator />
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="documents" className="p-4 border rounded-md mt-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">User Manual</p>
                <p className="text-sm text-muted-foreground">PDF, 2.4 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Quick Start Guide</p>
                <p className="text-sm text-muted-foreground">PDF, 1.2 MB</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-md hover:bg-muted/50 cursor-pointer">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Technical Specifications</p>
                <p className="text-sm text-muted-foreground">PDF, 3.1 MB</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductDetails;

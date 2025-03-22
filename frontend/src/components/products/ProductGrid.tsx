import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, SlidersHorizontal, Eye, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: string;
  inStock: boolean;
  description: string;
}

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
  onViewDetails?: (id: string) => void;
  onAddToComparison?: (id: string) => void;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      name: "Medical Pulse Oximeter",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
      category: "Diagnostic Equipment",
      price: "$129.99",
      inStock: true,
      description:
        "Professional-grade pulse oximeter for accurate SpO2 and pulse rate monitoring with OLED display.",
    },
    {
      id: "2",
      name: "Digital Stethoscope",
      image:
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=300&q=80",
      category: "Diagnostic Equipment",
      price: "$249.99",
      inStock: true,
      description:
        "Advanced digital stethoscope with noise cancellation and Bluetooth connectivity for recording and analysis.",
    },
    {
      id: "3",
      name: "Infrared Thermometer",
      image:
        "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=300&q=80",
      category: "Diagnostic Equipment",
      price: "$59.99",
      inStock: true,
      description:
        "Non-contact infrared thermometer for accurate temperature readings with LCD display and fever alarm.",
    },
    {
      id: "4",
      name: "Blood Pressure Monitor",
      image:
        "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=300&q=80",
      category: "Monitoring Devices",
      price: "$89.99",
      inStock: false,
      description:
        "Automatic digital blood pressure monitor with adjustable cuff and irregular heartbeat detection.",
    },
    {
      id: "5",
      name: "Glucose Monitoring System",
      image:
        "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=300&q=80",
      category: "Monitoring Devices",
      price: "$199.99",
      inStock: true,
      description:
        "Complete glucose monitoring system with test strips, lancets, and smartphone connectivity.",
    },
    {
      id: "6",
      name: "Surgical Mask Pack",
      image:
        "https://images.unsplash.com/photo-1605845753398-4db8078cc7f9?w=300&q=80",
      category: "Protective Equipment",
      price: "$19.99",
      inStock: true,
      description:
        "Pack of 50 disposable 3-ply surgical masks with melt-blown filter layer for medical use.",
    },
  ],
  isLoading = false,
  onViewDetails = () => {},
  onAddToComparison = () => {},
}: ProductGridProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products by category
  const filteredProducts =
    filterCategory === "all"
      ? products
      : products.filter((product) => product.category === filterCategory);

  // Sort products based on selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          parseFloat(a.price.replace(/[^0-9.]/g, "")) -
          parseFloat(b.price.replace(/[^0-9.]/g, ""))
        );
      case "price-high":
        return (
          parseFloat(b.price.replace(/[^0-9.]/g, "")) -
          parseFloat(a.price.replace(/[^0-9.]/g, ""))
        );
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0; // relevance - maintain original order
    }
  });

  return (
    <div className="w-full bg-background">
      {/* Filters and View Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 p-4 border rounded-lg bg-card">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("grid")}
            className={cn(
              view === "grid" ? "bg-primary text-primary-foreground" : "",
            )}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("list")}
            className={cn(
              view === "list" ? "bg-primary text-primary-foreground" : "",
            )}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && sortedProducts.length === 0 && (
        <div className="flex flex-col justify-center items-center h-64 text-center p-4">
          <SlidersHorizontal className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}

      {/* Products Grid View */}
      {!isLoading && sortedProducts.length > 0 && view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              category={product.category}
              price={product.price}
              inStock={product.inStock}
              description={product.description}
              onViewDetails={onViewDetails}
              onAddToComparison={onAddToComparison}
            />
          ))}
        </div>
      )}

      {/* Products List View */}
      {!isLoading && sortedProducts.length > 0 && view === "list" && (
        <div className="flex flex-col gap-4">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-card"
            >
              <div className="w-full md:w-48 h-40 overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-md">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                  <div className="font-bold text-primary">{product.price}</div>
                </div>
                <p className="text-sm text-muted-foreground flex-grow mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        product.inStock
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
                      )}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(product.id)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Details
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onAddToComparison(product.id)}
                    >
                      <BarChart2 className="mr-1 h-4 w-4" />
                      Compare
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

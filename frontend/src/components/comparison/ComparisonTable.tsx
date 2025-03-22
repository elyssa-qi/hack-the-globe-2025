import React, { useState } from "react";
import { Check, X, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Specification {
  name: string;
  category: string;
  description?: string;
}

interface ProductComparison {
  id: string;
  name: string;
  manufacturer: string;
  image: string;
  price: number;
  rating: number;
  specifications: Record<string, string | boolean | number>;
}

interface ComparisonTableProps {
  products?: ProductComparison[];
  onRemoveProduct?: (productId: string) => void;
  specificationCategories?: string[];
}

const ComparisonTable = ({
  products = [
    {
      id: "1",
      name: "Advanced Glucose Monitor",
      manufacturer: "MediTech",
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&q=80",
      price: 299.99,
      rating: 4.8,
      specifications: {
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
    },
    {
      id: "2",
      name: "ProCare Blood Pressure Monitor",
      manufacturer: "HealthSense",
      image:
        "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=300&q=80",
      price: 149.99,
      rating: 4.5,
      specifications: {
        "Battery Life": "30 days",
        Connectivity: "Bluetooth 4.2",
        Display: "Monochrome LCD",
        "Data Storage": "60 days",
        "Water Resistant": false,
        Weight: "120g",
        Dimensions: "68 x 68 x 28mm",
        Warranty: "1 year",
        "Continuous Monitoring": false,
        "Alarm System": true,
      },
    },
    {
      id: "3",
      name: "UltraScan Pulse Oximeter",
      manufacturer: "MedPro",
      image:
        "https://images.unsplash.com/photo-1612277795421-9bc7706a4a41?w=300&q=80",
      price: 89.99,
      rating: 4.3,
      specifications: {
        "Battery Life": "20 days",
        Connectivity: "Bluetooth 5.0",
        Display: "OLED",
        "Data Storage": "30 days",
        "Water Resistant": true,
        Weight: "35g",
        Dimensions: "32 x 32 x 18mm",
        Warranty: "1 year",
        "Continuous Monitoring": true,
        "Alarm System": false,
      },
    },
  ],
  onRemoveProduct = () => {},
  specificationCategories = ["General", "Technical", "Features"],
}: ComparisonTableProps) => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    General: true,
    Technical: true,
    Features: true,
  });

  // Get all unique specification keys from all products
  const allSpecifications: Specification[] = [
    // General specifications
    { name: "Manufacturer", category: "General" },
    { name: "Price", category: "General" },
    { name: "Rating", category: "General" },
    {
      name: "Warranty",
      category: "General",
      description: "Length of manufacturer warranty",
    },

    // Technical specifications
    {
      name: "Battery Life",
      category: "Technical",
      description: "How long the device operates on a single charge",
    },
    { name: "Connectivity", category: "Technical" },
    { name: "Display", category: "Technical" },
    {
      name: "Data Storage",
      category: "Technical",
      description: "How much historical data the device can store",
    },
    { name: "Weight", category: "Technical" },
    { name: "Dimensions", category: "Technical" },

    // Features
    { name: "Water Resistant", category: "Features" },
    {
      name: "Continuous Monitoring",
      category: "Features",
      description: "Whether the device provides continuous monitoring",
    },
    {
      name: "Alarm System",
      category: "Features",
      description: "Whether the device has alert capabilities",
    },
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const renderSpecificationValue = (
    product: ProductComparison,
    specName: string,
  ) => {
    if (specName === "Manufacturer") return product.manufacturer;
    if (specName === "Price") return `$${product.price.toFixed(2)}`;
    if (specName === "Rating") return `${product.rating}/5`;

    const value = product.specifications[specName];

    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-red-500 mx-auto" />
      );
    }

    return value || "-";
  };

  return (
    <div className="w-full bg-background border rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 flex items-center justify-between bg-muted/30">
        <h2 className="text-xl font-semibold">Product Comparison</h2>
        <div>
          <span className="text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            being compared
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>
            Side-by-side comparison of medical products
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Specification</TableHead>
              {products.map((product) => (
                <TableHead
                  key={product.id}
                  className="min-w-[200px] text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-full">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-contain mx-auto rounded-md"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted hover:bg-muted/80"
                        onClick={() => onRemoveProduct(product.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-medium text-sm">{product.name}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {specificationCategories.map((category) => (
              <React.Fragment key={category}>
                <TableRow
                  className="bg-muted/50 cursor-pointer hover:bg-muted"
                  onClick={() => toggleCategory(category)}
                >
                  <TableCell colSpan={products.length + 1} className="py-2">
                    <div className="flex items-center gap-2">
                      {expandedCategories[category] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      <span className="font-semibold">{category}</span>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedCategories[category] &&
                  allSpecifications
                    .filter((spec) => spec.category === category)
                    .map((spec) => (
                      <TableRow key={spec.name}>
                        <TableCell className="font-medium flex items-center gap-1">
                          {spec.name}
                          {spec.description && (
                            <div className="relative group">
                              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-popover text-popover-foreground text-xs rounded shadow-md z-50">
                                {spec.description}
                              </div>
                            </div>
                          )}
                        </TableCell>
                        {products.map((product) => (
                          <TableCell
                            key={`${product.id}-${spec.name}`}
                            className="text-center"
                          >
                            {renderSpecificationValue(product, spec.name)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {products.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">
            No products added to comparison yet.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Use the barcode scanner or search to add products.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;

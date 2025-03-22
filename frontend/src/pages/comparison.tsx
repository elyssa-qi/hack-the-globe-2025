import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ComparisonTable from "@/components/comparison/ComparisonTable";
import ComparisonActions from "@/components/comparison/ComparisonActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

interface ProductComparison {
  id: string;
  name: string;
  manufacturer: string;
  image: string;
  price: number;
  rating: number;
  specifications: Record<string, string | boolean | number>;
}

const ComparisonPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductComparison[]>([
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
  ]);

  // In a real app, you would fetch products based on the IDs in the URL
  useEffect(() => {
    const productIds = searchParams.get("products");
    if (productIds) {
      // Here you would fetch the products with these IDs
      console.log("Products to compare:", productIds.split(","));
    }
  }, [searchParams]);

  const handleRemoveProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));

    // Update URL params
    const currentProducts = searchParams.get("products")?.split(",") || [];
    const updatedProducts = currentProducts.filter((id) => id !== productId);

    if (updatedProducts.length > 0) {
      setSearchParams({ products: updatedProducts.join(",") });
    } else {
      // Remove the parameter if no products left
      searchParams.delete("products");
      setSearchParams(searchParams);
    }
  };

  const handleClearAll = () => {
    setProducts([]);
    searchParams.delete("products");
    setSearchParams(searchParams);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // In a real app, you would generate a CSV or PDF
    alert("Export functionality would generate a CSV or PDF in a real app");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Product Comparison
        </h1>
        <p className="text-muted-foreground">
          Compare medical products side by side to find the best option.
        </p>
      </div>

      <ComparisonActions
        onPrint={handlePrint}
        onExport={handleExport}
        onRemoveItem={handleRemoveProduct}
        onClearAll={handleClearAll}
        comparedItems={products.map((p) => ({ id: p.id, name: p.name }))}
      />

      {products.length > 0 ? (
        <ComparisonTable
          products={products}
          onRemoveProduct={handleRemoveProduct}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Products to Compare</CardTitle>
            <CardDescription>
              Add products to comparison from the product listings or scanner.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <div className="text-center space-y-4">
              <BarChart2 className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">
                Use the barcode scanner or search to find products and add them
                to comparison.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ComparisonPage;

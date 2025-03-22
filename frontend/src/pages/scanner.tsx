import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "@/components/scanner/BarcodeScanner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, BarChart2, Search } from "lucide-react";

const ScannerPage = () => {
  const navigate = useNavigate();
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const [scannedProducts, setScannedProducts] = useState<
    Array<{ code: string; timestamp: Date }>
  >([]);

  const handleScan = (result: string) => {
    setLastScannedCode(result);
    setScannedProducts((prev) => [
      { code: result, timestamp: new Date() },
      ...prev,
    ]);

    // In a real app, you would look up the product in your database
    // and navigate to its details page or show it in the UI
  };

  const handleViewProduct = (code: string) => {
    // In a real app, you would navigate to the product details page
    // For now, we'll just simulate it
    navigate(`/products/${code}`);
  };

  const handleAddToComparison = (code: string) => {
    // In a real app, you would add this to your comparison state
    // For now, we'll just navigate to the comparison page
    navigate(`/comparison?products=${code}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Barcode Scanner</h1>
        <p className="text-muted-foreground">
          Scan medical product barcodes to quickly find information.
        </p>
      </div>

      <div className="flex justify-center">
        <BarcodeScanner onScan={handleScan} width={640} height={480} />
      </div>

      {scannedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Scan History</CardTitle>
            <CardDescription>Recently scanned product codes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scannedProducts.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 p-3 border rounded-md"
                >
                  <div>
                    <p className="font-mono text-sm">{item.code}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex gap-2 self-end sm:self-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleViewProduct(item.code)}
                    >
                      <Search className="h-3.5 w-3.5" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => handleAddToComparison(item.code)}
                    >
                      <BarChart2 className="h-3.5 w-3.5" />
                      Compare
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScannerPage;

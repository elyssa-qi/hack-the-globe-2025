import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Camera, X } from "lucide-react";

interface BarcodeScannerProps {
  onScan?: (result: string) => void;
  width?: number;
  height?: number;
}

export default function BarcodeScanner({
  onScan = () => {},
  width = 640,
  height = 480,
}: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startScanner = async () => {
    setError(null);
    setScanning(true);

    try {
      if (!containerRef.current) return;

      const html5QrCode = new Html5Qrcode("scanner-container");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: width / height,
        },
        (decodedText) => {
          setLastResult(decodedText);
          onScan(decodedText);
        },
        (errorMessage) => {
          // Ignore the QR code not found error
          if (errorMessage.includes("QR code not found")) {
            return;
          }
          console.error(errorMessage);
        },
      );
    } catch (err) {
      setScanning(false);
      setError(err instanceof Error ? err.message : "Failed to start scanner");
      console.error(err);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <Card className="w-full max-w-[640px] bg-white dark:bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Medical Product Scanner</span>
          {scanning && (
            <Button
              variant="ghost"
              size="icon"
              onClick={stopScanner}
              aria-label="Stop scanning"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div
            id="scanner-container"
            ref={containerRef}
            className="relative overflow-hidden rounded-lg bg-black"
            style={{
              width: `${width}px`,
              height: `${height}px`,
              maxWidth: "100%",
            }}
          >
            {!scanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <Camera className="h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Camera inactive
                </p>
                <Button onClick={startScanner} className="gap-2">
                  <Camera className="h-4 w-4" />
                  Start Scanner
                </Button>
              </div>
            )}

            {scanning && !scannerRef.current && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </div>

          {lastResult && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm font-medium">Last scanned code:</p>
              <p className="font-mono text-xs break-all">{lastResult}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

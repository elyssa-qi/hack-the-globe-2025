import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search/SearchBar";
import ProductGrid from "@/components/products/ProductGrid";
import BarcodeScanner from "@/components/scanner/BarcodeScanner";
import {
  BarChart2,
  Camera,
  Search,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const DashboardContent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (result: string) => {
    console.log("Scanned code:", result);
    // In a real app, you would look up the product in your database
    // and navigate to its details page or show it in the UI
    alert(`Product scanned: ${result}`);
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToComparison = (productId: string) => {
    // In a real app, you would add this to your comparison state
    // For now, we'll just navigate to the comparison page
    navigate(`/comparison?products=${productId}`);
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // In a real app, you would filter products based on the query
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and explore medical products.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={showScanner ? "default" : "outline"}
            className="gap-2"
            onClick={() => setShowScanner(!showScanner)}
          >
            <Camera className="h-4 w-4" />
            {showScanner ? "Hide Scanner" : "Scan Product"}
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => navigate("/comparison")}
          >
            <BarChart2 className="h-4 w-4" />
            Compare
          </Button>
        </div>
      </div>

      {showScanner && (
        <div className="flex justify-center mb-6">
          <BarcodeScanner onScan={handleScan} width={480} height={320} />
        </div>
      )}

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics" className="hidden md:block">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="customers" className="hidden md:block">
            Customers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Orders
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324</div>
                <p className="text-xs text-muted-foreground">
                  +4% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">
                  +18% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +7% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>
                Browse our latest medical products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductGrid
                onViewDetails={handleViewDetails}
                onAddToComparison={handleAddToComparison}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Products</CardTitle>
              <CardDescription>
                Browse and manage all medical products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductGrid
                onViewDetails={handleViewDetails}
                onAddToComparison={handleAddToComparison}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Order management coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View detailed analytics and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Analytics dashboard coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>
                Manage customer accounts and information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Customer management coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardContent;

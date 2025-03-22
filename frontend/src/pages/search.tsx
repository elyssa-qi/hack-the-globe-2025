import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/search/SearchBar";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would fetch products based on the query
  };

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
    // In a real app, you would filter products based on these filters
  };

  const handleViewDetails = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToComparison = (productId: string) => {
    navigate(`/comparison?products=${productId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Button variant="ghost" className="gap-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Search Products</h1>
        <p className="text-muted-foreground">
          Find and compare medical products and supplies.
        </p>
      </div>

      <div className="mb-6">
        <SearchBar
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div>
        {searchQuery && (
          <h2 className="text-xl font-semibold mb-4">
            Search results for "{searchQuery}"
          </h2>
        )}

        <ProductGrid
          onViewDetails={handleViewDetails}
          onAddToComparison={handleAddToComparison}
        />
      </div>
    </div>
  );
};

export default SearchPage;

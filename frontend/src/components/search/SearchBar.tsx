import React, { useState } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: string[]) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  onSearch = () => {},
  onFilterChange = () => {},
  placeholder = "Search for medical products, medications, or supplies...",
  className,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Mock suggestions for autocomplete
  const suggestions = [
    "Surgical Masks",
    "Stethoscope",
    "Blood Pressure Monitor",
    "Insulin Syringes",
    "Nitrile Gloves",
    "Pulse Oximeter",
  ];

  // Mock categories for filtering
  const categories = [
    { id: "equipment", label: "Medical Equipment" },
    { id: "supplies", label: "Medical Supplies" },
    { id: "medications", label: "Medications" },
    { id: "diagnostic", label: "Diagnostic Tools" },
    { id: "ppe", label: "Personal Protective Equipment" },
  ];

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.length > 0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleFilterToggle = (categoryId: string) => {
    setSelectedFilters((prev) => {
      const newFilters = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    onSearch("");
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto bg-background", className)}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>

            <Input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-10 h-12 w-full rounded-lg border-input focus:border-primary"
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="h-12 gap-2 px-4"
              >
                <Filter className="h-5 w-5" />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.id}
                  checked={selectedFilters.includes(category.id)}
                  onCheckedChange={() => handleFilterToggle(category.id)}
                >
                  {category.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button type="submit" className="h-12">
            Search
          </Button>
        </div>

        {/* Autocomplete suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-background border border-input rounded-md shadow-lg">
            <ul className="py-1 max-h-60 overflow-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-accent cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      {/* Selected filters display */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedFilters.map((filterId) => {
            const category = categories.find((c) => c.id === filterId);
            return (
              <div
                key={filterId}
                className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-sm"
              >
                <span>{category?.label}</span>
                <button
                  type="button"
                  onClick={() => handleFilterToggle(filterId)}
                  className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setSelectedFilters([]);
              onFilterChange([]);
            }}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

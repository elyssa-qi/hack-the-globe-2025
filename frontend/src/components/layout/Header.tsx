import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoonStar,
  Sun,
  Menu,
  User,
  Settings,
  LogOut,
  BarChart2,
  Camera,
} from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header = ({ onToggleSidebar = () => {} }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full h-16 border-b bg-background flex items-center px-4 sticky top-0 z-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground rounded-md p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              MediScan
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/scanner">
            <Button variant="outline" size="sm" className="gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Scanner</span>
            </Button>
          </Link>

          <Link to="/comparison">
            <Button variant="outline" size="sm" className="gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Compare</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <MoonStar className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

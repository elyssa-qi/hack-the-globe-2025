import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  BarChart2,
  Camera,
  ShoppingCart,
  Heart,
  Settings,
  HelpCircle,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/",
    },
    {
      title: "Search Products",
      icon: <Search className="h-5 w-5" />,
      href: "/search",
    },
    {
      title: "Barcode Scanner",
      icon: <Camera className="h-5 w-5" />,
      href: "/scanner",
    },
    {
      title: "Compare Products",
      icon: <BarChart2 className="h-5 w-5" />,
      href: "/comparison",
    },
    {
      title: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/orders",
    },
    {
      title: "Favorites",
      icon: <Heart className="h-5 w-5" />,
      href: "/favorites",
    },
  ];

  const bottomNavItems = [
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
    },
    {
      title: "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
      href: "/help",
    },
  ];

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-card border-r w-64 py-4 px-2",
        className,
      )}
    >
      <div className="px-3 mb-6 mt-2">
        <h2 className="text-lg font-semibold">Medical Dashboard</h2>
        <p className="text-sm text-muted-foreground">Manage medical products</p>
      </div>

      <nav className="space-y-1 px-2 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              location.pathname === item.href
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t space-y-1 px-2">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              location.pathname === item.href
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

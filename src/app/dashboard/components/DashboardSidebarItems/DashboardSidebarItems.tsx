// components/DashboardSidebarItems.tsx
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href?: string;
  children?: NavItem[];
}

interface Props {
  navItems: NavItem[];
  pathname: string;
  openDropdowns: Record<string, boolean>;
  toggleDropdown: (key: string) => void;
  onLinkClick?: () => void; // optional for mobile auto-close
}

export function DashboardSidebarItems({
  navItems,
  pathname,
  openDropdowns,
  toggleDropdown,
  onLinkClick,
}: Props) {
  return (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const isActiveParent = item.children?.some(
          (child) => pathname === child.href
        );
        const isOpen = openDropdowns[item.name] ?? isActiveParent;

        if (item.children) {
          return (
            <div key={item.name}>
              <button
                onClick={() => toggleDropdown(item.name)}
                className={cn(
                  "w-full text-left flex justify-between items-center px-3 py-2 rounded hover:bg-gray-200 hover:text-black",
                  isActiveParent
                    ? "bg-gray-300 font-medium text-black"
                    : "text-white"
                )}
              >
                <span>{item.name}</span>
                {isOpen ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
              </button>
              {isOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href!}
                      onClick={onLinkClick}
                      className={cn(
                        "px-3 py-1 rounded text-md hover:bg-gray-200 hover:text-black",
                        pathname === child.href
                          ? "bg-gray-300 font-medium text-black"
                          : "text-white"
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href!}
            onClick={onLinkClick}
            className={cn(
              "px-3 py-2 rounded hover:bg-gray-200 hover:text-black",
              pathname === item.href
                ? "bg-gray-300 font-medium text-black"
                : "text-white"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

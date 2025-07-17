
import { 
  Package, 
  Warehouse, 
  Building2, 
  TrendingUp, 
  FileText, 
  AlertTriangle,
  Users,
  Settings,
  BarChart3,
  ArrowRightLeft
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
    group: "main"
  },
  {
    title: "Master Barang",
    url: "/items",
    icon: Package,
    group: "inventory"
  },
  {
    title: "Gudang",
    url: "/warehouse",
    icon: Warehouse,
    group: "inventory"
  },
  {
    title: "Unit Layanan",
    url: "/units",
    icon: Building2,
    group: "inventory"
  },
  {
    title: "Distribusi",
    url: "/distribution",
    icon: ArrowRightLeft,
    group: "operations"
  },
  {
    title: "Stok & Saldo",
    url: "/stock",
    icon: TrendingUp,
    group: "operations"
  },
  {
    title: "Laporan LPLPO",
    url: "/reports",
    icon: FileText,
    group: "reports"
  },
  {
    title: "Alert Kadaluarsa",
    url: "/alerts",
    icon: AlertTriangle,
    group: "reports"
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
    group: "admin"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    group: "admin"
  }
];

const groupLabels = {
  main: "Dashboard",
  inventory: "Manajemen Barang",
  operations: "Operasional",
  reports: "Laporan",
  admin: "Administrasi"
};

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClassName = (path: string) => {
    return isActive(path) 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-gray-100 text-gray-700";
  };

  const groupedItems = navigationItems.reduce((groups, item) => {
    const group = item.group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, typeof navigationItems>);

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarContent className="pt-4">
        {Object.entries(groupedItems).map(([groupKey, items]) => (
          <SidebarGroup key={groupKey}>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
              {groupLabels[groupKey as keyof typeof groupLabels]}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={`flex items-center px-3 py-2 text-sm transition-colors ${getNavClassName(item.url)}`}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

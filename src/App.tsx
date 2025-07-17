
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { MasterBarang } from "./components/MasterBarang";
import { Gudang } from "./components/Gudang";
import { UnitLayanan } from "./components/UnitLayanan";
import { Distribusi } from "./components/Distribusi";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/items" element={<MasterBarang />} />
            <Route path="/warehouse" element={<Gudang />} />
            <Route path="/units" element={<UnitLayanan />} />
            <Route path="/distribution" element={<Distribusi />} />
            <Route path="/stock" element={<div className="p-4">Stok & Saldo - Coming Soon</div>} />
            <Route path="/reports" element={<div className="p-4">Laporan LPLPO - Coming Soon</div>} />
            <Route path="/alerts" element={<div className="p-4">Alert Kadaluarsa - Coming Soon</div>} />
            <Route path="/users" element={<div className="p-4">Users - Coming Soon</div>} />
            <Route path="/settings" element={<div className="p-4">Settings - Coming Soon</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

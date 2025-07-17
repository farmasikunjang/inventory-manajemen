
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
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
            <Route path="/items" element={<div className="p-4">Master Barang - Coming Soon</div>} />
            <Route path="/warehouse" element={<div className="p-4">Gudang - Coming Soon</div>} />
            <Route path="/units" element={<div className="p-4">Unit Layanan - Coming Soon</div>} />
            <Route path="/distribution" element={<div className="p-4">Distribusi - Coming Soon</div>} />
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


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
import { StokSaldo } from "./components/StokSaldo";
import { LaporanLPLPO } from "./components/LaporanLPLPO";
import { AlertKadaluarsa } from "./components/AlertKadaluarsa";
import { Users } from "./components/Users";
import { Settings } from "./components/Settings";
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
            <Route path="/stock" element={<StokSaldo />} />
            <Route path="/reports" element={<LaporanLPLPO />} />
            <Route path="/alerts" element={<AlertKadaluarsa />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

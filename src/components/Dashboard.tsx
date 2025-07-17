
import { DashboardCard } from "./DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  TrendingDown, 
  AlertTriangle, 
  ArrowRightLeft,
  Calendar,
  Eye,
  Download
} from "lucide-react";

// Mock data - in real app this would come from your API
const dashboardData = {
  totalItems: 1247,
  lowStockItems: 23,
  expiringSoon: 8,
  todayDistributions: 12,
  recentAlerts: [
    { id: 1, item: "Paracetamol 500mg", unit: "Poli Umum", type: "low_stock", quantity: 15 },
    { id: 2, item: "Amoxicillin 250mg", unit: "IGD", type: "expiring", expiryDate: "2024-08-15" },
    { id: 3, item: "Vitamin B Complex", unit: "Poli Anak", type: "low_stock", quantity: 8 }
  ],
  recentDistributions: [
    { id: 1, item: "Paracetamol 500mg", fromUnit: "Gudang Utama", toUnit: "Poli Umum", quantity: 100, date: "2024-07-17" },
    { id: 2, item: "Salbutamol Inhaler", fromUnit: "Gudang Utama", toUnit: "IGD", quantity: 25, date: "2024-07-17" },
    { id: 3, item: "ORS Sachet", fromUnit: "Gudang Utama", toUnit: "Poli Anak", quantity: 200, date: "2024-07-16" }
  ]
};

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Ringkasan inventory dan aktivitas hari ini</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Generate LPLPO
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Barang"
          value={dashboardData.totalItems.toLocaleString()}
          description="Item dalam database"
          icon={Package}
          className="bg-blue-50 border-blue-200"
        />
        <DashboardCard
          title="Stok Menipis"
          value={dashboardData.lowStockItems}
          description="Perlu restock segera"
          icon={TrendingDown}
          className="bg-yellow-50 border-yellow-200"
        />
        <DashboardCard
          title="Akan Kadaluarsa"
          value={dashboardData.expiringSoon}
          description="< 90 hari"
          icon={AlertTriangle}
          className="bg-red-50 border-red-200"
        />
        <DashboardCard
          title="Distribusi Hari Ini"
          value={dashboardData.todayDistributions}
          description="Transaksi distribusi"
          icon={ArrowRightLeft}
          className="bg-green-50 border-green-200"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Alert Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.item}</p>
                    <p className="text-xs text-gray-600">{alert.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {alert.type === 'low_stock' ? (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Stok: {alert.quantity}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        Exp: {alert.expiryDate}
                      </Badge>
                    )}
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Lihat Semua Alert
            </Button>
          </CardContent>
        </Card>

        {/* Recent Distributions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-blue-600" />
              Distribusi Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.recentDistributions.map((dist) => (
                <div key={dist.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{dist.item}</p>
                    <p className="text-xs text-gray-600">
                      {dist.fromUnit} → {dist.toUnit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{dist.quantity} unit</p>
                    <p className="text-xs text-gray-500">{dist.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Lihat Riwayat Distribusi
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

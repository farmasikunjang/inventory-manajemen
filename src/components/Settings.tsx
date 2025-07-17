import { useState } from "react";
import { Settings as SettingsIcon, Building2, Bell, Shield, Database, Mail, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface SettingsData {
  // Tenant Information
  tenant_name: string;
  tenant_code: string;
  address: string;
  phone: string;
  email: string;
  
  // Notification Settings
  email_notifications: boolean;
  expired_alert_days: number;
  low_stock_threshold: number;
  auto_lplpo: boolean;
  
  // System Settings
  timezone: string;
  date_format: string;
  currency: string;
  
  // Security Settings
  session_timeout: number;
  password_policy: boolean;
  two_factor_auth: boolean;
  
  // Backup Settings
  auto_backup: boolean;
  backup_frequency: string;
}

const mockSettings: SettingsData = {
  tenant_name: "PUSKESMAS DEMO",
  tenant_code: "PKM001",
  address: "Jl. Kesehatan No. 123, Jakarta Pusat",
  phone: "021-12345678",
  email: "admin@puskesmasdemo.go.id",
  
  email_notifications: true,
  expired_alert_days: 90,
  low_stock_threshold: 10,
  auto_lplpo: true,
  
  timezone: "Asia/Jakarta",
  date_format: "DD/MM/YYYY",
  currency: "IDR",
  
  session_timeout: 60,
  password_policy: true,
  two_factor_auth: false,
  
  auto_backup: true,
  backup_frequency: "daily"
};

export function Settings() {
  const [settings, setSettings] = useState<SettingsData>(mockSettings);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Berhasil",
        description: "Pengaturan berhasil disimpan"
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: keyof SettingsData, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pengaturan Sistem</h1>
          <p className="text-muted-foreground">Konfigurasi sistem inventory puskesmas</p>
        </div>
        <Button onClick={handleSave} disabled={isLoading} className="gap-2">
          <Save className="h-4 w-4" />
          {isLoading ? "Menyimpan..." : "Simpan Pengaturan"}
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Tenant Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Informasi Puskesmas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tenant_name">Nama Puskesmas</Label>
                <Input
                  id="tenant_name"
                  value={settings.tenant_name}
                  onChange={(e) => handleInputChange('tenant_name', e.target.value)}
                  placeholder="Nama puskesmas"
                />
              </div>
              <div>
                <Label htmlFor="tenant_code">Kode Puskesmas</Label>
                <Input
                  id="tenant_code"
                  value={settings.tenant_code}
                  onChange={(e) => handleInputChange('tenant_code', e.target.value)}
                  placeholder="Kode puskesmas"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Alamat lengkap puskesmas"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Nomor telepon"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email puskesmas"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Pengaturan Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notifikasi Email</Label>
                <p className="text-sm text-muted-foreground">
                  Kirim notifikasi melalui email untuk alert penting
                </p>
              </div>
              <Switch
                checked={settings.email_notifications}
                onCheckedChange={(checked) => handleInputChange('email_notifications', checked)}
              />
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expired_alert_days">Alert Kadaluarsa (hari)</Label>
                <Input
                  id="expired_alert_days"
                  type="number"
                  value={settings.expired_alert_days}
                  onChange={(e) => handleInputChange('expired_alert_days', parseInt(e.target.value))}
                  placeholder="90"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Berapa hari sebelum kadaluarsa untuk menampilkan alert
                </p>
              </div>
              <div>
                <Label htmlFor="low_stock_threshold">Batas Stok Rendah (%)</Label>
                <Input
                  id="low_stock_threshold"
                  type="number"
                  value={settings.low_stock_threshold}
                  onChange={(e) => handleInputChange('low_stock_threshold', parseInt(e.target.value))}
                  placeholder="10"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Persentase dari stok minimum untuk alert stok rendah
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Generate LPLPO</Label>
                <p className="text-sm text-muted-foreground">
                  Otomatis generate laporan LPLPO setiap akhir bulan
                </p>
              </div>
              <Switch
                checked={settings.auto_lplpo}
                onCheckedChange={(checked) => handleInputChange('auto_lplpo', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Pengaturan Sistem
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="timezone">Zona Waktu</Label>
                <Select value={settings.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih zona waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Jakarta">WIB (Jakarta)</SelectItem>
                    <SelectItem value="Asia/Makassar">WITA (Makassar)</SelectItem>
                    <SelectItem value="Asia/Jayapura">WIT (Jayapura)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date_format">Format Tanggal</Label>
                <Select value={settings.date_format} onValueChange={(value) => handleInputChange('date_format', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih format tanggal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currency">Mata Uang</Label>
                <Select value={settings.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mata uang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IDR">IDR (Rupiah)</SelectItem>
                    <SelectItem value="USD">USD (Dollar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Pengaturan Keamanan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="session_timeout">Session Timeout (menit)</Label>
              <Input
                id="session_timeout"
                type="number"
                value={settings.session_timeout}
                onChange={(e) => handleInputChange('session_timeout', parseInt(e.target.value))}
                placeholder="60"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Durasi session sebelum user otomatis logout
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Kebijakan Password Kuat</Label>
                <p className="text-sm text-muted-foreground">
                  Wajibkan password minimal 8 karakter dengan kombinasi huruf, angka, dan simbol
                </p>
              </div>
              <Switch
                checked={settings.password_policy}
                onCheckedChange={(checked) => handleInputChange('password_policy', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan autentikasi dua faktor untuk keamanan tambahan
                </p>
              </div>
              <Switch
                checked={settings.two_factor_auth}
                onCheckedChange={(checked) => handleInputChange('two_factor_auth', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Backup Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Pengaturan Backup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Otomatis backup data sistem secara berkala
                </p>
              </div>
              <Switch
                checked={settings.auto_backup}
                onCheckedChange={(checked) => handleInputChange('auto_backup', checked)}
              />
            </div>
            {settings.auto_backup && (
              <div>
                <Label htmlFor="backup_frequency">Frekuensi Backup</Label>
                <Select value={settings.backup_frequency} onValueChange={(value) => handleInputChange('backup_frequency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih frekuensi backup" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Harian</SelectItem>
                    <SelectItem value="weekly">Mingguan</SelectItem>
                    <SelectItem value="monthly">Bulanan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
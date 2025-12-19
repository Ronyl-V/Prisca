"use client"
import { useState } from "react";
import { ForecastChart } from "@/components/ForecastCharts";
import { ForecastTable } from "@/components/ForecastTable";
import { TrendIndicator } from "@/components/TrendIndicator";
import { ProductSelector } from "@/components/ProductSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, BarChart3, Info } from "lucide-react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import TopMenuOverlay from "@/components/TopMenuOverlay";

// Sample data - In production, this would come from an API
const products = [
  { id: "riz", name: "Riz", category: "Céréales" },
  { id: "mais", name: "Maïs", category: "Céréales" },
  { id: "ananas", name: "Ananas", category: "Fruits" },
  { id: "manioc", name: "Manioc", category: "Tubercules" },
  { id: "patate", name: "Patate", category: "Tubercules" },
  { id: "papaye", name: "Papaye", category: "Fruits" },
];

const generateChartData = (productId: string) => {
  const basePrice = productId === "riz" ? 1200 : productId === "mais" ? 600 : productId === "ananas" ? 500 : productId === "manioc" ? 2300 : productId === "papaye" ? 600 : productId === "patate" ? 700 : 200 ;
  const data = [];
  
  // Historical data (last 30 days)
  for (let i = 30; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = Math.sin(i / 5) * 30 + (Math.random() - 0.5) * 20;
    data.push({
      date: date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
      actual: Math.round(basePrice + variation),
    });
  }
  
  // Today
  data.push({
    date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
    actual: Math.round(basePrice + 15),
    predicted: Math.round(basePrice + 15),
  });
  
  // Predicted data (next 30 days)
  const trend = productId === "mais" ? 1.5 : productId === "plantain" ? -0.8 : 0.3;
  for (let i = 1; i <= 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const variation = Math.sin(i / 5) * 25 + trend * i + (Math.random() - 0.5) * 15;
    data.push({
      date: date.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
      predicted: Math.round(basePrice + 15 + variation),
    });
  }
  
  return data;
};

const generateTableData = (productId: string) => {
  const basePrice = productId === "riz" ? 1200 : productId === "mais" ? 600 : productId === "ananas" ? 500 : productId === "manioc" ? 2300 : productId === "papaye" ? 600 : productId === "patate" ? 700 : 200 ;
  const trend = productId === "mais" ? 1.2 : productId === "patate" ? -0.6 : 0.2;
  
  return [
    { date: "Demain", estimatedPrice: Math.round(basePrice + trend * 2), variation: trend * 0.5, confidence: "high" as const },
    { date: "Dans 3 jours", estimatedPrice: Math.round(basePrice + trend * 6), variation: trend * 1.5, confidence: "high" as const },
    { date: "Dans 1 semaine", estimatedPrice: Math.round(basePrice + trend * 14), variation: trend * 3, confidence: "medium" as const },
    { date: "Dans 2 semaines", estimatedPrice: Math.round(basePrice + trend * 28), variation: trend * 5.5, confidence: "medium" as const },
    { date: "Dans 1 mois", estimatedPrice: Math.round(basePrice + trend * 60), variation: trend * 10, confidence: "low" as const },
    { date: "Dans 2 mois", estimatedPrice: Math.round(basePrice + trend * 120), variation: trend * 18, confidence: "low" as const },
  ];
};

const trendIndicators = [
  { product: "Maïs", currentPrice: 595, predictedPrice: 615, trend: "up" as const, percentChange: 15.0, timeframe: "7 jours" },
  { product: "Patate Douce", currentPrice: 500, predictedPrice: 700, trend: "up" as const, percentChange: 12.0, timeframe: "5 jours" },
  { product: "Riz", currentPrice: 1200, predictedPrice: 1250, trend: "up" as const, percentChange: 5.0, timeframe: "14 jours" },
  { product: "Manioc", currentPrice: 1800, predictedPrice: 2200, trend: "up" as const, percentChange: 14.0, timeframe: "10 jours" },
];

export default function Agriculteur() {
  const [selectedProduct, setSelectedProduct] = useState("riz");
  const [activeTab, setActiveTab] = useState("overview");
  
  const selectedProductData = products.find(p => p.id === selectedProduct);
  const chartData = generateChartData(selectedProduct);
  const tableData = generateTableData(selectedProduct);
  


  return (
    <div className="min-h-screen bg-wwhite mt-20">
      {/* Header */}
      <NavBar />
        <TopMenuOverlay />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Title & Description */}
        <div className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-black flex items-center gap-2">
                Espace Agriculteur
              </h2>
              <p className="text-gray-700 mt-1">
                Anticipez les marchés et optimisez vos récoltes
              </p>
            </div>
            <ProductSelector
              products={products}
              selectedProduct={selectedProduct}
              onProductChange={setSelectedProduct}
            />
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <BarChart3 className="w-4 h-4" />
              Vue d'ensemble
            </TabsTrigger>
            <TabsTrigger value="details" className="gap-2 data-[state=active]:bg-card data-[state=active]:shadow-sm">
              <Info className="w-4 h-4" />
              Détails
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Trend Indicators Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendIndicators.map((indicator, index) => (
                <div 
                  key={indicator.product} 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TrendIndicator {...indicator} />
                </div>
              ))}
            </div>

            {/* Main Chart */}
            <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
              <ForecastChart
                data={chartData}
                productName={selectedProductData?.name || ""}
              />
            </div>

          </TabsContent>

          <TabsContent value="details" className="mt-6 space-y-6">
            {/* Forecast Chart */}
            <ForecastChart
              data={chartData}
              productName={selectedProductData?.name || ""}
            />
            
            {/* Forecast Table */}
            <ForecastTable
              data={tableData}
              productName={selectedProductData?.name || ""}
            />
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

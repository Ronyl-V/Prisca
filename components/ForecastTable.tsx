import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Minus} from "lucide-react";

interface ForecastItem {
  date: string;
  estimatedPrice: number;
  variation: number;
  confidence: "high" | "medium" | "low";
}

interface ForecastTableProps {
  data: ForecastItem[];
  productName: string;
}

const getVariationColor = (variation: number) => {
  if (variation > 5) return "text-destructive";
  if (variation < -5) return "text-green-500";
  if (variation > 0) return "text-chart-4";
  if (variation < 0) return "text-green-700";
  return "text-muted-foreground";
};

const getVariationIcon = (variation: number) => {
  if (variation > 0) return <TrendingUp className="w-4 h-4" />;
  if (variation < 0) return <TrendingDown className="w-4 h-4" />;
  return <Minus className="w-4 h-4" />;
};


export function ForecastTable({ data, productName }: ForecastTableProps) {
  return (
    <Card className="border-0 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="font-display text-xl text-foreground flex items-center gap-2">
          Tableau des Prévisions - {productName}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-display font-semibold text-foreground">Date</TableHead>
                <TableHead className="font-display font-semibold text-foreground">Prix Estimé</TableHead>
                <TableHead className="font-display font-semibold text-foreground">Variation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow 
                  key={index} 
                  className="transition-colors hover:bg-primary/5"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium">{item.date}</TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {item.estimatedPrice.toLocaleString()} FCFA
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1.5 font-medium ${getVariationColor(item.variation)}`}>
                      {getVariationIcon(item.variation)}
                      <span>{item.variation > 0 ? "+" : ""}{item.variation.toFixed(1)}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

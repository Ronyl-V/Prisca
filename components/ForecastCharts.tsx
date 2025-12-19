import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ForecastDataPoint {
  date: string;
  actual?: number;
  predicted?: number;
  confidence?: { low: number; high: number };
}

interface ForecastChartProps {
  data: ForecastDataPoint[];
  productName: string;
  unit?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 shadow-lg">
        <p className="font-display font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">
              {entry.name === "actual" ? "Prix réel" : "Prévision"}:
            </span>
            <span className="font-semibold text-foreground">
              {entry.value?.toLocaleString()} FCFA
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


export function ForecastChart({ data, productName, unit = "FCFA/kg" }: ForecastChartProps) {
  // Find the index where prediction starts
  const predictionStartIndex = data.findIndex(d => d.predicted !== undefined && d.actual === undefined);
  const todayDate = predictionStartIndex > 0 ? data[predictionStartIndex - 1]?.date : data[0]?.date;

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-display text-xl text-foreground">
              Prévision des Prix - {productName}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Évolution sur les 3 prochains mois
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-actual))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-actual))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-predicted))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-predicted))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--chart-grid))"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Reference line for today */}
              {todayDate && (
                <ReferenceLine
                  x={todayDate}
                  stroke="hsl(var(--primary))"
                  strokeDasharray="5 5"
                  label={{
                    value: "Aujourd'hui",
                    position: "top",
                    fill: "hsl(var(--primary))",
                    fontSize: 12,
                  }}
                />
              )}

              {/* Actual prices area and line */}
              <Area
                type="monotone"
                dataKey="actual"
                stroke="none"
                fill="url(#actualGradient)"
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="actual"
                stroke="hsl(var(--chart-actual))"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "hsl(var(--chart-actual))" }}
              />

              {/* Predicted prices area and line */}
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="none"
                fill="url(#predictedGradient)"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                name="predicted"
                stroke="hsl(var(--chart-predicted))"
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={false}
                activeDot={{ r: 6, fill: "hsl(var(--chart-predicted))" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 rounded-full bg-chart-2" />
            <span className="text-sm text-muted-foreground">Prix réels</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 rounded-full bg-chart-4" style={{ backgroundImage: "repeating-linear-gradient(90deg, hsl(var(--chart-predicted)) 0px, hsl(var(--chart-predicted)) 8px, transparent 8px, transparent 12px)" }} />
            <span className="text-sm text-muted-foreground">Prévisions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

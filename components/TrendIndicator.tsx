import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendIndicatorProps {
  product: string;
  currentPrice: number;
  predictedPrice: number;
  trend: "up" | "down" | "stable";
  percentChange: number;
  timeframe: string;
}

const getTrendConfig = (trend: "up" | "down" | "stable") => {
  switch (trend) {
    case "up":
      return {
        label: "Hausse prévue",
        bgClass: "bg-gradient-to-br from-red-400/10 to-red-500/10",
        borderClass: "border-red-400/10",
        iconClass: "text-red-400",
        Icon: TrendingUp,
        ArrowIcon: ArrowUp,
      };
    case "down":
      return {
        label: "Baisse prévue",
        bgClass: "bg-gradient-to-br from-green-400/10 to-green-100",
        borderClass: "border-green-400/10",
        iconClass: "text-green-400",
        Icon: TrendingDown,
        ArrowIcon: ArrowDown,
      };
    default:
      return {
        label: "Prix stable",
        bgClass: "bg-gradient-to-br from-muted to-secondary",
        borderClass: "border-white/10",
        iconClass: "text-muted-foreground",
        Icon: Minus,
        ArrowIcon: Minus,
      };
  }
};

export function TrendIndicator({
  product,
  currentPrice,
  predictedPrice,
  trend,
  percentChange,
  timeframe,
}: TrendIndicatorProps) {
  const config = getTrendConfig(trend);
  const { Icon, ArrowIcon } = config;

  return (
    <Card className={cn("border overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]", config.bgClass, config.borderClass)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-foreground mt-1">{product}</h3>
          </div>
          <div className={cn("p-2 rounded-full", config.bgClass)}>
            <Icon className={cn("w-6 h-6", config.iconClass)} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Prix actuel</p>
              <p className="font-display font-bold text-xl text-foreground">
                {currentPrice.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">FCFA</span>
              </p>
            </div>
            <ArrowIcon className={cn("w-5 h-5 mx-2", config.iconClass)} />
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Prévu</p>
              <p className="font-display font-bold text-xl text-foreground">
                {predictedPrice.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">FCFA</span>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <span className={cn("font-semibold text-sm flex items-center gap-1", config.iconClass)}>
              {trend !== "stable" && (percentChange > 0 ? "+" : "")}
              {percentChange.toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground">{timeframe}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

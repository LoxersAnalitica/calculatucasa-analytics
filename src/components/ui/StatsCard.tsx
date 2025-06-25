import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend,
  trendLabel,
  description,
  icon,
  className
}) => {
  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-400';
    if (trend < 0) return 'text-red-400';
    return 'text-slate-400';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="h-3 w-3" />;
    if (trend < 0) return <TrendingDown className="h-3 w-3" />;
    return null;
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-slate-700 bg-slate-800/50",
      className
    )}>
      <CardContent className="p-4 md:p-6">
        {/* Header con título e icono */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs md:text-sm font-medium text-slate-400 uppercase tracking-wide">
            {title}
          </h3>
          {icon && (
            <div className="text-amber-400 opacity-80">
              {icon}
            </div>
          )}
        </div>

        {/* Valor principal */}
        <div className="mb-2">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white truncate">
            {value}
          </p>
        </div>

        {/* Trend y descripción */}
        <div className="space-y-1">
          {trend !== undefined && (
            <div className="flex items-center space-x-1">
              {getTrendIcon(trend)}
              <span className={cn("text-xs md:text-sm font-semibold", getTrendColor(trend))}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              {trendLabel && (
                <span className="text-xs text-slate-500 truncate">
                  {trendLabel}
                </span>
              )}
            </div>
          )}
          
          {description && (
            <p className="text-xs text-slate-400 truncate">
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

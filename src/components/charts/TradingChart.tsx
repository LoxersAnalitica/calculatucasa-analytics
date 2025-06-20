
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line } from 'recharts';
import { formatEuro } from '@/utils/formatters';

interface TradingChartProps {
  data: Array<{ trimestre: string; valor: number }>;
}

export const TradingChart: React.FC<TradingChartProps> = ({ data }) => {
  return (
    <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-emerald-400" />
          Evolución Precio €/m² - Trading View
        </CardTitle>
        <CardDescription className="text-slate-400">
          Análisis técnico últimos 8 trimestres - Salamanca District
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="trimestre" 
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              tickFormatter={(value) => `${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#f9fafb'
              }}
              formatter={(value) => [`${formatEuro(value as number)}`, 'Precio €/m²']}
            />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="#10b981"
              strokeWidth={3}
              fill="url(#priceGradient)"
            />
            <Line
              type="monotone"
              dataKey="valor"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#10b981' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

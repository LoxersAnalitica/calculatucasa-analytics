
import React, { useMemo, useState } from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TradingChart } from '@/components/charts/TradingChart';
import { 
  DollarSign, 
  Home, 
  Building, 
  Target, 
  Eye, 
  Clock,
  TrendingUp,
  TrendingDown 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  LineChart,
  Line 
} from 'recharts';
import { formatEuro, formatNumber, trendArrow } from '@/utils/formatters';

interface OverviewSectionProps {
  baseData: any;
  historico: any;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ baseData, historico }) => {
  const [timeframe, setTimeframe] = useState<'1y' | '2y' | '5y' | 'all'>('2y');
  
  const priceTrend = trendArrow(7120, 7200);
  const stockTrend = trendArrow(1175, 1167);
  const leadsTrend = trendArrow(9.0, 9.2);

  // Generar datos históricos más extensos
  const generateExtendedData = () => {
    const quarters = [];
    const startYear = 2015;
    const endYear = 2025;
    
    for (let year = startYear; year <= endYear; year++) {
      for (let q = 1; q <= 4; q++) {
        if (year === 2025 && q > 1) break; // Solo Q1-2025
        
        const basePrice = 5500;
        const growth = Math.pow(1.02, (year - startYear) * 4 + q - 1);
        const noise = (Math.random() - 0.5) * 200;
        
        quarters.push({
          trimestre: `Q${q}-${year}`,
          valor: Math.round(basePrice * growth + noise),
          year,
          quarter: q
        });
      }
    }
    return quarters;
  };

  const allHistoricalData = useMemo(() => generateExtendedData(), []);
  
  const getFilteredData = () => {
    const now = { year: 2025, quarter: 1 };
    let startYear = 2015;
    let startQuarter = 1;
    
    switch (timeframe) {
      case '1y':
        startYear = 2024;
        startQuarter = 1;
        break;
      case '2y':
        startYear = 2023;
        startQuarter = 1;
        break;
      case '5y':
        startYear = 2020;
        startQuarter = 1;
        break;
      case 'all':
      default:
        startYear = 2015;
        startQuarter = 1;
    }
    
    return allHistoricalData.filter(item => 
      item.year > startYear || (item.year === startYear && item.quarter >= startQuarter)
    );
  };

  const filteredPriceData = getFilteredData();
  
  // Cálculo de variación vs 2007 (precrisis)
  const precio2007 = 6800; // Precio estimado en 2007
  const variacionVs2007 = ((baseData.precio_m2 - precio2007) / precio2007) * 100;

  const stockLeadsData = historico.stock.map((item: any, index: number) => ({
    trimestre: item.trimestre,
    stock: item.valor,
    leads: historico.leads_por_anuncio[index]?.valor || 0
  }));

  const leadsHistorico = [
    { trimestre: 'Q2-2023', leads: 8.2 },
    { trimestre: 'Q3-2023', leads: 8.5 },
    { trimestre: 'Q4-2023', leads: 8.8 },
    { trimestre: 'Q1-2024', leads: 9.1 },
    { trimestre: 'Q2-2024', leads: 8.9 },
    { trimestre: 'Q3-2024', leads: 9.3 },
    { trimestre: 'Q4-2024', leads: 9.0 },
    { trimestre: 'Q1-2025', leads: 9.2 }
  ];

  const radarData = [
    { subject: 'Liquidez', A: baseData.liquidez_mercado, fullMark: 10 },
    { subject: 'Demanda', A: 9.1, fullMark: 10 },
    { subject: 'Velocidad', A: 8.5, fullMark: 10 },
    { subject: 'Rating', A: baseData.rating, fullMark: 10 },
    { subject: 'Valor', A: 8.8, fullMark: 10 }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Viviendas en Venta"
          value={formatNumber(baseData.viviendas_en_venta)}
          trend={parseFloat(stockTrend.value)}
          trendLabel="vs trimestre anterior"
          icon={<Building className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Precio Medio"
          value={formatEuro(baseData.precio_medio)}
          trend={3.1}
          trendLabel="vs trimestre anterior"
          icon={<Home className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Precio €/m²"
          value={formatEuro(baseData.precio_m2)}
          trend={parseFloat(priceTrend.value)}
          trendLabel="vs trimestre anterior"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Visitas/Anuncio"
          value={formatNumber(baseData.visitas_por_anuncio)}
          trend={5.8}
          trendLabel="vs trimestre anterior"
          icon={<Eye className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Días en Plataforma"
          value={baseData.dias_plataforma.toString()}
          trend={-8.7}
          trendLabel="vs trimestre anterior"
          icon={<Clock className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Leads/Anuncio"
          value={baseData.leads_por_anuncio.toString()}
          trend={parseFloat(leadsTrend.value)}
          trendLabel="vs trimestre anterior"
          icon={<Target className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
      </div>

      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Variación vs 2007"
          value={`${variacionVs2007 > 0 ? '+' : ''}${variacionVs2007.toFixed(1)}%`}
          description="comparado con precrisis"
          icon={variacionVs2007 > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Variación 12 meses"
          value={`+${baseData.variacion_precio_12m}%`}
          description="últimos 12 meses"
          icon={<TrendingUp className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Descuento Negociación"
          value={`${baseData.descuento_negociacion}%`}
          description="promedio"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
      </div>

      {/* Trading Chart con selector de tiempo */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                Evolución Precio €/m² - Trading View
              </CardTitle>
              <CardDescription className="text-slate-400">
                Análisis técnico - Salamanca District
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {(['1y', '2y', '5y', 'all'] as const).map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className={timeframe === period ? 
                    "bg-emerald-600 text-white" : 
                    "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  {period === 'all' ? 'Todo' : period.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredPriceData}>
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
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#10b981' }}
                fill="url(#priceGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock vs Leads Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Stock vs Leads por Anuncio</CardTitle>
            <CardDescription className="text-slate-400">Últimos 8 trimestres</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockLeadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="trimestre" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="stock" fill="#06b6d4" name="Stock Viviendas" />
                <Bar yAxisId="right" dataKey="leads" fill="#10b981" name="Leads/Anuncio" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Histórico de Leads */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Histórico Leads por Anuncio</CardTitle>
            <CardDescription className="text-slate-400">Evolución últimos 8 trimestres</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadsHistorico}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="trimestre" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#8b5cf6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Radar */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Radar de Mercado</CardTitle>
          <CardDescription className="text-slate-400">Métricas clave del mercado inmobiliario</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <Radar name="Salamanca" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

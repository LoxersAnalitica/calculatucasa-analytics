
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/StatsCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Building, Target, Star, Eye, Clock, TrendingUp, TrendingDown, Home } from 'lucide-react';
import { formatEuro, formatNumber } from '@/utils/formatters';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface BarrioData {
  nombre: string;
  precio_m2: number;
  stock: number;
  leads: number;
  rating: number;
  poblacion_total: number;
  renta_familiar: number;
  edad_media: number;
  viviendas_propias: number;
  esfuerzo_familiar: number;
  descuento_negociacion: number;
  stage: string;
  speed: string;
  risk: string;
}

interface BarrioDashboardProps {
  barrio: BarrioData;
}

export const BarrioDashboard: React.FC<BarrioDashboardProps> = ({ barrio }) => {
  const [timeframe, setTimeframe] = useState<'1y' | '2y' | '5y' | 'all'>('2y');
  
  // Generar datos históricos para el barrio específico
  const generateBarrioHistoricalData = () => {
    const quarters = [];
    const startYear = 2015;
    const endYear = 2025;
    const basePrice = barrio.precio_m2 * 0.85; // Precio base histórico
    
    for (let year = startYear; year <= endYear; year++) {
      for (let q = 1; q <= 4; q++) {
        if (year === 2025 && q > 1) break;
        
        const growth = Math.pow(1.018, (year - startYear) * 4 + q - 1);
        const noise = (Math.random() - 0.5) * 150;
        
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

  const allHistoricalData = useMemo(() => generateBarrioHistoricalData(), [barrio]);
  
  const getFilteredData = () => {
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
  
  // Datos mock para otros gráficos del barrio
  const stockLeadsData = [
    { trimestre: 'Q2-2023', stock: Math.round(barrio.stock * 1.15), leads: barrio.leads - 0.8 },
    { trimestre: 'Q3-2023', stock: Math.round(barrio.stock * 1.12), leads: barrio.leads - 0.5 },
    { trimestre: 'Q4-2023', stock: Math.round(barrio.stock * 1.08), leads: barrio.leads - 0.2 },
    { trimestre: 'Q1-2024', stock: Math.round(barrio.stock * 1.05), leads: barrio.leads + 0.1 },
    { trimestre: 'Q2-2024', stock: Math.round(barrio.stock * 1.02), leads: barrio.leads - 0.1 },
    { trimestre: 'Q3-2024', stock: Math.round(barrio.stock * 0.98), leads: barrio.leads + 0.3 },
    { trimestre: 'Q4-2024', stock: Math.round(barrio.stock * 1.01), leads: barrio.leads + 0.1 },
    { trimestre: 'Q1-2025', stock: barrio.stock, leads: barrio.leads }
  ];

  const leadsHistorico = stockLeadsData.map(item => ({
    trimestre: item.trimestre,
    leads: item.leads
  }));

  const radarData = [
    { subject: 'Liquidez', A: barrio.rating * 1.1, fullMark: 10 },
    { subject: 'Demanda', A: barrio.leads * 1.2, fullMark: 10 },
    { subject: 'Velocidad', A: 10 - (barrio.stock / 200), fullMark: 10 },
    { subject: 'Rating', A: barrio.rating, fullMark: 10 },
    { subject: 'Valor', A: barrio.precio_m2 / 1000, fullMark: 10 }
  ];

  // Cálculos
  const precio2007 = barrio.precio_m2 * 0.88;
  const variacionVs2007 = ((barrio.precio_m2 - precio2007) / precio2007) * 100;
  const variacion12m = 5.8 + (Math.random() * 4 - 2); // Variación mock

  return (
    <div className="mt-6 space-y-6 p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-lg border border-slate-700">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Dashboard Completo - {barrio.nombre}</h3>
        <Badge variant="outline" className="border-emerald-400 text-emerald-400">
          <Star className="h-3 w-3 mr-1" />
          Rating {barrio.rating}
        </Badge>
      </div>
      
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Viviendas en Venta"
          value={formatNumber(barrio.stock)}
          trend={-2.1}
          trendLabel="vs trimestre anterior"
          icon={<Building className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Precio Medio"
          value={formatEuro(barrio.precio_m2 * 95)} // Precio medio estimado
          trend={4.2}
          trendLabel="vs trimestre anterior"
          icon={<Home className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Precio €/m²"
          value={formatEuro(barrio.precio_m2)}
          trend={3.8}
          trendLabel="vs trimestre anterior"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Visitas/Anuncio"
          value={formatNumber(Math.round(barrio.leads * 23))}
          trend={6.2}
          trendLabel="vs trimestre anterior"
          icon={<Eye className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Días en Plataforma"
          value={Math.round(65 - barrio.rating * 3).toString()}
          trend={-7.5}
          trendLabel="vs trimestre anterior"
          icon={<Clock className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Leads/Anuncio"
          value={barrio.leads.toString()}
          trend={1.8}
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
          value={`+${variacion12m.toFixed(1)}%`}
          description="últimos 12 meses"
          icon={<TrendingUp className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Descuento Negociación"
          value={`${barrio.descuento_negociacion}%`}
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
                Evolución Precio €/m² - {barrio.nombre}
              </CardTitle>
              <CardDescription className="text-slate-400">
                Análisis histórico del sub-barrio
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
                <linearGradient id="priceGradientBarrio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
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
                formatter={(value) => [`${formatEuro(value as number)}`, `Precio €/m² ${barrio.nombre}`]}
              />
              <Line
                type="monotone"
                dataKey="valor"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#8b5cf6' }}
                fill="url(#priceGradientBarrio)"
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
            <CardTitle className="text-white">Stock vs Leads - {barrio.nombre}</CardTitle>
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
                <Bar yAxisId="right" dataKey="leads" fill="#8b5cf6" name="Leads/Anuncio" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Histórico de Leads */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Histórico Leads - {barrio.nombre}</CardTitle>
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
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#f59e0b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Radar del Barrio */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Radar de Mercado - {barrio.nombre}</CardTitle>
          <CardDescription className="text-slate-400">Métricas específicas del sub-barrio</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <Radar name={barrio.nombre} dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Demografía y Dinámicas del Barrio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Demografía - {barrio.nombre}</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Población Total</span>
                <span className="font-semibold">{formatNumber(barrio.poblacion_total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Renta Familiar</span>
                <span className="font-semibold">{formatEuro(barrio.renta_familiar)}</span>
              </div>
              <div className="flex justify-between">
                <span>Edad Media</span>
                <span className="font-semibold">{barrio.edad_media} años</span>
              </div>
              <div className="flex justify-between">
                <span>Vivienda Propia</span>
                <span className="font-semibold">{barrio.viviendas_propias}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Dinámicas - {barrio.nombre}</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Stage</span>
                <Badge variant="outline" className="border-emerald-400 text-emerald-400">
                  {barrio.stage}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Speed</span>
                <Badge variant="outline" className="border-blue-400 text-blue-400">
                  {barrio.speed}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Risk</span>
                <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                  {barrio.risk}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Esfuerzo Familiar</span>
                <span className="font-semibold">{barrio.esfuerzo_familiar}%</span>
              </div>
              <div className="flex justify-between">
                <span>Descuento Negociación</span>
                <span className="font-semibold">{barrio.descuento_negociacion}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

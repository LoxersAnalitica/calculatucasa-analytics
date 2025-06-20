
import React, { useMemo } from 'react';
import { StatsCard } from '@/components/ui/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TradingChart } from '@/components/charts/TradingChart';
import { 
  DollarSign, 
  Home, 
  Building, 
  Target, 
  Eye, 
  Clock 
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
  Legend 
} from 'recharts';
import { formatEuro, formatNumber, trendArrow } from '@/utils/formatters';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface OverviewSectionProps {
  baseData: any;
  historico: any;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ baseData, historico }) => {
  const priceTrend = trendArrow(7120, 7200);
  const stockTrend = trendArrow(1175, 1167);
  const leadsTrend = trendArrow(9.0, 9.2);

  const stockLeadsData = historico.stock.map((item: any, index: number) => ({
    trimestre: item.trimestre,
    stock: item.valor,
    leads: historico.leads_por_anuncio[index]?.valor || 0
  }));

  const radarData = [
    { subject: 'Rating', A: baseData.rating, fullMark: 10 },
    { subject: 'Liquidez', A: baseData.liquidez_mercado, fullMark: 10 },
    { subject: 'Demanda', A: 9.1, fullMark: 10 },
    { subject: 'Velocidad', A: 8.5, fullMark: 10 },
    { subject: 'Riesgo', A: 7.2, fullMark: 10 }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title="Precio €/m²"
          value={formatEuro(baseData.precio_m2)}
          trend={parseFloat(priceTrend.value)}
          trendLabel="vs trimestre anterior"
          icon={<DollarSign className="h-4 w-4" />}
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
          title="Stock Disponible"
          value={formatNumber(baseData.viviendas_en_venta)}
          trend={parseFloat(stockTrend.value)}
          trendLabel="vs trimestre anterior"
          icon={<Building className="h-4 w-4" />}
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
      </div>

      {/* Trading Chart */}
      <TradingChart data={historico.precio_m2} />

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

        {/* Market Radar */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Radar de Mercado</CardTitle>
            <CardDescription className="text-slate-400">Métricas clave del mercado inmobiliario</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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

      {/* News Section */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Noticias del Sector</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-emerald-400 pl-4">
              <h4 className="font-semibold text-white">Salamanca lidera crecimiento premium en Madrid</h4>
              <p className="text-sm text-slate-400">Precios suben 6.4% interanual, máximos históricos consolidados</p>
              <span className="text-xs text-slate-500">Hace 1 hora</span>
            </div>
            <div className="border-l-4 border-cyan-400 pl-4">
              <h4 className="font-semibold text-white">Demanda internacional bate récords</h4>
              <p className="text-sm text-slate-400">HNWI latinoamericanos duplican inversión en Q1-2025</p>
              <span className="text-xs text-slate-500">Hace 3 horas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

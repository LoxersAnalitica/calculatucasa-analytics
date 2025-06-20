
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/StatsCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Home, 
  DollarSign, 
  Users, 
  Clock,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowUpIcon,
  ArrowDownIcon,
  MapPin,
  Building,
  Eye,
  FileText,
  Calendar,
  Star,
  Activity,
  Signal,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';

// Mock Data Generator
const generateMockData = () => {
  const baseData = {
    barrio: "Salamanca",
    locationId: "SAL001",
    periodo: "2025-Q1",
    visitas_por_anuncio: 142,
    leads_por_anuncio: 9.2,
    viviendas_en_venta: 1167,
    precio_medio: 945000,
    precio_m2: 7200,
    dias_plataforma: 38,
    rating: 8.8,
    stage: "Vendedor",
    speed: "Rápida",
    risk: "Medio",
    esfuerzo_familiar: 13.8,
    descuento_negociacion: 2.1,
    clock_leads: 78,
    variacion_precio_12m: 6.4,
    variacion_precio_base: 3.7,
    poblacion_total: 148500,
    poblacion_nacional: 121200,
    poblacion_extranjera: 27300,
    renta_familiar: 82000,
    estudios_superiores: 72,
    casados: 47,
    hogares_unipersonales: 29,
    poblacion_masculina: 70100,
    poblacion_femenina: 78400,
    edad_media: 43,
    viviendas_propias: 81,
    viviendas_alquiler: 19,
    rating_estrellas: 4.4,
    stage_descripcion: "Mercado altamente favorable al vendedor con demanda sostenida y precios en tendencia alcista",
    risk_descripcion: "Riesgo moderado por posible corrección técnica tras subidas prolongadas",
    speed_descripcion: "Velocidad de absorción alta con tiempo medio de venta por debajo de la media del distrito",
    perfil_socio: "Ejecutivos senior, empresarios, profesionales liberales de alto standing",
    demanda_nivel: "Muy Alta",
    liquidez_mercado: 8.1
  };

  const historico = {
    precio_m2: [
      { trimestre: "2023-Q2", valor: 6450 },
      { trimestre: "2023-Q3", valor: 6580 },
      { trimestre: "2023-Q4", valor: 6720 },
      { trimestre: "2024-Q1", valor: 6850 },
      { trimestre: "2024-Q2", valor: 6980 },
      { trimestre: "2024-Q3", valor: 7050 },
      { trimestre: "2024-Q4", valor: 7120 },
      { trimestre: "2025-Q1", valor: 7200 }
    ],
    stock: [
      { trimestre: "2023-Q2", valor: 1380 },
      { trimestre: "2023-Q3", valor: 1340 },
      { trimestre: "2023-Q4", valor: 1290 },
      { trimestre: "2024-Q1", valor: 1250 },
      { trimestre: "2024-Q2", valor: 1210 },
      { trimestre: "2024-Q3", valor: 1185 },
      { trimestre: "2024-Q4", valor: 1175 },
      { trimestre: "2025-Q1", valor: 1167 }
    ],
    leads_por_anuncio: [
      { trimestre: "2023-Q2", valor: 7.8 },
      { trimestre: "2023-Q3", valor: 8.1 },
      { trimestre: "2023-Q4", valor: 8.3 },
      { trimestre: "2024-Q1", valor: 8.6 },
      { trimestre: "2024-Q2", valor: 8.8 },
      { trimestre: "2024-Q3", valor: 8.9 },
      { trimestre: "2024-Q4", valor: 9.0 },
      { trimestre: "2025-Q1", valor: 9.2 }
    ],
    descuento_negociacion: [
      { trimestre: "2023-Q2", valor: 3.8 },
      { trimestre: "2023-Q3", valor: 3.4 },
      { trimestre: "2023-Q4", valor: 3.1 },
      { trimestre: "2024-Q1", valor: 2.8 },
      { trimestre: "2024-Q2", valor: 2.5 },
      { trimestre: "2024-Q3", valor: 2.3 },
      { trimestre: "2024-Q4", valor: 2.2 },
      { trimestre: "2025-Q1", valor: 2.1 }
    ],
    esfuerzo_familiar: [
      { trimestre: "2023-Q2", valor: 12.1 },
      { trimestre: "2023-Q3", valor: 12.4 },
      { trimestre: "2023-Q4", valor: 12.8 },
      { trimestre: "2024-Q1", valor: 13.1 },
      { trimestre: "2024-Q2", valor: 13.3 },
      { trimestre: "2024-Q3", valor: 13.5 },
      { trimestre: "2024-Q4", valor: 13.6 },
      { trimestre: "2025-Q1", valor: 13.8 }
    ]
  };

  return { baseData, historico };
};

// Helper Functions
const formatEuro = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-ES').format(num);
};

const trendArrow = (oldVal: number, newVal: number) => {
  const change = ((newVal - oldVal) / oldVal) * 100;
  return {
    icon: change >= 0 ? ArrowUpIcon : ArrowDownIcon,
    color: change >= 0 ? 'text-emerald-400' : 'text-red-400',
    value: Math.abs(change).toFixed(1)
  };
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedBarrio, setSelectedBarrio] = useState('');
  const { baseData, historico } = useMemo(() => generateMockData(), []);

  // Calculate trends
  const priceTrend = trendArrow(7120, 7200);
  const stockTrend = trendArrow(1175, 1167);
  const leadsTrend = trendArrow(9.0, 9.2);

  // Chart data preparation
  const combinedPriceData = historico.precio_m2.map((item, index) => ({
    trimestre: item.trimestre,
    precio_m2: item.valor,
    esfuerzo_familiar: historico.esfuerzo_familiar[index]?.valor || 0
  }));

  const stockLeadsData = historico.stock.map((item, index) => ({
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

  const pieData = [
    { name: 'Nacional', value: baseData.poblacion_nacional, color: '#06b6d4' },
    { name: 'Extranjera', value: baseData.poblacion_extranjera, color: '#8b5cf6' }
  ];

  const subBarrios = [
    { 
      nombre: 'Recoletos', 
      precio_m2: 7650, 
      stock: 198, 
      leads: 10.1, 
      rating: 9.1,
      poblacion_total: 24500,
      renta_familiar: 95000,
      edad_media: 44,
      viviendas_propias: 85,
      esfuerzo_familiar: 14.2,
      descuento_negociacion: 1.8,
      stage: "Vendedor Premium",
      speed: "Muy Rápida",
      risk: "Bajo"
    },
    { 
      nombre: 'Castellana', 
      precio_m2: 7320, 
      stock: 156, 
      leads: 9.8, 
      rating: 8.9,
      poblacion_total: 28100,
      renta_familiar: 88000,
      edad_media: 42,
      viviendas_propias: 82,
      esfuerzo_familiar: 13.9,
      descuento_negociacion: 1.9,
      stage: "Vendedor",
      speed: "Rápida",
      risk: "Bajo"
    },
    { 
      nombre: 'Lista', 
      precio_m2: 6850, 
      stock: 287, 
      leads: 8.4, 
      rating: 8.3,
      poblacion_total: 31200,
      renta_familiar: 78000,
      edad_media: 41,
      viviendas_propias: 79,
      esfuerzo_familiar: 13.1,
      descuento_negociacion: 2.3,
      stage: "Equilibrado",
      speed: "Media",
      risk: "Medio"
    },
    { 
      nombre: 'Goya', 
      precio_m2: 7100, 
      stock: 234, 
      leads: 8.8, 
      rating: 8.6,
      poblacion_total: 29800,
      renta_familiar: 81000,
      edad_media: 43,
      viviendas_propias: 80,
      esfuerzo_familiar: 13.5,
      descuento_negociacion: 2.1,
      stage: "Vendedor",
      speed: "Rápida",
      risk: "Medio"
    },
    { 
      nombre: 'Guindalera', 
      precio_m2: 6650, 
      stock: 292, 
      leads: 8.1, 
      rating: 8.1,
      poblacion_total: 34900,
      renta_familiar: 75000,
      edad_media: 40,
      viviendas_propias: 76,
      esfuerzo_familiar: 12.8,
      descuento_negociacion: 2.5,
      stage: "Equilibrado",
      speed: "Media",
      risk: "Medio"
    }
  ];

  const insights = [
    {
      title: "Momentum alcista consolidado - Fase de expansión",
      description: "El mercado mantiene una tendencia alcista sólida con incrementos del 6.4% interanual. La demanda supera consistentemente la oferta, creando un entorno favorable para mantener precios premium. Los fundamentals del distrito apoyan esta valoración.",
      type: "success",
      action: "Mantener estrategia premium",
      details: "Volumen de transacciones +12% vs Q4-2024. Ratio demanda/oferta: 3.2x"
    },
    {
      title: "Optimización de time-to-market requerida",
      description: "Aunque el mercado es favorable, propiedades que superan 45 días en portal experimentan desaceleración en interés. La ventana óptima de venta se sitúa entre 25-40 días para maximizar precio final.",
      type: "warning",
      action: "Implementar pricing dinámico",
      details: "38% de propiedades venden en primeros 30 días al 98% del precio inicial"
    },
    {
      title: "Diversificación geográfica de demanda - Oportunidad estratégica",
      description: "El 18.4% de la demanda proviene de compradores internacionales, con fuerte presencia de HNWI latinoamericanos (México 31%, Colombia 24%) y asiáticos (Singapur 18%). Esta diversificación reduce riesgo sistémico local.",
      type: "info",
      action: "Expandir canales internacionales",
      details: "Ticket promedio internacional: +23% vs nacional. Financiación all-cash: 67%"
    }
  ];

  const renderTradingChart = () => (
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
          <ComposedChart data={historico.precio_m2}>
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

  const renderBarrioDashboard = (barrio: any) => (
    <div className="mt-6 space-y-6 p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-lg border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4">Dashboard - {barrio.nombre}</h3>
      
      {/* KPIs del barrio */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          title="Precio €/m²"
          value={formatEuro(barrio.precio_m2)}
          trend={4.2}
          trendLabel="vs trimestre anterior"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Stock"
          value={formatNumber(barrio.stock)}
          trend={-2.1}
          trendLabel="vs trimestre anterior"
          icon={<Building className="h-4 w-4" />}
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
        <StatsCard
          title="Rating"
          value={barrio.rating.toString()}
          icon={<Star className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
      </div>

      {/* Demografía y Dinámicas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Demografía</CardTitle>
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
            <CardTitle className="text-white">Dinámicas de Mercado</CardTitle>
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

  const renderOverview = () => (
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
      {renderTradingChart()}

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

  const renderBarrios = () => (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Comparativa por Sub-barrios</CardTitle>
          <CardDescription className="text-slate-400">Métricas principales del Barrio de Salamanca</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-2 text-slate-300">Sub-barrio</th>
                  <th className="text-right p-2 text-slate-300">Precio €/m²</th>
                  <th className="text-right p-2 text-slate-300">Stock</th>
                  <th className="text-right p-2 text-slate-300">Leads/Anuncio</th>
                  <th className="text-right p-2 text-slate-300">Rating</th>
                  <th className="text-center p-2 text-slate-300">Acción</th>
                </tr>
              </thead>
              <tbody>
                {subBarrios.map((barrio, index) => (
                  <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/30">
                    <td className="p-2 font-medium text-white">{barrio.nombre}</td>
                    <td className="p-2 text-right text-slate-300">{formatEuro(barrio.precio_m2)}</td>
                    <td className="p-2 text-right text-slate-300">{formatNumber(barrio.stock)}</td>
                    <td className="p-2 text-right text-slate-300">{barrio.leads}</td>
                    <td className="p-2 text-right text-slate-300">
                      <div className="flex items-center justify-end">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {barrio.rating}
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedBarrio(selectedBarrio === barrio.nombre ? '' : barrio.nombre)}
                        className="border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        {selectedBarrio === barrio.nombre ? 'Ocultar' : 'Ver Dashboard'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard del barrio seleccionado */}
      {selectedBarrio && renderBarrioDashboard(subBarrios.find(b => b.nombre === selectedBarrio))}
    </div>
  );

  const renderDemographics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Población Total"
          value={formatNumber(baseData.poblacion_total)}
          description="habitantes"
          icon={<Users className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Renta Familiar"
          value={formatEuro(baseData.renta_familiar)}
          description="media anual"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Estudios Superiores"
          value={`${baseData.estudios_superiores}%`}
          description="de la población"
          icon={<FileText className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Composición Poblacional</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${((value / baseData.poblacion_total) * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Distribución por Género</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-slate-300">
              <div className="flex justify-between items-center">
                <span>Población Masculina</span>
                <span className="font-semibold">{formatNumber(baseData.poblacion_masculina)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Población Femenina</span>
                <span className="font-semibold">{formatNumber(baseData.poblacion_femenina)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Edad Media</span>
                <span className="font-semibold">{baseData.edad_media} años</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDynamics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Signal className="h-5 w-5 text-emerald-400 mr-2" />
              Stage: {baseData.stage}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300 mb-3">{baseData.stage_descripcion}</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Presión compradora:</span>
                <span className="text-emerald-400 font-semibold">Alta</span>
              </div>
              <div className="flex justify-between">
                <span>Inventario:</span>
                <span className="text-emerald-400 font-semibold">Limitado</span>
              </div>
              <div className="flex justify-between">
                <span>Poder negociación:</span>
                <span className="text-emerald-400 font-semibold">Vendedor</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border-cyan-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Zap className="h-5 w-5 text-cyan-400 mr-2" />
              Speed: {baseData.speed}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300 mb-3">{baseData.speed_descripcion}</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Tiempo medio venta:</span>
                <span className="text-cyan-400 font-semibold">32 días</span>
              </div>
              <div className="flex justify-between">
                <span>Absorción mensual:</span>
                <span className="text-cyan-400 font-semibold">2.8%</span>
              </div>
              <div className="flex justify-between">
                <span>Visitas hasta venta:</span>
                <span className="text-cyan-400 font-semibold">14 promedio</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
              Risk: {baseData.risk}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300 mb-3">{baseData.risk_descripcion}</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Volatilidad precio:</span>
                <span className="text-yellow-400 font-semibold">Moderada</span>
              </div>
              <div className="flex justify-between">
                <span>Sensibilidad tipos:</span>
                <span className="text-yellow-400 font-semibold">Media</span>
              </div>
              <div className="flex justify-between">
                <span>Diversificación:</span>
                <span className="text-yellow-400 font-semibold">Alta</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Indicadores Avanzados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-emerald-400">{baseData.clock_leads}</div>
              <div className="text-sm text-slate-400">Clock Leads</div>
              <div className="text-xs text-slate-500">Posición horaria</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">{baseData.liquidez_mercado}</div>
              <div className="text-sm text-slate-400">Liquidez</div>
              <div className="text-xs text-slate-500">Sobre 10</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{baseData.esfuerzo_familiar}%</div>
              <div className="text-sm text-slate-400">Esfuerzo Familiar</div>
              <div className="text-xs text-slate-500">Renta disponible</div>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">{baseData.descuento_negociacion}%</div>
              <div className="text-sm text-slate-400">Descuento Medio</div>
              <div className="text-xs text-slate-500">Negociación final</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700 border-l-4 border-l-emerald-400">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-base text-white leading-tight">{insight.title}</CardTitle>
                {insight.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-400 mt-1" />}
                {insight.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-400 mt-1" />}
                {insight.type === 'info' && <Target className="h-5 w-5 text-cyan-400 mt-1" />}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300 mb-3">{insight.description}</p>
              <div className="text-xs text-slate-400 mb-4 p-2 bg-slate-700/30 rounded">
                {insight.details}
              </div>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground border-slate-600 text-slate-300">
                {insight.action}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Off-Market Intelligence
              </h1>
              <p className="text-slate-400">Barrio de Salamanca, Madrid</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-emerald-400 text-emerald-400">{baseData.periodo}</Badge>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-400">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600">Overview</TabsTrigger>
            <TabsTrigger value="barrios" className="data-[state=active]:bg-emerald-600">Barrios</TabsTrigger>
            <TabsTrigger value="demographics" className="data-[state=active]:bg-emerald-600">Demografía</TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-emerald-600">Métricas</TabsTrigger>
            <TabsTrigger value="dynamics" className="data-[state=active]:bg-emerald-600">Dinámicas</TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-emerald-600">Insights</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              {renderOverview()}
            </TabsContent>

            <TabsContent value="barrios" className="space-y-6">
              {renderBarrios()}
            </TabsContent>

            <TabsContent value="demographics" className="space-y-6">
              {renderDemographics()}
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Todas las Métricas - {baseData.periodo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-slate-400">
                    <p>Tabla completa con las 36 métricas estará disponible próximamente</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dynamics" className="space-y-6">
              {renderDynamics()}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              {renderInsights()}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

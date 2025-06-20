
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/StatsCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
  Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';

// Mock Data Generator
const generateMockData = () => {
  const baseData = {
    barrio: "Salamanca",
    locationId: "SAL001",
    periodo: "2024-Q4",
    visitas_por_anuncio: 127,
    leads_por_anuncio: 8.4,
    viviendas_en_venta: 1234,
    precio_medio: 890000,
    precio_m2: 6800,
    dias_plataforma: 45,
    rating: 8.5,
    stage: "Vendedor",
    speed: "Media",
    risk: "Bajo",
    esfuerzo_familiar: 12.5,
    descuento_negociacion: 3.2,
    clock_leads: 65,
    variacion_precio_12m: 4.8,
    variacion_precio_base: 2.1,
    poblacion_total: 145000,
    poblacion_nacional: 119000,
    poblacion_extranjera: 26000,
    renta_familiar: 75000,
    estudios_superiores: 68,
    casados: 45,
    hogares_unipersonales: 32,
    poblacion_masculina: 68500,
    poblacion_femenina: 76500,
    edad_media: 42,
    viviendas_propias: 78,
    viviendas_alquiler: 22,
    rating_estrellas: 4.3,
    stage_descripcion: "Mercado favorable al vendedor con precios al alza",
    risk_descripcion: "Riesgo bajo de corrección de precios",
    speed_descripcion: "Velocidad de venta moderada",
    perfil_socio: "Alto poder adquisitivo, profesionales liberales",
    demanda_nivel: "Alta",
    liquidez_mercado: 7.2
  };

  const historico = {
    precio_m2: [
      { trimestre: "2023-Q1", valor: 6200 },
      { trimestre: "2023-Q2", valor: 6350 },
      { trimestre: "2023-Q3", valor: 6480 },
      { trimestre: "2023-Q4", valor: 6520 },
      { trimestre: "2024-Q1", valor: 6580 },
      { trimestre: "2024-Q2", valor: 6650 },
      { trimestre: "2024-Q3", valor: 6720 },
      { trimestre: "2024-Q4", valor: 6800 }
    ],
    stock: [
      { trimestre: "2023-Q1", valor: 1450 },
      { trimestre: "2023-Q2", valor: 1380 },
      { trimestre: "2023-Q3", valor: 1320 },
      { trimestre: "2023-Q4", valor: 1280 },
      { trimestre: "2024-Q1", valor: 1250 },
      { trimestre: "2024-Q2", valor: 1220 },
      { trimestre: "2024-Q3", valor: 1200 },
      { trimestre: "2024-Q4", valor: 1234 }
    ],
    leads_por_anuncio: [
      { trimestre: "2023-Q1", valor: 7.2 },
      { trimestre: "2023-Q2", valor: 7.8 },
      { trimestre: "2023-Q3", valor: 8.1 },
      { trimestre: "2023-Q4", valor: 7.9 },
      { trimestre: "2024-Q1", valor: 8.2 },
      { trimestre: "2024-Q2", valor: 8.0 },
      { trimestre: "2024-Q3", valor: 8.1 },
      { trimestre: "2024-Q4", valor: 8.4 }
    ],
    descuento_negociacion: [
      { trimestre: "2023-Q1", valor: 4.2 },
      { trimestre: "2023-Q2", valor: 3.8 },
      { trimestre: "2023-Q3", valor: 3.5 },
      { trimestre: "2023-Q4", valor: 3.4 },
      { trimestre: "2024-Q1", valor: 3.3 },
      { trimestre: "2024-Q2", valor: 3.1 },
      { trimestre: "2024-Q3", valor: 3.0 },
      { trimestre: "2024-Q4", valor: 3.2 }
    ],
    esfuerzo_familiar: [
      { trimestre: "2023-Q1", valor: 11.8 },
      { trimestre: "2023-Q2", valor: 12.1 },
      { trimestre: "2023-Q3", valor: 12.3 },
      { trimestre: "2023-Q4", valor: 12.4 },
      { trimestre: "2024-Q1", valor: 12.5 },
      { trimestre: "2024-Q2", valor: 12.6 },
      { trimestre: "2024-Q3", valor: 12.4 },
      { trimestre: "2024-Q4", valor: 12.5 }
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
    color: change >= 0 ? 'text-green-600' : 'text-red-600',
    value: Math.abs(change).toFixed(1)
  };
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const { baseData, historico } = useMemo(() => generateMockData(), []);

  // Calculate trends
  const priceTrend = trendArrow(6720, 6800);
  const stockTrend = trendArrow(1200, 1234);
  const leadsTrend = trendArrow(8.1, 8.4);

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
    { subject: 'Demanda', A: 8.5, fullMark: 10 },
    { subject: 'Velocidad', A: 7.0, fullMark: 10 },
    { subject: 'Riesgo', A: 8.2, fullMark: 10 }
  ];

  const pieData = [
    { name: 'Nacional', value: baseData.poblacion_nacional, color: '#3b82f6' },
    { name: 'Extranjera', value: baseData.poblacion_extranjera, color: '#ef4444' }
  ];

  const subBarrios = [
    { nombre: 'Recoletos', precio_m2: 7200, stock: 234, leads: 9.2, rating: 8.8 },
    { nombre: 'Castellana', precio_m2: 6950, stock: 189, leads: 8.7, rating: 8.6 },
    { nombre: 'Lista', precio_m2: 6400, stock: 298, leads: 7.9, rating: 8.2 },
    { nombre: 'Goya', precio_m2: 6800, stock: 267, leads: 8.1, rating: 8.4 },
    { nombre: 'Guindalera', precio_m2: 6200, stock: 246, leads: 7.8, rating: 8.0 }
  ];

  const insights = [
    {
      title: "Mercado vendedor (stage: máximos)",
      description: "Los precios están en máximos históricos. Recomendamos subir precios entre 2-4% en las próximas 4 semanas.",
      type: "success",
      action: "Revisar estrategia de pricing"
    },
    {
      title: "Liquidez baja (>60 días en portal)",
      description: "Las propiedades permanecen demasiado tiempo en el mercado. Sugerimos rebajas del 3% al día 45.",
      type: "warning",
      action: "Implementar descuentos automáticos"
    },
    {
      title: "Demanda extranjera 18%",
      description: "Alta demanda de compradores internacionales. Oportunidad para posicionar en México y Filipinas.",
      type: "info",
      action: "Expandir marketing internacional"
    }
  ];

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
        />
        <StatsCard
          title="Precio Medio"
          value={formatEuro(baseData.precio_medio)}
          trend={2.3}
          trendLabel="vs trimestre anterior"
          icon={<Home className="h-4 w-4" />}
        />
        <StatsCard
          title="Stock Disponible"
          value={formatNumber(baseData.viviendas_en_venta)}
          trend={parseFloat(stockTrend.value)}
          trendLabel="vs trimestre anterior"
          icon={<Building className="h-4 w-4" />}
        />
        <StatsCard
          title="Leads/Anuncio"
          value={baseData.leads_por_anuncio.toString()}
          trend={parseFloat(leadsTrend.value)}
          trendLabel="vs trimestre anterior"
          icon={<Target className="h-4 w-4" />}
        />
        <StatsCard
          title="Visitas/Anuncio"
          value={formatNumber(baseData.visitas_por_anuncio)}
          trend={-1.2}
          trendLabel="vs trimestre anterior"
          icon={<Eye className="h-4 w-4" />}
        />
        <StatsCard
          title="Días en Plataforma"
          value={baseData.dias_plataforma.toString()}
          trend={-3.4}
          trendLabel="vs trimestre anterior"
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price & Effort Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Evolución Precio & Esfuerzo Familiar</CardTitle>
            <CardDescription>Últimos 8 trimestres</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={combinedPriceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trimestre" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="precio_m2" stroke="#3b82f6" strokeWidth={2} name="Precio €/m²" />
                <Line yAxisId="right" type="monotone" dataKey="esfuerzo_familiar" stroke="#ef4444" strokeWidth={2} name="Esfuerzo Familiar %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stock vs Leads Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Stock vs Leads por Anuncio</CardTitle>
            <CardDescription>Últimos 8 trimestres</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockLeadsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="trimestre" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="stock" fill="#3b82f6" name="Stock Viviendas" />
                <Bar yAxisId="right" dataKey="leads" fill="#10b981" name="Leads/Anuncio" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Radar */}
      <Card>
        <CardHeader>
          <CardTitle>Radar de Mercado</CardTitle>
          <CardDescription>Métricas clave del mercado inmobiliario</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 10]} />
              <Radar name="Salamanca" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* News Section */}
      <Card>
        <CardHeader>
          <CardTitle>Noticias del Sector</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">Madrid lidera el crecimiento inmobiliario en España</h4>
              <p className="text-sm text-muted-foreground">Los precios en Salamanca suben un 4.8% interanual</p>
              <span className="text-xs text-muted-foreground">Hace 2 horas</span>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold">Demanda extranjera alcanza máximos históricos</h4>
              <p className="text-sm text-muted-foreground">Inversores latinoamericanos lideran las compras</p>
              <span className="text-xs text-muted-foreground">Hace 4 horas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBarrios = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Comparativa por Sub-barrios</CardTitle>
          <CardDescription>Métricas principales del Barrio de Salamanca</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Sub-barrio</th>
                  <th className="text-right p-2">Precio €/m²</th>
                  <th className="text-right p-2">Stock</th>
                  <th className="text-right p-2">Leads/Anuncio</th>
                  <th className="text-right p-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                {subBarrios.map((barrio, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="p-2 font-medium">{barrio.nombre}</td>
                    <td className="p-2 text-right">{formatEuro(barrio.precio_m2)}</td>
                    <td className="p-2 text-right">{formatNumber(barrio.stock)}</td>
                    <td className="p-2 text-right">{barrio.leads}</td>
                    <td className="p-2 text-right">
                      <div className="flex items-center justify-end">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {barrio.rating}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
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
        />
        <StatsCard
          title="Renta Familiar"
          value={formatEuro(baseData.renta_familiar)}
          description="media anual"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatsCard
          title="Estudios Superiores"
          value={`${baseData.estudios_superiores}%`}
          description="de la población"
          icon={<FileText className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Composición Poblacional</CardTitle>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Género</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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

  const renderInsights = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{insight.title}</CardTitle>
                {insight.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                {insight.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600" />}
                {insight.type === 'info' && <Target className="h-5 w-5 text-blue-600" />}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>
              <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                {insight.action}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Market Pulse</h1>
              <p className="text-muted-foreground">Barrio de Salamanca, Madrid</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{baseData.periodo}</Badge>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="barrios">Barrios</TabsTrigger>
            <TabsTrigger value="demographics">Demografía</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
            <TabsTrigger value="dynamics">Dinámicas</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
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
              <Card>
                <CardHeader>
                  <CardTitle>Todas las Métricas - {baseData.periodo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground">
                    <p>Tabla completa con las 36 métricas estará disponible próximamente</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dynamics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      Stage: {baseData.stage}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{baseData.stage_descripcion}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                      Speed: {baseData.speed}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{baseData.speed_descripcion}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                      Risk: {baseData.risk}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{baseData.risk_descripcion}</p>
                  </CardContent>
                </Card>
              </div>
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

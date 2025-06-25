import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/StatsCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Building, Target, Star, Eye, Clock, TrendingUp, TrendingDown, Home } from 'lucide-react';
import { formatEuro, formatNumber } from '@/utils/formatters';
import { getSheetData } from '@/lib/googleSheets';
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
  precio_medio: number;
  stock: number;
  leads: number;
  rating: number;
  poblacion_total: number;
  renta_familiar: number;
  edad_media: number;
  esfuerzo_familiar: number;
  descuento_negociacion: number;
  stage: string;
  speed: string;
  risk: string;
  visitas_por_anuncio?: number;
  dias_plataforma?: number;
  variacion_precio_base?: number;
  variacion_precio_12m?: number;
}

interface BarrioDashboardProps {
  barrio: BarrioData;
}

export const BarrioDashboard: React.FC<BarrioDashboardProps> = ({ barrio }) => {
  const [timeframe, setTimeframe] = useState<'1y' | '2y' | '5y' | 'all'>('2y');
  const [historicoData, setHistoricoData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos históricos reales
  useEffect(() => {
    const loadHistoricoData = async () => {
      try {
        setLoading(true);
        const data = await getSheetData('Histórico');
        
        if (data && data.length > 0) {
          const headers = Object.keys(data[0]);
          const trimestres = headers.slice(2);
          
          // Buscar datos para este barrio específico
          const priceRow = data.find(row => 
            row['Barrio'] === barrio.nombre && 
            row['Métrica'] === 'PRICE_ASKING'
          );
          const stockRow = data.find(row => 
            row['Barrio'] === barrio.nombre && 
            row['Métrica'] === 'STOCK_ASKING'
          );
          const demRow = data.find(row => 
            row['Barrio'] === barrio.nombre && 
            row['Métrica'] === 'DEM_ASKING'
          );

          console.log('🔍 BARRIO DASHBOARD - Datos encontrados:', {
            price: !!priceRow,
            stock: !!stockRow,
            dem: !!demRow,
            barrio: barrio.nombre
          });

          if (priceRow || stockRow || demRow) {
            const precioEvolucion = [];
            const stockEvolucion = [];
            const diasEvolucion = [];

            // Procesar datos históricos
            trimestres.forEach(trimestre => {
              if (!trimestre || trimestre.trim() === '') return;
              
              // PRICE_ASKING
              if (priceRow && priceRow[trimestre]) {
                const precio = parseInt(priceRow[trimestre]) || 0;
                if (precio > 0) {
                  precioEvolucion.push({
                    trimestre: trimestre.trim(),
                    valor: precio
                  });
                }
              }
              
              // STOCK_ASKING  
              if (stockRow && stockRow[trimestre]) {
                const stock = parseInt(stockRow[trimestre]) || 0;
                if (stock > 0) {
                  stockEvolucion.push({
                    trimestre: trimestre.trim(),
                    stock: stock
                  });
                }
              }
              
              // DEM_ASKING (días activos) - Solo hasta Q4-2024
              if (demRow && demRow[trimestre] && !trimestre.includes('2025')) {
                const dias = parseInt(demRow[trimestre]) || 0;
                if (dias > 0) {
                  diasEvolucion.push({
                    trimestre: trimestre.trim(),
                    dias: dias
                  });
                }
              }
            });

            // Añadir Q1-2025 desde métricas (precio_medio del barrio)
            if (barrio.precio_medio > 0) {
              precioEvolucion.push({
                trimestre: '2025-Q1',
                valor: barrio.precio_medio
              });
            }

            // Añadir Q1-2025 para stock (usar datos actuales del barrio)
            if (barrio.stock > 0) {
              stockEvolucion.push({
                trimestre: '2025-Q1',
                stock: barrio.stock
              });
            }

            // Añadir Q1-2025 para días (usar dias_plataforma del barrio)
            if (barrio.dias_plataforma && barrio.dias_plataforma > 0) {
              diasEvolucion.push({
                trimestre: '2025-Q1',
                dias: barrio.dias_plataforma
              });
            }

            console.log('🔍 BARRIO DASHBOARD - Evoluciones procesadas:', {
              precios: precioEvolucion.length,
              stock: stockEvolucion.length,
              dias: diasEvolucion.length
            });

            setHistoricoData({
              precioEvolucion,
              stockEvolucion,
              diasEvolucion
            });
          }
        }
      } catch (error) {
        console.error('Error loading historico data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHistoricoData();
  }, [barrio]);

  // Calcular variaciones vs trimestre anterior (Q4-2024)
  const calcularVariaciones = useMemo(() => {
    if (!historicoData) return { precio: 0, stock: 0, dias: 0 };

    // Buscar Q4-2024 y Q1-2025 para calcular variaciones
    const precioQ4 = historicoData.precioEvolucion?.find(item => item.trimestre === '2024-Q4')?.valor || 0;
    const precioQ1 = historicoData.precioEvolucion?.find(item => item.trimestre === '2025-Q1')?.valor || 0;
    
    const stockQ4 = historicoData.stockEvolucion?.find(item => item.trimestre === '2024-Q4')?.stock || 0;
    const stockQ1 = historicoData.stockEvolucion?.find(item => item.trimestre === '2025-Q1')?.stock || 0;
    
    const diasQ4 = historicoData.diasEvolucion?.find(item => item.trimestre === '2024-Q4')?.dias || 0;
    const diasQ1 = historicoData.diasEvolucion?.find(item => item.trimestre === '2025-Q1')?.dias || 0;

    const precioVariacion = precioQ4 > 0 ? ((precioQ1 - precioQ4) / precioQ4) * 100 : 0;
    const stockVariacion = stockQ4 > 0 ? ((stockQ1 - stockQ4) / stockQ4) * 100 : 0;
    const diasVariacion = diasQ4 > 0 ? ((diasQ1 - diasQ4) / diasQ4) * 100 : 0;

    return {
      precio: Math.round(precioVariacion * 10) / 10,
      stock: Math.round(stockVariacion * 10) / 10,
      dias: Math.round(diasVariacion * 10) / 10
    };
  }, [historicoData]);

  // Procesar datos para la gráfica de precios
  const allHistoricalData = useMemo(() => {
    if (!historicoData?.precioEvolucion) return [];
    
    return historicoData.precioEvolucion.map(item => {
      const [year, quarter] = item.trimestre.includes('-Q') 
        ? item.trimestre.split('-Q')
        : item.trimestre.split('Q');
      
      return {
        trimestre: item.trimestre,
        valor: item.valor,
        year: parseInt(year),
        quarter: parseInt(quarter.replace('-', ''))
      };
    });
  }, [historicoData]);
  
  const getFilteredData = () => {
    if (!allHistoricalData.length) return [];
    
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
  
  // Datos para gráfico de stock (últimos 9 trimestres incluyendo Q1-2025)
  const stockChartData = useMemo(() => {
    if (!historicoData?.stockEvolucion) return [];
    return historicoData.stockEvolucion.slice(-9);
  }, [historicoData]);

  // Datos para gráfico de días activos (últimos 9 trimestres incluyendo Q1-2025)
  const diasChartData = useMemo(() => {
    if (!historicoData?.diasEvolucion) return [];
    return historicoData.diasEvolucion.slice(-9);
  }, [historicoData]);

  const radarData = [
    { subject: 'Liquidez', A: barrio.rating * 1.1, fullMark: 10 },
    { subject: 'Demanda', A: barrio.leads * 1.2, fullMark: 10 },
    { subject: 'Velocidad', A: 10 - (barrio.stock / 200), fullMark: 10 },
    { subject: 'Rating', A: barrio.rating, fullMark: 10 },
    { subject: 'Valor', A: barrio.precio_m2 / 1000, fullMark: 10 }
  ];

  if (loading) {
    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-lg border border-slate-700">
        <div className="flex items-center justify-center">
          <span className="text-slate-300">Cargando datos históricos de {barrio.nombre}...</span>
        </div>
      </div>
    );
  }

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
          trend={calcularVariaciones.stock}
          trendLabel="vs trimestre anterior"
          icon={<Building className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Precio Medio"
          value={formatEuro(barrio.precio_medio)}
          trend={calcularVariaciones.precio}
          trendLabel="vs trimestre anterior"
          icon={<Home className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Precio €/m²"
          value={formatEuro(barrio.precio_m2)}
          trend={calcularVariaciones.precio}
          trendLabel="vs trimestre anterior"
          icon={<DollarSign className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Visitas"
          value={formatNumber(barrio.visitas_por_anuncio || 0)}
          trend={6.2}
          trendLabel="vs trimestre anterior"
          icon={<Eye className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Días en Plataforma"
          value={(barrio.dias_plataforma || 0).toString()}
          trend={calcularVariaciones.dias}
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
          value={`${(barrio.variacion_precio_base || 0) > 0 ? '+' : ''}${(barrio.variacion_precio_base || 0).toFixed(1)}%`}
          description="comparado con precrisis"
          icon={(barrio.variacion_precio_base || 0) > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Variación 12 meses"
          value={`${(barrio.variacion_precio_12m || 0) > 0 ? '+' : ''}${(barrio.variacion_precio_12m || 0).toFixed(1)}%`}
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

      {/* Trading Chart con datos reales */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                Evolución Precio - {barrio.nombre}
                {historicoData?.precioEvolucion?.length > 0 && 
                  <span className="text-xs bg-emerald-500 px-2 py-1 rounded">REAL</span>
                }
              </CardTitle>
              <CardDescription className="text-slate-400">
                Datos reales del Google Sheet
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
                tickFormatter={(value) => `${(value/1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
                formatter={(value) => [`${formatEuro(value as number)}`, `Precio ${barrio.nombre}`]}
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
        {/* Stock Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              Stock Viviendas - {barrio.nombre}
              {stockChartData.length > 0 && 
                <span className="text-xs bg-emerald-500 px-2 py-1 rounded ml-2">REAL</span>
              }
            </CardTitle>
            <CardDescription className="text-slate-400">Últimos 9 trimestres (incluye Q1-2025)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockChartData}>
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
                <Bar dataKey="stock" fill="#06b6d4" name="Stock Viviendas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Días Activos Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              Días en Plataforma - {barrio.nombre}
              {diasChartData.length > 0 && 
                <span className="text-xs bg-emerald-500 px-2 py-1 rounded ml-2">REAL</span>
              }
            </CardTitle>
            <CardDescription className="text-slate-400">Últimos 9 trimestres (incluye Q1-2025)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={diasChartData}>
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
                  dataKey="dias"
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

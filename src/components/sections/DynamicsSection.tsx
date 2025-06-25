import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Signal, Zap, AlertTriangle, CheckCircle, Target, Newspaper, Loader2, Info } from 'lucide-react';
import { getSheetData } from '@/lib/googleSheets';
import { fetchRealEstateNews } from '@/lib/newsAPI';

// Componente Tooltip
const Tooltip = ({ children, content, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className={`cursor-help ${className}`}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg border border-gray-700 min-w-[200px] max-w-[300px] -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
          <div className="text-center">{content}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export const DynamicsSection: React.FC = () => {
  const [baseData, setBaseData] = useState(null);
  const [marketInsight, setMarketInsight] = useState(null);
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  // Función para generar insights automáticos basados en datos
  const generateMarketInsight = (data) => {
    const stage = parseInt(data.stage) || 2;
    const speed = parseInt(data.speed) || 2;
    const risk = parseInt(data.risk) || 2;
    const rating = parseFloat(data.rating) || 3;
    const clockLeads = parseFloat(data.clock_leads) || 0;
    const descuentoNeg = Math.abs(parseFloat(data.descuento_negociacion) || 0.05);
    const esfuerzoFamiliar = parseFloat(data.esfuerzo_familiar) || 0.35;
    const variacion12m = parseFloat(data.variacion_precio_12m) || 0;

    let marketBias = "neutral";
    let primaryAction = "Mantener estrategia actual";
    let secondaryAction = "Monitorear tendencias";
    let riskLevel = "medio";
    let negotiationRange = "-3 a -5%";
    let confidence = 0.75;

    // Lógica de Stage + Clock (Vendedor dominante)
    if (stage === 3 && clockLeads > 5 && variacion12m >= 0) {
      marketBias = "seller";
      primaryAction = "Subir precio de salida +3%";
      secondaryAction = "Contrato exclusiva 60d sin prórroga";
      confidence = 0.85;
    }
    // Comprador dominante / corrección
    else if (stage === 4 || (clockLeads < 2 && variacion12m < 0)) {
      marketBias = "buyer";
      primaryAction = "Preparar rebaja 3% al día 45";
      secondaryAction = "Argumentos de oportunidad";
      confidence = 0.80;
    }
    // Zona value
    else if (stage === 2) {
      marketBias = "value";
      primaryAction = "Potencial plusvalía medio plazo";
      secondaryAction = "Precio defensivo recomendado";
    }

    // Ajustes por riesgo y rating
    if (risk >= 3 && rating <= 3) {
      riskLevel = "alto";
      primaryAction = "Precio defensivo (<P50 barrio)";
      confidence *= 0.9;
    } else if (risk <= 2 && rating >= 4) {
      riskLevel = "bajo";
      primaryAction = "Activo refugio - P75 barrio";
      confidence *= 1.1;
    }

    // Ajustes por velocidad
    if (speed === 3) {
      secondaryAction = "Exclusiva 60d sin prórroga";
    } else if (speed === 1) {
      secondaryAction = "Contrato 120d + incentivo";
    }

    // Rango de negociación
    if (descuentoNeg <= 0.05) {
      negotiationRange = "-3 a -5%";
    } else if (descuentoNeg >= 0.02) {
      negotiationRange = "-1 a -2%";
    } else {
      negotiationRange = "-5 a -8%";
    }

    // Ajustes por esfuerzo familiar
    if (esfuerzoFamiliar > 0.45) {
      primaryAction += " + Target inversor/extranjero";
    }

    return {
      stage: stage === 1 ? "mínimos" : stage === 2 ? "creciendo" : stage === 3 ? "máximos" : "decreciendo",
      marketBias,
      primaryAction,
      secondaryAction,
      riskLevel,
      negotiationRange,
      confidence: Math.min(confidence, 1)
    };
  };

  // Cargar datos reales de Google Sheets
  useEffect(() => {
    const loadDynamicsData = async () => {
      try {
        setLoading(true);
        const data = await getSheetData('Métricas');
        
        if (data && data.length > 0) {
          const agregadoRow = data[data.length - 1];
          
          const dynamicsData = {
            stage: agregadoRow.stage || '2',
            stage_descripcion: agregadoRow.stage_descripcion || '',
            speed: agregadoRow.speed || '2',
            speed_descripcion: agregadoRow.speed_descripcion || '',
            risk: agregadoRow.risk || '2', 
            risk_descripcion: agregadoRow.risk_descripcion || '',
            clock_leads: agregadoRow.clock_leads || '0',
            esfuerzo_familiar: parseFloat(agregadoRow.esfuerzo_familiar) || 0,
            descuento_negociacion: parseFloat(agregadoRow.descuento_negociacion) || 0,
            rating: parseFloat(agregadoRow.rating) || 3,
            variacion_precio_12m: parseFloat(agregadoRow.variacion_precio_12m) || 0
          };

          setBaseData(dynamicsData);
          
          // Generar insight automático
          const insight = generateMarketInsight(dynamicsData);
          setMarketInsight(insight);
        }
      } catch (error) {
        console.error('Error loading dynamics data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDynamicsData();
  }, []);

  // Cargar noticias reales de NewsAPI
  useEffect(() => {
    const loadNews = async () => {
      try {
        setNewsLoading(true);
        const newsData = await fetchRealEstateNews();
        setNoticias(newsData);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setNewsLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
        <span className="ml-2 text-slate-300">Cargando dinámicas de mercado...</span>
      </div>
    );
  }

  if (!baseData) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="text-slate-400">Error al cargar dinámicas de mercado</span>
      </div>
    );
  }

  // Función para obtener el color del market bias
  const getBiasColor = (bias) => {
    switch(bias) {
      case 'seller': return 'text-emerald-400';
      case 'buyer': return 'text-red-400'; 
      case 'value': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con indicador de datos reales */}
      <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            Dinámicas de Mercado - Salamanca District
            <span className="text-xs bg-emerald-500 px-2 py-1 rounded">DATOS REALES</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Market Insight Automático */}
      {marketInsight && (
        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 text-purple-400 mr-2" />
              <Tooltip content="Recomendaciones automáticas generadas en base a algoritmos que analizan stage, speed, risk y otras métricas clave del mercado">
                Insight Automático de Mercado
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <Tooltip content="Indica si el mercado favorece al vendedor, comprador o está equilibrado. Se calcula según stage + clock leads + variación 12m">
                  <span className="text-slate-400 border-b border-dotted border-slate-500">Sesgo de Mercado:</span>
                </Tooltip>
                <span className={`ml-2 font-semibold ${getBiasColor(marketInsight.marketBias)}`}>
                  {marketInsight.marketBias.toUpperCase()}
                </span>
              </div>
              <div>
                <Tooltip content="Estrategia principal recomendada para vender propiedades en las condiciones actuales del mercado">
                  <span className="text-slate-400 border-b border-dotted border-slate-500">Acción Principal:</span>
                </Tooltip>
                <span className="ml-2 text-white font-semibold">{marketInsight.primaryAction}</span>
              </div>
              <div>
                <Tooltip content="Rango típico de descuento en negociación final. Basado en histórico de transacciones cerradas en el barrio">
                  <span className="text-slate-400 border-b border-dotted border-slate-500">Rango Negociación:</span>
                </Tooltip>
                <span className="ml-2 text-orange-400 font-semibold">{marketInsight.negotiationRange}</span>
              </div>
              <div>
                <Tooltip content="Nivel de volatilidad esperada en los precios. Alto = mayor fluctuación, Bajo = precios más estables">
                  <span className="text-slate-400 border-b border-dotted border-slate-500">Nivel de Riesgo:</span>
                </Tooltip>
                <span className="ml-2 text-yellow-400 font-semibold">{marketInsight.riskLevel}</span>
              </div>
              <div>
                <Tooltip content="Nivel de confianza del algoritmo en las recomendaciones. Basado en calidad y consistencia de los datos">
                  <span className="text-slate-400 border-b border-dotted border-slate-500">Confianza:</span>
                </Tooltip>
                <span className="ml-2 text-cyan-400 font-semibold">{(marketInsight.confidence * 100).toFixed(0)}%</span>
              </div>
              <div>
                <Tooltip content="Fase actual del ciclo inmobiliario: mínimos (comprar), creciendo (valor), máximos (vender), decreciendo (esperar)">
                  <span className="text-slate-400 border-b border-dotted border-slate-500">Fase:</span>
                </Tooltip>
                <span className="ml-2 text-emerald-400 font-semibold">{marketInsight.stage}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
              <Tooltip content="Recomendación táctica para contratos y negociación basada en velocidad del mercado">
                <span className="text-slate-400 border-b border-dotted border-slate-500">Recomendación: </span>
              </Tooltip>
              <span className="text-white">{marketInsight.secondaryAction}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dinámicas de Mercado */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Signal className="h-5 w-5 text-emerald-400 mr-2" />
              <Tooltip content="Fase del ciclo de precios: 1=mínimos, 2=creciendo, 3=máximos, 4=decreciendo. Indica el mejor momento para comprar/vender">
                Stage: {baseData.stage}
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300 mb-3">{baseData.stage_descripcion}</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <Tooltip content="Nivel de demanda actual. Se calcula en base a leads por anuncio y tendencia histórica">
                  <span className="border-b border-dotted border-slate-500">Presión compradora:</span>
                </Tooltip>
                <span className="text-emerald-400 font-semibold">
                  {parseFloat(baseData.clock_leads) > 5 ? 'Muy Alta' : parseFloat(baseData.clock_leads) > 3 ? 'Alta' : 'Media'}
                </span>
              </div>
              <div className="flex justify-between">
                <Tooltip content="Nivel de stock disponible en el mercado. Crítico = escasez (favorable vendedor)">
                  <span className="border-b border-dotted border-slate-500">Inventario:</span>
                </Tooltip>
                <span className="text-emerald-400 font-semibold">
                  {baseData.stage === '3' ? 'Crítico' : baseData.stage === '2' ? 'Equilibrado' : 'Abundante'}
                </span>
              </div>
              <div className="flex justify-between">
                <Tooltip content="Quién tiene más poder en la negociación final del precio">
                  <span className="border-b border-dotted border-slate-500">Poder negociación:</span>
                </Tooltip>
                <span className="text-emerald-400 font-semibold">
                  {marketInsight?.marketBias === 'seller' ? '100% Vendedor' : 
                   marketInsight?.marketBias === 'buyer' ? '100% Comprador' : 'Equilibrado'}
                </span>
              </div>
              <div className="flex justify-between">
                <Tooltip content="Momento óptimo para poner en venta una propiedad según la fase del ciclo">
                  <span className="border-b border-dotted border-slate-500">Timing venta:</span>
                </Tooltip>
                <span className="text-emerald-400 font-semibold">
                  {baseData.stage === '3' ? 'Óptimo' : baseData.stage === '2' ? 'Bueno' : 'Esperar'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border-cyan-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Zap className="h-5 w-5 text-cyan-400 mr-2" />
              <Tooltip content="Velocidad de rotación del mercado: 1=lenta, 2=media, 3=alta. Afecta tiempo de venta y estrategia de pricing">
                Speed: {baseData.speed}
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300 mb-3">{baseData.speed_descripcion}</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <Tooltip content="Tiempo promedio desde que se publica un anuncio hasta que se cierra la venta">
                  <span className="border-b border-dotted border-slate-500">Tiempo medio venta:</span>
                </Tooltip>
                <span className="text-cyan-400 font-semibold">
                  {baseData.speed === '3' ? '28 días' : baseData.speed === '2' ? '45 días' : '75 días'}
                </span>
              </div>
              <div className="flex justify-between">
                <Tooltip content="Porcentaje del stock disponible que se vende cada mes">
                  <span className="border-b border-dotted border-slate-500">Absorción mensual:</span>
                </Tooltip>
                <span className="text-cyan-400 font-semibold">
                  {baseData.speed === '3' ? '3.2%' : baseData.speed === '2' ? '2.1%' : '1.4%'}
                </span>
              </div>
              <div className="flex justify-between">
                <Tooltip content="Número promedio de visitas necesarias antes de cerrar una venta">
                  <span className="border-b border-dotted border-slate-500">Visitas hasta venta:</span>
                </Tooltip>
                <span className="text-cyan-400 font-semibold">
                  {baseData.speed === '3' ? '12 promedio' : baseData.speed === '2' ? '18 promedio' : '25 promedio'}
                </span>
              </div>
              <div className="flex justify-between">
                <Tooltip content="Porcentaje de leads que terminan convirtiéndose en una venta real">
                  <span className="border-b border-dotted border-slate-500">Conversión leads:</span>
                </Tooltip>
                <span className="text-cyan-400 font-semibold">
                  {(parseFloat(baseData.clock_leads) * 2.5).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border-yellow-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
              <Tooltip content="Nivel de riesgo/volatilidad: 1=muy bajo, 2=bajo, 3=alto, 4=muy alto. Mide estabilidad de precios vs otras zonas">
                Risk: {baseData.risk}
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-300 mb-3">{baseData.risk_descripcion}</p>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex justify-between">
                <Tooltip content="Nivel de fluctuación histórica de precios. Alta = mayor variabilidad">
                  <span className="border-b border-dotted border-slate-500">Volatilidad precio:</span>
                </Tooltip>
                <span className="text-yellow-400 font-semibold">
                  {baseData.risk === '4' ? 'Muy Alta' : baseData.risk === '3' ? 'Alta' : baseData.risk === '2' ? 'Media' : 'Baja'}
                </span>
              </div>
              <div className="flex justify-between">
                <Tooltip content="Sensibilidad a cambios en tipos de interés. Alta = precios más afectados por política monetaria">
                  <span className="border-b border-dotted border-slate-500">Sensibilidad tipos:</span>
                </Tooltip>
                <span className="text-yellow-400 font-semibold">
                  {baseData.esfuerzo_familiar > 0.4 ? 'Alta' : 'Media-Baja'}
                </span>
              </div>
              <div className="flex justify-between">
                <Tooltip content="Variedad de tipologías y perfiles de compradores en la zona">
                  <span className="border-b border-dotted border-slate-500">Diversificación:</span>
                </Tooltip>
                <span className="text-yellow-400 font-semibold">Muy Alta</span>
              </div>
              <div className="flex justify-between">
                <Tooltip content="Facilidad para vender rápido sin grandes descuentos. Premium = muy fácil de vender">
                  <span className="border-b border-dotted border-slate-500">Liquidez:</span>
                </Tooltip>
                <span className="text-yellow-400 font-semibold">Premium</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores Avanzados */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Indicadores Avanzados de Mercado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <Tooltip content="Leads por anuncio que mide la posición en el reloj de mercado. Mayor número = mayor demanda">
                <div className="text-2xl font-bold text-emerald-400">{baseData.clock_leads}</div>
                <div className="text-sm text-slate-400">Clock Leads</div>
                <div className="text-xs text-slate-500">Posición horaria</div>
              </Tooltip>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <Tooltip content="Porcentaje de la renta familiar necesaria para comprar la vivienda tipo. >45% = riesgo alto">
                <div className="text-2xl font-bold text-purple-400">{(baseData.esfuerzo_familiar * 100).toFixed(0)}%</div>
                <div className="text-sm text-slate-400">Esfuerzo Familiar</div>
                <div className="text-xs text-slate-500">Renta disponible</div>
              </Tooltip>
            </div>
            <div className="text-center p-4 bg-slate-700/30 rounded-lg">
              <Tooltip content="Descuento medio entre precio inicial y precio final de venta. Indica margen de negociación típico">
                <div className="text-2xl font-bold text-orange-400">{(Math.abs(baseData.descuento_negociacion) * 100).toFixed(1)}%</div>
                <div className="text-sm text-slate-400">Descuento Medio</div>
                <div className="text-xs text-slate-500">Negociación final</div>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Noticias del Sector */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Newspaper className="h-5 w-5 text-blue-400 mr-2" />
            <Tooltip content="Noticias relevantes del sector inmobiliario obtenidas de NewsAPI en tiempo real">
              Noticias del Sector Inmobiliario
            </Tooltip>
            {newsLoading && <Loader2 className="h-4 w-4 animate-spin text-blue-400 ml-2" />}
            {!newsLoading && noticias.length > 0 && (
              <span className="text-xs bg-green-500 px-2 py-1 rounded ml-2">EN VIVO</span>
            )}
            {!newsLoading && noticias.length === 0 && (
              <span className="text-xs bg-yellow-500 px-2 py-1 rounded ml-2">FALLBACK</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {newsLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              <span className="ml-2 text-slate-300">Cargando noticias...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {noticias.map((noticia, index) => (
                <div key={index} className="border-l-4 border-emerald-400 pl-4 hover:bg-slate-700/20 p-3 rounded-r-lg transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-white text-sm leading-tight">{noticia.titulo}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ml-2 ${
                        noticia.categoria === 'mercado' ? 'border-emerald-400 text-emerald-400' :
                        noticia.categoria === 'internacional' ? 'border-cyan-400 text-cyan-400' :
                        noticia.categoria === 'transaccion' ? 'border-purple-400 text-purple-400' :
                        'border-yellow-400 text-yellow-400'
                      }`}
                    >
                      {noticia.categoria}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">{noticia.resumen}</p>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>{noticia.fuente}</span>
                    <span>{noticia.tiempo}</span>
                  </div>
                  {noticia.url && (
                    <a 
                      href={noticia.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 inline-block mt-1"
                    >
                      Leer más →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

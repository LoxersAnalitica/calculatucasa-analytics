
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Signal, Zap, AlertTriangle, CheckCircle, Target, Newspaper } from 'lucide-react';
import { insights } from '@/utils/mockData';

interface DynamicsSectionProps {
  baseData: any;
}

export const DynamicsSection: React.FC<DynamicsSectionProps> = ({ baseData }) => {
  const noticias = [
    {
      titulo: "Salamanca lidera crecimiento premium en Madrid Q1-2025",
      resumen: "Los precios suben un 6.4% interanual, consolidando máximos históricos en el distrito más exclusivo de la capital",
      tiempo: "Hace 2 horas",
      fuente: "El Economista",
      categoria: "mercado"
    },
    {
      titulo: "Demanda internacional bate récords en Barrio Salamanca",
      resumen: "HNWI latinoamericanos duplican inversión inmobiliaria, especialmente en propiedades de lujo entre Serrano y Velázquez",
      tiempo: "Hace 4 horas",
      fuente: "Expansión",
      categoria: "internacional"
    },
    {
      titulo: "Nuevo récord: €12.500/m² en Calle Serrano",
      resumen: "Ático de 200m² se vende por €2.5M, estableciendo nuevo máximo por metro cuadrado en la zona golden mile",
      tiempo: "Hace 8 horas",
      fuente: "Cinco Días",
      categoria: "transaccion"
    },
    {
      titulo: "Escasez de stock impulsa precios en zona prime",
      resumen: "Solo 847 viviendas disponibles en Q1, un 15% menos que el trimestre anterior. La demanda supera ampliamente la oferta",
      tiempo: "Hace 12 horas",
      fuente: "Idealista News",
      categoria: "mercado"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Dinámicas de Mercado */}
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
                <span className="text-emerald-400 font-semibold">Muy Alta</span>
              </div>
              <div className="flex justify-between">
                <span>Inventario:</span>
                <span className="text-emerald-400 font-semibold">Crítico</span>
              </div>
              <div className="flex justify-between">
                <span>Poder negociación:</span>
                <span className="text-emerald-400 font-semibold">100% Vendedor</span>
              </div>
              <div className="flex justify-between">
                <span>Timing venta:</span>
                <span className="text-emerald-400 font-semibold">Óptimo</span>
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
                <span className="text-cyan-400 font-semibold">28 días</span>
              </div>
              <div className="flex justify-between">
                <span>Absorción mensual:</span>
                <span className="text-cyan-400 font-semibold">3.2%</span>
              </div>
              <div className="flex justify-between">
                <span>Visitas hasta venta:</span>
                <span className="text-cyan-400 font-semibold">12 promedio</span>
              </div>
              <div className="flex justify-between">
                <span>Conversión leads:</span>
                <span className="text-cyan-400 font-semibold">18.5%</span>
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
                <span className="text-yellow-400 font-semibold">Baja</span>
              </div>
              <div className="flex justify-between">
                <span>Sensibilidad tipos:</span>
                <span className="text-yellow-400 font-semibold">Media-Baja</span>
              </div>
              <div className="flex justify-between">
                <span>Diversificación:</span>
                <span className="text-yellow-400 font-semibold">Muy Alta</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidez:</span>
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

      {/* Insights */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Insights del Mercado</h3>
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

      {/* Noticias del Sector */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Newspaper className="h-5 w-5 text-blue-400 mr-2" />
            Noticias del Sector Inmobiliario
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                      'border-purple-400 text-purple-400'
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Signal, Zap, AlertTriangle } from 'lucide-react';

interface DynamicsSectionProps {
  baseData: any;
}

export const DynamicsSection: React.FC<DynamicsSectionProps> = ({ baseData }) => {
  return (
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
};

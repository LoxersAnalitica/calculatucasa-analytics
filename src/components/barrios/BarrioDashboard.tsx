
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/StatsCard';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Building, Target, Star } from 'lucide-react';
import { formatEuro, formatNumber } from '@/utils/formatters';

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
  return (
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
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/StatsCard';
import { Users, DollarSign, FileText, Heart, Home } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatEuro, formatNumber } from '@/utils/formatters';

interface SociodemografiaSectionProps {
  baseData: any;
}

export const SociodemografiaSection: React.FC<SociodemografiaSectionProps> = ({ baseData }) => {
  const poblacionData = [
    { name: 'Nacional', value: baseData.poblacion_nacional, color: '#06b6d4' },
    { name: 'Extranjera', value: baseData.poblacion_extranjera, color: '#8b5cf6' }
  ];

  const generoData = [
    { name: 'Masculina', value: baseData.poblacion_masculina, color: '#10b981' },
    { name: 'Femenina', value: baseData.poblacion_femenina, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <StatsCard
          title="Edad Media"
          value={`${baseData.edad_media} años`}
          description="promedio"
          icon={<Users className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
      </div>

      {/* Segunda fila de KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Población Casada"
          value={`${baseData.casados}%`}
          description="del total"
          icon={<Heart className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Hogares Unipersonales"
          value={`${baseData.hogares_unipersonales}%`}
          description="del total"
          icon={<Home className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
        <StatsCard
          title="Extranjeros"
          value={`${((baseData.poblacion_extranjera / baseData.poblacion_total) * 100).toFixed(1)}%`}
          description="del total"
          icon={<Users className="h-4 w-4" />}
          className="bg-slate-800/50 border-slate-700"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Composición Nacional vs Extranjera */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Composición Poblacional</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={poblacionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${((value / baseData.poblacion_total) * 100).toFixed(1)}%`}
                >
                  {poblacionData.map((entry, index) => (
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

        {/* Distribución por Género */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Distribución por Género</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={generoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detalles adicionales */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Detalles Sociodemográficos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-300">
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Composición Familiar</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Casados</span>
                  <span className="font-semibold">{baseData.casados}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Hogares unipersonales</span>
                  <span className="font-semibold">{baseData.hogares_unipersonales}%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Vivienda</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Vivienda propia</span>
                  <span className="font-semibold">{baseData.viviendas_propias}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Vivienda alquiler</span>
                  <span className="font-semibold">{baseData.viviendas_alquiler}%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Perfil Educativo</h4>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Estudios superiores</span>
                  <span className="font-semibold">{baseData.estudios_superiores}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Renta media</span>
                  <span className="font-semibold">{formatEuro(baseData.renta_familiar)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

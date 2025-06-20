
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/StatsCard';
import { Users, DollarSign, FileText } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { formatEuro, formatNumber } from '@/utils/formatters';

interface DemographicsSectionProps {
  baseData: any;
}

export const DemographicsSection: React.FC<DemographicsSectionProps> = ({ baseData }) => {
  const pieData = [
    { name: 'Nacional', value: baseData.poblacion_nacional, color: '#06b6d4' },
    { name: 'Extranjera', value: baseData.poblacion_extranjera, color: '#8b5cf6' }
  ];

  return (
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
};

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin } from 'lucide-react';
import { BarrioDashboard } from '@/components/barrios/BarrioDashboard';
import { formatEuro, formatNumber } from '@/utils/formatters';
import { getBarriosData } from '@/lib/googleSheets';

export const BarriosSection: React.FC = () => {
  const [selectedBarrio, setSelectedBarrio] = useState('');
  const [barriosData, setBarriosData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBarriosData = async () => {
      try {
        setLoading(true);
        const data = await getBarriosData();
        if (data && data.length > 0) {
          setBarriosData(data);
        }
      } catch (error) {
        console.error('Error loading barrios data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBarriosData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="h-5 w-5 text-emerald-400 mr-2" />
              Cargando datos de barrios...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-10 bg-slate-700 rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {barriosData.length > 0 && (
        <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-3">
          <p className="text-emerald-400 text-sm text-center">
            ✅ Datos de barrios actualizados desde Google Sheets - {barriosData.length} barrios disponibles
          </p>
        </div>
      )}

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="h-5 w-5 text-emerald-400 mr-2" />
            Seleccionar Sub-barrio para Dashboard Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {barriosData.map((barrio, index) => (
              <Button
                key={index}
                variant={selectedBarrio === barrio.nombre ? "default" : "outline"}
                onClick={() => setSelectedBarrio(selectedBarrio === barrio.nombre ? '' : barrio.nombre)}
                className={selectedBarrio === barrio.nombre ? 
                  "bg-emerald-600 text-white" : 
                  "border-slate-600 text-slate-300 hover:bg-slate-700"
                }
              >
                {barrio.nombre}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Comparativa por Sub-barrios</CardTitle>
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
                  <th className="text-center p-2 text-slate-300">Estado</th>
                </tr>
              </thead>
              <tbody>
                {barriosData.map((barrio, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-slate-700 hover:bg-slate-700/30 cursor-pointer ${
                      selectedBarrio === barrio.nombre ? 'bg-emerald-900/20' : ''
                    }`}
                    onClick={() => setSelectedBarrio(selectedBarrio === barrio.nombre ? '' : barrio.nombre)}
                  >
                    <td className="p-2 font-medium text-white">{barrio.nombre}</td>
                    <td className="p-2 text-right text-slate-300">{formatEuro(barrio.precio_m2)}</td>
                    <td className="p-2 text-right text-slate-300">{formatNumber(barrio.stock)}</td>
                    <td className="p-2 text-right text-slate-300">{barrio.leads}</td>
                    <td className="p-2 text-right text-slate-300">
                      <div className="flex items-center justify-end">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {barrio.rating ? barrio.rating.toFixed(1) : '0.0'}
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      {selectedBarrio === barrio.nombre ? (
                        <span className="text-emerald-400 text-xs">Activo</span>
                      ) : (
                        <span className="text-slate-500 text-xs">Click para activar</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedBarrio && (
        <BarrioDashboard barrio={barriosData.find(b => b.nombre === selectedBarrio)!} />
      )}
    </div>
  );
};

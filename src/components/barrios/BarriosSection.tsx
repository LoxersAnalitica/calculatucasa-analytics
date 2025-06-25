import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Loader2 } from 'lucide-react';
import { BarrioDashboard } from '@/components/barrios/BarrioDashboard';
import { formatEuro, formatNumber } from '@/utils/formatters';
import { getSheetData } from '@/lib/googleSheets';

export const BarriosSection: React.FC = () => {
  const [selectedBarrio, setSelectedBarrio] = useState('');
  const [barrios, setBarrios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos reales de Google Sheets
  useEffect(() => {
    const loadBarrios = async () => {
      try {
        setLoading(true);
        const data = await getSheetData('Métricas');
        
        console.log('📊 DATOS RECIBIDOS:', data);
        console.log('📊 PRIMERA FILA:', data[0]);
        console.log('📊 COLUMNAS:', Object.keys(data[0] || {}));
        
        if (data && data.length > 0) {
const barriosData = data.map(row => ({
  nombre: row.barrio || '',
  precio_m2: parseInt(row.precio_m2) || 0,
  precio_medio: parseInt(row.precio_medio) || 0,
  stock: parseInt(row.viviendas_en_venta) || 0,
  leads: parseFloat(row.leads_por_anuncio) || 0,
  rating: parseFloat(row.rating) || 0,
  poblacion_total: parseInt(row.poblacion_total) || 0,
  renta_familiar: parseInt(row.renta_familiar) || 0,
  edad_media: parseFloat(row.edad_media) || 0,
  esfuerzo_familiar: parseFloat(row.esfuerzo_familiar) || 0,
  descuento_negociacion: parseFloat(row.descuento_negociacion) || 0,
  stage: row.stage || 'N/A',
  speed: row.speed || 'N/A',
  risk: row.risk || 'N/A',
  visitas_por_anuncio: parseInt(row.visitas_por_anuncio) || 0,
  dias_plataforma: parseInt(row.dias_plataforma) || 0,
  variacion_precio_base: parseFloat(row.variacion_precio_base) || 0,
  variacion_precio_12m: parseFloat(row.variacion_precio_12m) || 0
})).filter(barrio => barrio.nombre);          
          console.log('📊 BARRIOS PROCESADOS:', barriosData);
          setBarrios(barriosData);
        }
      } catch (error) {
        console.error('Error loading barrios:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBarrios();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
        <span className="ml-2 text-slate-300">Cargando datos de barrios...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="h-5 w-5 text-emerald-400 mr-2" />
            Seleccionar Sub-barrio para Dashboard Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {barrios.map((barrio, index) => (
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
                {barrios.map((barrio, index) => (
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
                        {barrio.rating}
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
        <BarrioDashboard barrio={barrios.find(b => b.nombre === selectedBarrio)!} />
      )}
    </div>
  );
};

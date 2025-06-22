
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, FileText, MapPin, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const ValoracionSection: React.FC = () => {
  const [referencia, setReferencia] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!referencia && !direccion) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, introduce una referencia catastral o dirección.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Estamos desarrollando este departamento",
      description: "Nos pondremos en contacto contigo para proporcionarte el informe personalizado de tasación con 30 testigos.",
      duration: 5000
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-700/50">
        <CardHeader>
          <CardTitle className="flex items-center text-white text-2xl">
            <Calculator className="h-6 w-6 text-emerald-400 mr-3" />
            Valoración Personalizada
          </CardTitle>
          <p className="text-slate-300 text-lg">
            Obtén un informe detallado de tasación con 30 testigos comparables
          </p>
        </CardHeader>
      </Card>

      {/* Formulario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="h-5 w-5 text-cyan-400 mr-2" />
              Datos de la Propiedad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="referencia" className="text-slate-300">
                  Referencia Catastral
                </Label>
                <Input
                  id="referencia"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  placeholder="Ej: 5014801VK4751B0001QS"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-400">
                  Formato: 20 caracteres alfanuméricos
                </p>
              </div>

              <div className="text-center text-slate-400 py-2">
                <span>- O -</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion" className="text-slate-300">
                  Dirección Completa
                </Label>
                <Input
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ej: Calle Serrano 123, 28006 Madrid"
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-400">
                  Incluye calle, número, código postal y ciudad
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                size="lg"
              >
                <FileText className="h-4 w-4 mr-2" />
                Solicitar Informe de Valoración
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Información del servicio */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileText className="h-5 w-5 text-purple-400 mr-2" />
              ¿Qué incluye tu informe?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-semibold">Valoración de mercado</h4>
                  <p className="text-slate-300 text-sm">Precio estimado basado en datos actuales</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-semibold">30 Testigos comparables</h4>
                  <p className="text-slate-300 text-sm">Propiedades similares vendidas recientemente</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-semibold">Análisis de mercado</h4>
                  <p className="text-slate-300 text-sm">Tendencias y evolución del precio por zona</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-semibold">Recomendaciones</h4>
                  <p className="text-slate-300 text-sm">Estrategias de precio y timing de venta</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-blue-400 font-semibold text-sm">Tiempo de entrega</h4>
                  <p className="text-slate-300 text-sm">48-72 horas laborables</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ejemplos de informes */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Ejemplos de Valoraciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <h4 className="text-white font-semibold">Calle Velázquez</h4>
              <p className="text-slate-300 text-sm">3 hab, 120m² - Valoración: €890,000</p>
              <p className="text-emerald-400 text-xs mt-1">30 testigos analizados</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <h4 className="text-white font-semibold">Calle Serrano</h4>
              <p className="text-slate-300 text-sm">4 hab, 150m² - Valoración: €1,250,000</p>
              <p className="text-emerald-400 text-xs mt-1">28 testigos analizados</p>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-lg">
              <h4 className="text-white font-semibold">Calle Goya</h4>
              <p className="text-slate-300 text-sm">2 hab, 85m² - Valoración: €650,000</p>
              <p className="text-emerald-400 text-xs mt-1">32 testigos analizados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

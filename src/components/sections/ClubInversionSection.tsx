
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  TrendingUp, 
  Clock, 
  FileText, 
  Target,
  Check,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ClubInversionSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-600/10 border-amber-500/20">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-400/20 rounded-full">
              <Crown className="h-8 w-8 text-amber-400" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white mb-2">
            Club de Inversión
          </CardTitle>
          <p className="text-slate-300 text-lg">
            Acceso exclusivo a oportunidades off-market
          </p>
        </CardHeader>
      </Card>

      {/* Benefits Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Para Inversores */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="h-5 w-5 text-amber-400 mr-2" />
              Para Inversores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-slate-300 text-lg font-medium">
                Vende tus propiedades off-market con:
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="p-1 bg-green-500/20 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-slate-300">
                    <span className="text-amber-400 font-bold">25% menos</span> descuento de negociación
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-green-500/20 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-slate-300">
                    <span className="text-amber-400 font-bold">10% más rápido</span> que la media del sector
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-green-500/20 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-slate-300">Acceso a compradores cualificados</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Para Inmobiliarias */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 text-amber-400 mr-2" />
              Para Inmobiliarias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="p-1 bg-green-500/20 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-slate-300">
                    <span className="text-amber-400 font-bold">1 informe</span> de tasación incluido/mes
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-green-500/20 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-slate-300">Fuente de prospección de propiedades</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-green-500/20 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-slate-300">Analytics avanzados del mercado</span>
                </div>
                <div className="flex items-center">
                  <div className="p-1 bg-green-500/20 rounded-full mr-3">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-slate-300">Dashboard personalizado por barrios</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Plan Mensual */}
        <Card className="bg-slate-800/50 border-slate-700 relative">
          <CardHeader>
            <CardTitle className="text-white text-center">Plan Mensual</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-2">
                99€
                <span className="text-lg font-normal text-slate-400">/mes</span>
              </div>
              <p className="text-slate-400">+ IVA</p>
              <Badge variant="outline" className="border-amber-400 text-amber-400 mt-2">
                Sin permanencia
              </Badge>
            </div>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold">
              Comenzar ahora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Plan Anual */}
        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30 relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-amber-500 text-black">
              <Sparkles className="h-3 w-3 mr-1" />
              Más popular
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-white text-center">Plan Anual</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-4xl font-bold text-white mb-2">
                900€
                <span className="text-lg font-normal text-slate-400">/año</span>
              </div>
              <p className="text-slate-400">+ IVA</p>
              <div className="mt-2 space-y-1">
                <Badge variant="outline" className="border-green-400 text-green-400">
                  Ahorro del 24%
                </Badge>
                <p className="text-sm text-slate-400">
                  (2 meses gratis)
                </p>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold">
              Ahorra 288€ al año
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Benefits */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">¿Qué incluye la membresía?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="p-3 bg-amber-400/20 rounded-full w-fit mx-auto mb-3">
                <FileText className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Informes Exclusivos</h4>
              <p className="text-slate-400 text-sm">
                Acceso a datos que no encontrarás en ninguna otra plataforma
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-amber-400/20 rounded-full w-fit mx-auto mb-3">
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Tiempo Real</h4>
              <p className="text-slate-400 text-sm">
                Datos actualizados semanalmente desde Q1-2015
              </p>
            </div>
            <div className="text-center">
              <div className="p-3 bg-amber-400/20 rounded-full w-fit mx-auto mb-3">
                <Target className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Soporte Premium</h4>
              <p className="text-slate-400 text-sm">
                Atención personalizada y consultoría especializada
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Source Note */}
      <Card className="bg-slate-900/50 border-slate-600">
        <CardContent className="pt-6">
          <p className="text-slate-400 text-sm text-center">
            * Todos los datos se actualizan automáticamente desde nuestras fuentes verificadas.
            Los informes se generan en base a más de 10 años de datos históricos del mercado inmobiliario.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

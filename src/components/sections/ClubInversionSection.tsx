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
  ArrowRight,
  Building2,
  Users,
  Shield,
  Zap,
  BarChart3,
  Phone,
  Bell,
  Database
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
            Club de Inversión Premium
          </CardTitle>
          <p className="text-slate-300 text-lg">
            Acceso exclusivo para inversores, propietarios y agencias inmobiliarias
          </p>
          <Badge className="bg-amber-500 text-black mt-3 text-sm px-4 py-1">
            <Sparkles className="h-4 w-4 mr-1" />
            Solo 9€/mes
          </Badge>
        </CardHeader>
      </Card>

      {/* Para Quién es */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="h-5 w-5 text-amber-400 mr-2" />
              Inversores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                Oportunidades off-market
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                Análisis de rentabilidad
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                Alertas de oportunidades
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 text-amber-400 mr-2" />
              Propietarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                Tasaciones gratuitas
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                Seguimiento del valor
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                Estrategias de venta
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-colors">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Building2 className="h-5 w-5 text-amber-400 mr-2" />
              Agencias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                Herramientas profesionales
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                Dashboard personalizado
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-green-400 mr-2" />
                Leads cualificados
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Plan Único */}
      <div className="flex justify-center">
        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30 relative max-w-md w-full">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-amber-500 text-black">
              <Sparkles className="h-3 w-3 mr-1" />
              Plan Único
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">Club Premium</CardTitle>
            <p className="text-slate-300 text-center">Todo incluido</p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-5xl font-bold text-white mb-2">
                9€
                <span className="text-lg font-normal text-slate-400">/mes</span>
              </div>
              <p className="text-slate-400">+ IVA</p>
              <Badge variant="outline" className="border-green-400 text-green-400 mt-2">
                Sin permanencia
              </Badge>
            </div>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold mb-4">
              Únete al Club
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-slate-400 text-sm">
              Cancela cuando quieras
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Beneficios Principales */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-center">¿Qué incluye tu membresía?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="p-3 bg-amber-400/20 rounded-full w-fit mx-auto mb-3">
                <FileText className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">1 Informe Semanal</h4>
              <p className="text-slate-400 text-sm">
                Análisis detallado del mercado con tendencias y oportunidades
              </p>
            </div>
            
            <div className="text-center">
              <div className="p-3 bg-amber-400/20 rounded-full w-fit mx-auto mb-3">
                <Target className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">4 Tasaciones/Mes</h4>
              <p className="text-slate-400 text-sm">
                Valoraciones profesionales con 30 testigos comparables
              </p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-amber-400/20 rounded-full w-fit mx-auto mb-3">
                <Shield className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Oportunidades Off-Market</h4>
              <p className="text-slate-400 text-sm">
                Acceso exclusivo a propiedades antes de salir al mercado
              </p>
            </div>

            <div className="text-center">
              <div className="p-3 bg-amber-400/20 rounded-full w-fit mx-auto mb-3">
                <Phone className="h-6 w-6 text-amber-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Asesoría Personalizada</h4>
              <p className="text-slate-400 text-sm">
                Consultoría directa con expertos del sector inmobiliario
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beneficios Adicionales */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Beneficios adicionales incluidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-1 bg-green-500/20 rounded-full mr-3 mt-1">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Dashboard Personalizado</h5>
                  <p className="text-slate-400 text-sm">Analytics avanzados por barrios con métricas exclusivas</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-1 bg-green-500/20 rounded-full mr-3 mt-1">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Alertas Inteligentes</h5>
                  <p className="text-slate-400 text-sm">Notificaciones automáticas de cambios en tu zona de interés</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-1 bg-green-500/20 rounded-full mr-3 mt-1">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Análisis de Competencia</h5>
                  <p className="text-slate-400 text-sm">Seguimiento de propiedades similares y estrategias de pricing</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-1 bg-green-500/20 rounded-full mr-3 mt-1">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Histórico Completo</h5>
                  <p className="text-slate-400 text-sm">Acceso a datos desde 2015 con análisis de ciclos de mercado</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-1 bg-green-500/20 rounded-full mr-3 mt-1">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Red de Contactos</h5>
                  <p className="text-slate-400 text-sm">Conexión con inversores, propietarios y profesionales del sector</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-1 bg-green-500/20 rounded-full mr-3 mt-1">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Herramientas Profesionales</h5>
                  <p className="text-slate-400 text-sm">Calculadoras de rentabilidad, simuladores y comparadores</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-1 bg-green-500/20 rounded-full mr-3 mt-1">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Soporte Prioritario</h5>
                  <p className="text-slate-400 text-sm">Atención premium con respuesta en menos de 24 horas</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-1 bg-green-500/20 rounded-full mr-3 mt-1">
                  <Check className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Webinars Exclusivos</h5>
                  <p className="text-slate-400 text-sm">Formación mensual con expertos del mercado inmobiliario</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de Valor */}
      <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-700/50">
        <CardHeader>
          <CardTitle className="text-white text-center">El valor de tu membresía</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">+25%</div>
              <p className="text-slate-300 text-sm">Mejor precio de venta vs mercado tradicional</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">-40%</div>
              <p className="text-slate-300 text-sm">Tiempo en mercado vs media del sector</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">500€</div>
              <p className="text-slate-300 text-sm">Valor de las tasaciones incluidas</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">15+</div>
              <p className="text-slate-300 text-sm">Oportunidades off-market al mes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action Final */}
      <Card className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-600/10 border-amber-500/20">
        <CardContent className="pt-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            ¿Listo para maximizar tus inversiones inmobiliarias?
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Únete a más de 500 profesionales que ya forman parte del Club Premium y obtén acceso 
            inmediato a todas las herramientas y datos que necesitas para tomar mejores decisiones.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold">
            Comenzar mi prueba gratuita de 7 días
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-slate-400 text-sm mt-3">
            Sin compromiso • Cancela cuando quieras • Soporte incluido
          </p>
        </CardContent>
      </Card>

      {/* Data Source Note */}
      <Card className="bg-slate-900/50 border-slate-600">
        <CardContent className="pt-6">
          <p className="text-slate-400 text-sm text-center">
            * Todos los datos se actualizan semanalmente desde nuestras fuentes verificadas.
            Los informes se generan en base a más de 10 años de datos históricos del mercado inmobiliario del Distrito Salamanca.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BarChart3, TrendingUp, Users, Shield, CheckCircle, LineChart, PieChart, Building2, UserCheck, DollarSign } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from 'recharts';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Análisis de Mercado',
      description: 'Datos en tiempo real de precios, stock y demanda por barrios'
    },
    {
      icon: TrendingUp,
      title: 'Tendencias Históricas',
      description: 'Evolución de precios desde 2015 con filtros temporales avanzados'
    },
    {
      icon: Users,
      title: 'Métricas de Demanda',
      description: 'Leads por anuncio, visitas y días en plataforma por zona'
    },
    {
      icon: Shield,
      title: 'Datos Verificados',
      description: 'Información actualizada automáticamente desde fuentes oficiales'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      role: 'Directora Comercial, Inmobiliaria Premium',
      content: 'CalculaTuCasa nos ha permitido optimizar nuestras estrategias de pricing. Hemos incrementado nuestras ventas un 25% en el último trimestre.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Agente Inmobiliario Independiente',
      content: 'Los datos de demanda por barrios me ayudan a enfocar mis esfuerzos comerciales donde realmente hay oportunidades. Imprescindible.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Ana Martín',
      role: 'Inversora Inmobiliaria',
      content: 'Gracias a los análisis históricos pude identificar el momento perfecto para invertir en Recoletos. ROI del 18% en 8 meses.',
      avatar: '/placeholder.svg'
    }
  ];

  const stats = [
    { value: '6', label: 'Barrios Analizados' },
    { value: '10+', label: 'Años de Datos' },
    { value: '15K+', label: 'Propiedades Monitoreadas' },
    { value: '98%', label: 'Precisión en Tendencias' }
  ];

  const valuePropositions = [
    {
      icon: DollarSign,
      title: 'Inversores',
      benefits: [
        'Maximiza tu rentabilidad con insights basados en datos',
        'Identifica propiedades con alto potencial de revalorización',
        'Accede a tendencias del mercado en tiempo real y supera a la competencia'
      ]
    },
    {
      icon: Building2,
      title: 'Inmobiliarias',
      benefits: [
        'Obtén ventaja competitiva con analíticas avanzadas del mercado',
        'Optimiza tus listados y atrae leads cualificados',
        'Comprende el comportamiento del comprador y adapta tus estrategias'
      ]
    },
    {
      icon: UserCheck,
      title: 'Propietarios',
      benefits: [
        'Obtén una visión clara del valor de tu propiedad en el mercado actual',
        'Mantente informado sobre las tendencias del barrio',
        'Accede a los datos que necesitas para vender o alquilar efectivamente'
      ]
    }
  ];

  // Mock data for the interactive chart
  const chartData = [
    { quarter: 'Q1-23', precio: 7850 },
    { quarter: 'Q2-23', precio: 8100 },
    { quarter: 'Q3-23', precio: 8250 },
    { quarter: 'Q4-23', precio: 8400 },
    { quarter: 'Q1-24', precio: 8650 },
    { quarter: 'Q2-24', precio: 8750 },
    { quarter: 'Q3-24', precio: 8900 },
    { quarter: 'Q4-24', precio: 8950 },
    { quarter: 'Q1-25', precio: 9200 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/10 to-amber-500/5 animate-pulse-gentle"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              CalculaTuCasa
            </div>
            <Button 
              onClick={handleGetStarted}
              variant="outline" 
              className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black"
            >
              Iniciar Sesión
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              El Dashboard de analítica inmobiliaria
              <span className="block bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                más completo del Barrio Salamanca
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Analiza precios, stock y demanda de los barrios más exclusivos de Madrid. 
              Datos en tiempo real desde 2015 para tomar las mejores decisiones inmobiliarias.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 text-lg"
              >
                Probar Gratis Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview with Interactive Chart */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Dashboard Profesional
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Visualiza todos los datos del mercado inmobiliario en una interfaz intuitiva y moderna
              </p>
            </div>

            {/* Mock Dashboard Screenshot with blur effect */}
            <div className="relative max-w-6xl mx-auto">
              <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6 backdrop-blur-lg shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Precio Medio/m²</p>
                          <p className="text-2xl font-bold text-white">€9,200</p>
                          <p className="text-green-400 text-sm">+12.5% vs Q4-2024</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-amber-400" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Viviendas en Venta</p>
                          <p className="text-2xl font-bold text-white">1,247</p>
                          <p className="text-red-400 text-sm">-8.2% vs Q4-2024</p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-amber-400" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-sm">Días en Plataforma</p>
                          <p className="text-2xl font-bold text-white">89</p>
                          <p className="text-green-400 text-sm">-15.3% vs Q4-2024</p>
                        </div>
                        <Users className="h-8 w-8 text-amber-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Interactive Chart with blur effect */}
                <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-600 relative overflow-hidden">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Evolución Precio/m² - Barrio Salamanca</h3>
                    <p className="text-slate-400 text-sm">Datos históricos desde 2023</p>
                  </div>
                  
                  <div className="h-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="quarter" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 12 }}
                          tickFormatter={(value) => `€${value}`}
                        />
                        <Area
                          type="monotone"
                          dataKey="precio"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          fill="url(#priceGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    
                    {/* Blur overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-900/60 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-900/60 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
              
              {/* Additional blur effect around the entire dashboard */}
              <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent blur-2xl -z-10"></div>
            </div>
          </div>
        </section>

        {/* Value Propositions Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Diseñado Para Tu Éxito
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Independientemente de tu perfil, CalculaTuCasa te proporciona las herramientas exactas que necesitas
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {valuePropositions.map((proposition, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center mr-4">
                        <proposition.icon className="h-6 w-6 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {proposition.title}
                      </h3>
                    </div>
                    
                    <ul className="space-y-3">
                      {proposition.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm leading-relaxed">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Funcionalidades Profesionales
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Todo lo que necesitas para analizar el mercado inmobiliario de Madrid
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-amber-400/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <feature.icon className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Lo Que Dicen Nuestros Usuarios
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Profesionales inmobiliarios que ya confían en CalculaTuCasa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <p className="text-slate-300 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-semibold">
                          {testimonial.name}
                        </p>
                        <p className="text-slate-400 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <div className="bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-lg border border-amber-400/20 p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Comienza Tu Análisis Inmobiliario Hoy
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Únete a cientos de profesionales que ya toman mejores decisiones con datos precisos
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button 
                  onClick={handleGetStarted}
                  size="lg" 
                  className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-3 text-lg"
                >
                  Registro Gratuito
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Sin tarjeta de crédito
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Acceso inmediato
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                  Datos actualizados
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-700/50 py-8 px-4">
          <div className="container mx-auto text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
              CalculaTuCasa
            </div>
            <p className="text-slate-400 text-sm">
              © 2025 CalculaTuCasa. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;


import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMockData } from '@/utils/mockData';
import { OverviewSection } from '@/components/sections/OverviewSection';
import { BarriosSection } from '@/components/sections/BarriosSection';
import { DemographicsSection } from '@/components/sections/DemographicsSection';
import { DynamicsSection } from '@/components/sections/DynamicsSection';
import { InsightsSection } from '@/components/sections/InsightsSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const { baseData, historico } = useMemo(() => generateMockData(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Off-Market Intelligence
              </h1>
              <p className="text-slate-400">Barrio de Salamanca, Madrid</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-emerald-400 text-emerald-400">{baseData.periodo}</Badge>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-400">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600">Overview</TabsTrigger>
            <TabsTrigger value="barrios" className="data-[state=active]:bg-emerald-600">Barrios</TabsTrigger>
            <TabsTrigger value="demographics" className="data-[state=active]:bg-emerald-600">Demografía</TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-emerald-600">Métricas</TabsTrigger>
            <TabsTrigger value="dynamics" className="data-[state=active]:bg-emerald-600">Dinámicas</TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-emerald-600">Insights</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="overview" className="space-y-6">
              <OverviewSection baseData={baseData} historico={historico} />
            </TabsContent>

            <TabsContent value="barrios" className="space-y-6">
              <BarriosSection />
            </TabsContent>

            <TabsContent value="demographics" className="space-y-6">
              <DemographicsSection baseData={baseData} />
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Todas las Métricas - {baseData.periodo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-slate-400">
                    <p>Tabla completa con las 36 métricas estará disponible próximamente</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dynamics" className="space-y-6">
              <DynamicsSection baseData={baseData} />
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <InsightsSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

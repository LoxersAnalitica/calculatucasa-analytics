
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { OverviewSection } from '@/components/sections/OverviewSection';
import { BarriosSection } from '@/components/sections/BarriosSection';
import { SociodemografiaSection } from '@/components/sections/SociodemografiaSection';
import { DynamicsSection } from '@/components/sections/DynamicsSection';
import { ValoracionSection } from '@/components/sections/ValoracionSection';
import { ClubInversionSection } from '@/components/sections/ClubInversionSection';
import { MiCuentaSection } from '@/components/sections/MiCuentaSection';
import { generateMockData } from '@/utils/mockData';

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Generate mock data for all sections
  const { baseData, historico } = generateMockData();

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection baseData={baseData} historico={historico} />;
      case 'barrios':
        return <BarriosSection />;
      case 'sociodemografia':
        return <SociodemografiaSection baseData={baseData} />;
      case 'dynamics':
        return <DynamicsSection baseData={baseData} />;
      case 'valoracion':
        return <ValoracionSection />;
      case 'club-inversion':
        return <ClubInversionSection />;
      case 'mi-cuenta':
        return <MiCuentaSection />;
      default:
        return <OverviewSection baseData={baseData} historico={historico} />;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#303133' }}>
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={toggleSidebar}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      {/* Main Content */}
      <main className="flex-1 transition-all duration-300">
        <div className="container max-w-full p-4 lg:p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              CalculaTuCasa
            </h1>
            <p className="text-slate-400">Analytics Inmobiliarios - Barrio de Salamanca, Madrid</p>
          </div>

          {/* Active Section */}
          <div className="animate-fade-in">
            {renderActiveSection()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

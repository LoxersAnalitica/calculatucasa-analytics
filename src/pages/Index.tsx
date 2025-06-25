import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { UserMenu } from '@/components/layout/UserMenu';
import { OverviewSection } from '@/components/sections/OverviewSection';
import { BarriosSection } from '@/components/sections/BarriosSection';
import { SociodemografiaSection } from '@/components/sections/SociodemografiaSection';
import { DynamicsSection } from '@/components/sections/DynamicsSection';
import { ValoracionSection } from '@/components/sections/ValoracionSection';
import { ClubInversionSection } from '@/components/sections/ClubInversionSection';
import { MiCuentaSection } from '@/components/sections/MiCuentaSection';
import { generateMockData } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // Generate mock data for all sections
  const { baseData, historico } = generateMockData();

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setShowMobileSidebar(!showMobileSidebar);
    } else {
      setIsSidebarCollapsed(prev => !prev);
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (isMobile) {
      setShowMobileSidebar(false);
    }
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

  const getSectionTitle = () => {
    const titles = {
      'overview': 'Dashboard',
      'barrios': 'Barrios',
      'sociodemografia': 'Sociodemografía',
      'dynamics': 'Dinámicas',
      'valoracion': 'Valoración',
      'club-inversion': 'Club de Inversión',
      'mi-cuenta': 'Mi Cuenta'
    };
    return titles[activeSection] || 'Dashboard';
  };

  return (
    <div className="min-h-screen flex relative" style={{ backgroundColor: '#303133' }}>
      {/* Mobile Sidebar Overlay */}
      {isMobile && showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
        ${isMobile && !showMobileSidebar ? '-translate-x-full' : 'translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar 
          isCollapsed={!isMobile && isSidebarCollapsed} 
          onToggle={toggleSidebar}
          activeSection={activeSection}
          setActiveSection={handleSectionChange}
          className={isMobile ? 'w-72' : ''}
        />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 min-w-0">
        <div className="h-full flex flex-col">
          {/* Mobile Header */}
          <div className="md:hidden bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50 p-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="text-slate-400 hover:text-amber-400 p-2"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {getSectionTitle()}
                  </h1>
                </div>
              </div>
              <UserMenu />
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:block">
            <div className="p-4 lg:p-6">
              <div className="mb-4 md:mb-6 flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-3 md:mr-4">
                  <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    CalculaTuCasa
                  </h1>
                  <p className="text-slate-400 text-xs md:text-sm">
                    Analytics Inmobiliarios - Barrio de Salamanca, Madrid
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <UserMenu />
                </div>
              </div>
            </div>
          </div>

          {/* Active Section */}
          <div className="flex-1 overflow-auto">
            <div className="p-3 md:p-4 lg:p-6">
              <div className="animate-fade-in">
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

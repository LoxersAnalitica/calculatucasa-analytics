import React from 'react';
import { 
  BarChart, PieChart, BarChart3, Wallet, LineChart, Globe, 
  DollarSign, Settings, ChevronRight, ChevronLeft, Home,
  MapPin, Users, TrendingUp, FileText, Crown, User, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  className?: string;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  key: string;
}

export function Sidebar({ isCollapsed, onToggle, activeSection, setActiveSection, className }: SidebarProps) {
  
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      icon: Home,
      key: 'overview',
    },
    {
      title: 'Barrios',
      icon: MapPin,
      key: 'barrios',
    },
    {
      title: 'Sociodemografía',
      icon: Users,
      key: 'sociodemografia',
    },
    {
      title: 'Dinámicas',
      icon: TrendingUp,
      key: 'dynamics',
    },
    {
      title: 'Valoración',
      icon: FileText,
      key: 'valoracion',
    },
    {
      title: 'Club de Inversión',
      icon: Crown,
      key: 'club-inversion',
    },
    {
      title: 'Mi Cuenta',
      icon: User,
      key: 'mi-cuenta',
    }
  ];

  return (
    <aside className={cn(
      "bg-slate-900/95 backdrop-blur-lg border-r border-slate-700/50 relative transition-all duration-300 ease-in-out flex flex-col h-screen",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-700/50">
        <h2 className={cn(
          "font-semibold tracking-tight transition-opacity duration-200 text-amber-400 text-lg",
          isCollapsed ? "opacity-0 hidden" : "opacity-100"
        )}>
          CalculaTuCasa
        </h2>
        
        {/* Toggle button - Solo visible en desktop */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "hidden md:flex text-slate-400 hover:text-amber-400 h-8 w-8 flex-shrink-0",
            isCollapsed ? "mx-auto" : ""
          )}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        {/* Close button - Solo visible en móvil */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="md:hidden text-slate-400 hover:text-amber-400 h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={index}
                onClick={() => setActiveSection(item.key)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 hover:bg-slate-800/50 hover:text-amber-400 text-left w-full",
                  isActive ? "bg-amber-400/10 text-amber-400 border-l-2 border-amber-400 shadow-lg" : "text-slate-400",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0")} />
                <span className={cn(
                  "text-sm font-medium transition-opacity duration-200",
                  isCollapsed ? "opacity-0 hidden" : "opacity-100"
                )}>
                  {item.title}
                </span>
                {isActive && !isCollapsed && (
                  <div className="ml-auto w-2 h-2 bg-amber-400 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </ScrollArea>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <div className={cn(
          "transition-opacity duration-200 rounded-lg bg-slate-800/30 p-3 text-xs text-slate-400",
          isCollapsed ? "opacity-0 hidden" : "opacity-100"
        )}>
          <p className="font-medium text-amber-400 mb-1">Estado del Sistema</p>
          <p className="text-green-400">● Datos actualizados</p>
          <p className="text-[10px] text-slate-500 mt-1">Último: Q1-2025</p>
        </div>
        
        {/* Collapsed state indicator */}
        {isCollapsed && (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
    </aside>
  );
}

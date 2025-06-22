
import React from 'react';
import { 
  BarChart, PieChart, BarChart3, Wallet, LineChart, Globe, 
  DollarSign, Settings, ChevronRight, ChevronLeft, Home,
  MapPin, Users, TrendingUp, FileText, Crown, User
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
      title: 'Overview',
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
      "bg-slate-900/50 backdrop-blur-lg border-r border-slate-700/50 relative transition-all duration-300 ease-in-out flex flex-col",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="flex h-16 items-center justify-center border-b border-slate-700/50">
        <h2 className={cn(
          "font-semibold tracking-tight transition-opacity duration-200 text-amber-400",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          CalculaTuCasa
        </h2>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "absolute right-2 text-slate-400 hover:text-amber-400 h-8 w-8",
            isCollapsed ? "right-2" : "right-4"
          )}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={index}
                onClick={() => setActiveSection(item.key)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-slate-800/50 hover:text-amber-400",
                  isActive ? "bg-amber-400/10 text-amber-400 border-l-2 border-amber-400" : "text-slate-400",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0")} />
                <span className={cn(
                  "text-sm font-medium transition-opacity duration-200",
                  isCollapsed ? "opacity-0 w-0" : "opacity-100"
                )}>
                  {item.title}
                </span>
              </button>
            );
          })}
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t border-slate-700/50">
        <div className={cn(
          "transition-opacity duration-200 rounded-md bg-slate-800/30 p-2 text-xs text-slate-400",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          <p className="font-medium text-amber-400">Estado</p>
          <p>Datos actualizados</p>
          <p className="text-[10px]">Q1-2025</p>
        </div>
      </div>
    </aside>
  );
}

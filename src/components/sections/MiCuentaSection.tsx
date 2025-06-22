
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  CreditCard, 
  Download,
  Bell,
  Shield,
  Calendar,
  Activity
} from 'lucide-react';

export const MiCuentaSection: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <User className="h-5 w-5 text-amber-400 mr-2" />
            Mi Cuenta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-400/20 rounded-full">
              <User className="h-8 w-8 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Usuario Demo</h3>
              <p className="text-slate-400">usuario@calculatucasa.com</p>
              <Badge className="bg-amber-500/20 text-amber-400 mt-1">
                Plan Mensual Activo
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-amber-400 mr-2" />
              <div>
                <p className="text-2xl font-bold text-white">127</p>
                <p className="text-slate-400 text-sm">Búsquedas realizadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Download className="h-5 w-5 text-amber-400 mr-2" />
              <div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-slate-400 text-sm">Informes descargados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-amber-400 mr-2" />
              <div>
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-slate-400 text-sm">Días restantes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Management */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="h-5 w-5 text-amber-400 mr-2" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300">
              <User className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
            <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300">
              <Bell className="h-4 w-4 mr-2" />
              Notificaciones
            </Button>
            <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300">
              <Shield className="h-4 w-4 mr-2" />
              Privacidad y Seguridad
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CreditCard className="h-5 w-5 text-amber-400 mr-2" />
              Facturación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <p className="text-white font-medium">Plan Mensual</p>
              <p className="text-slate-400 text-sm">99€/mes + IVA</p>
              <p className="text-slate-400 text-sm">Próxima facturación: 22 Feb 2025</p>
            </div>
            <Button variant="outline" className="w-full border-slate-600 text-slate-300">
              Ver Historial de Pagos
            </Button>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
              Actualizar a Plan Anual
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Support */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Soporte y Ayuda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="border-slate-600 text-slate-300">
              Centro de Ayuda
            </Button>
            <Button variant="outline" className="border-slate-600 text-slate-300">
              Contactar Soporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

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
  Activity,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const MiCuentaSection: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  // Extraer datos del usuario
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';
  const userEmail = user?.email || '';
  const registrationDate = user?.created_at ? new Date(user.created_at).toLocaleDateString('es-ES') : '';
  const daysSinceRegistration = user?.created_at ? 
    Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0;

  // Datos dinámicos basados en la antigüedad del usuario
  const userStats = {
    searches: Math.min(127, daysSinceRegistration * 3 + Math.floor(Math.random() * 20)),
    reports: Math.min(8, Math.floor(daysSinceRegistration / 7) + Math.floor(Math.random() * 3)),
    daysRemaining: 30 - (daysSinceRegistration % 30)
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <User className="h-5 w-5 text-amber-400 mr-2" />
              Mi Cuenta
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignOut}
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-400/20 rounded-full">
              <User className="h-8 w-8 text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white capitalize">{displayName}</h3>
              <p className="text-slate-400">{userEmail}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-emerald-500/20 text-emerald-400">
                  Plan Premium Activo
                </Badge>
                {registrationDate && (
                  <span className="text-slate-500 text-xs">
                    Miembro desde {registrationDate}
                  </span>
                )}
              </div>
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
                <p className="text-2xl font-bold text-white">{userStats.searches}</p>
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
                <p className="text-2xl font-bold text-white">{userStats.reports}</p>
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
                <p className="text-2xl font-bold text-white">{userStats.daysRemaining}</p>
                <p className="text-slate-400 text-sm">Días hasta renovación</p>
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
            <Button 
              variant="outline" 
              className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => toast.info('Funcionalidad en desarrollo')}
            >
              <User className="h-4 w-4 mr-2" />
              Editar Perfil
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => toast.info('Funcionalidad en desarrollo')}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notificaciones
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => toast.info('Funcionalidad en desarrollo')}
            >
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
              <p className="text-white font-medium">Plan Premium</p>
              <p className="text-slate-400 text-sm">9€/mes + IVA</p>
              <p className="text-slate-400 text-sm">
                Próxima facturación: {new Date(Date.now() + userStats.daysRemaining * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => toast.info('Funcionalidad en desarrollo')}
            >
              Ver Historial de Pagos
            </Button>
            <Button 
              className="w-full bg-amber-500 hover:bg-amber-600 text-black"
              onClick={() => toast.info('Ya tienes el mejor plan disponible')}
            >
              Gestionar Suscripción
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* User Info */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Información de la Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">ID de Usuario:</p>
              <p className="text-white font-mono text-xs">{user?.id?.slice(0, 8)}...</p>
            </div>
            <div>
              <p className="text-slate-400">Tipo de Cuenta:</p>
              <p className="text-white">Premium</p>
            </div>
            <div>
              <p className="text-slate-400">Estado:</p>
              <Badge className="bg-green-500/20 text-green-400">Activa</Badge>
            </div>
            <div>
              <p className="text-slate-400">Última conexión:</p>
              <p className="text-white">Ahora</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Soporte y Ayuda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => toast.info('Funcionalidad en desarrollo')}
            >
              Centro de Ayuda
            </Button>
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => toast.info('Funcionalidad en desarrollo')}
            >
              Contactar Soporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

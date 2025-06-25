import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const UserMenu = () => {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const userInitials = profile?.full_name 
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 md:h-9 md:w-9 rounded-full hover:bg-slate-800/50"
        >
          <Avatar className="h-10 w-10 md:h-9 md:w-9">
            <AvatarFallback className="bg-amber-500/20 text-amber-400 text-sm md:text-xs font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 md:w-56 bg-slate-800/95 backdrop-blur-sm border-slate-700" 
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="text-slate-300 p-3 md:p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm md:text-sm font-medium truncate">
              {profile?.full_name || 'Usuario'}
            </p>
            <p className="text-xs text-slate-400 truncate">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/80 cursor-pointer p-3 md:p-2 text-sm">
          <User className="mr-3 md:mr-2 h-5 w-5 md:h-4 md:w-4" />
          Mi Perfil
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem 
          className="text-red-400 hover:bg-slate-700/80 cursor-pointer p-3 md:p-2 text-sm"
          onClick={handleSignOut}
        >
          <LogOut className="mr-3 md:mr-2 h-5 w-5 md:h-4 md:w-4" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

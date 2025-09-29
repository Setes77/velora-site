import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOut, Calendar, BarChart3, User } from 'lucide-react';
import veloraLogo from 'figma:asset/1fcde756da9e0d6e75f5a1d03cf66c15d32f9629.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user?: { name: string; email: string; avatar?: string } | null;
  onLogout?: () => void;
  userRole?: 'player' | 'manager';
}

export function Header({ currentPage, onNavigate, user, onLogout, userRole }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div 
            className="w-10 h-10 cursor-pointer transition-transform duration-200 hover:scale-105"
            onClick={() => userRole === 'player' ? onNavigate('planning') : onNavigate('manager')}
          >
            <img 
              src={veloraLogo} 
              alt="Velora eSports" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-semibold text-primary">Velora eSports</h1>
        </div>

        {/* Navigation - Adaptée selon le rôle */}
        {user && userRole && (
          <nav className="flex items-center space-x-1">
            {userRole === 'player' && (
              <Button
                variant={currentPage === 'planning' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate('planning')}
                className="text-sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Mon Planning
              </Button>
            )}
            {userRole === 'manager' && (
              <Button
                variant={currentPage === 'manager' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate('manager')}
                className="text-sm"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            )}
          </nav>
        )}

        {/* User Section */}
        {user ? (
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-foreground hidden sm:block">{user.name}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('login')}
            className="text-sm"
          >
            <User className="w-4 h-4 mr-2" />
            Connexion
          </Button>
        )}
      </div>
    </header>
  );
}
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { WeekGrid } from './components/WeekGrid';
import { SaveBar } from './components/SaveBar';
import { ManagerSummary } from './components/ManagerSummary';
import { Toast } from './components/Toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Calendar, Users, Clock } from 'lucide-react';
import flexSupportIcon from 'figma:asset/6760a7ec7fe5fbfa745e95f89e36b4e39ab74cb1.png';

type Page = 'login' | 'planning' | 'manager';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'player' | 'manager';
  gameRole?: string;
}

interface Player {
  id: string;
  name: string;
  email: string;
  availability: { [key: string]: boolean };
}

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

// Comptes prédéfinis Velora eSports
const PREDEFINED_ACCOUNTS = {
  'shaka@velora.gg': { password: 'VEL2024!', name: 'Shaka', role: 'player', gameRole: 'Flex Support' },
  'mower@velora.gg': { password: 'VEL2024!', name: 'Mower', role: 'player', gameRole: 'Flex DPS' },
  'setes@velora.gg': { password: 'MGR2024!', name: 'Setes', role: 'manager', gameRole: undefined }
};

const MOCK_PLAYERS: Player[] = [
  {
    id: 'shaka',
    name: 'Shaka',
    email: 'shaka@velora.gg',
    availability: {
      '0-0': true, '0-1': true, '0-2': true, '0-3': true, '0-4': true, '0-5': false, '0-6': true, '0-7': true,
      '1-0': true, '1-1': true, '1-2': true, '1-3': true, '1-4': true, '1-5': true, '1-6': true, '1-7': true,
      '2-0': false, '2-1': false, '2-2': true, '2-3': true, '2-4': true, '2-5': true, '2-6': true, '2-7': true,
      '3-0': true, '3-1': true, '3-2': true, '3-3': true, '3-4': true, '3-5': true, '3-6': true, '3-7': false,
      '4-0': true, '4-1': true, '4-2': true, '4-3': true, '4-4': true, '4-5': true, '4-6': false, '4-7': false,
      '5-0': true, '5-1': true, '5-2': true, '5-3': true, '5-4': true, '5-5': true, '5-6': true, '5-7': true,
      '6-0': true, '6-1': true, '6-2': true, '6-3': true, '6-4': true, '6-5': true, '6-6': true, '6-7': false,
    }
  },
  {
    id: 'mower',
    name: 'Mower',
    email: 'mower@velora.gg',
    availability: {
      '0-0': false, '0-1': false, '0-2': true, '0-3': true, '0-4': true, '0-5': true, '0-6': true, '0-7': true,
      '1-0': true, '1-1': true, '1-2': true, '1-3': true, '1-4': true, '1-5': true, '1-6': true, '1-7': false,
      '2-0': true, '2-1': true, '2-2': true, '2-3': true, '2-4': true, '2-5': true, '2-6': false, '2-7': false,
      '3-0': true, '3-1': true, '3-2': true, '3-3': true, '3-4': true, '3-5': true, '3-6': true, '3-7': true,
      '4-0': false, '4-1': true, '4-2': true, '4-3': true, '4-4': true, '4-5': true, '4-6': true, '4-7': true,
      '5-0': true, '5-1': true, '5-2': true, '5-3': true, '5-4': true, '5-5': true, '5-6': true, '5-7': true,
      '6-0': true, '6-1': true, '6-2': false, '6-3': false, '6-4': true, '6-5': true, '6-6': true, '6-7': true,
    }
  },
  {
    id: '3',
    name: 'Alex Dubois',
    email: 'alex.dubois@example.com',
    availability: {
      '0-0': true, '0-1': false, '0-2': true, '0-3': false, '0-4': true, '0-5': true, '0-6': true, '0-7': true,
      '1-0': true, '1-1': true, '1-2': true, '1-3': false, '1-4': true, '1-5': false, '1-6': true, '1-7': true,
      '2-0': true, '2-1': true, '2-2': false, '2-3': true, '2-4': true, '2-5': true, '2-6': true, '2-7': false,
      '3-0': false, '3-1': true, '3-2': true, '3-3': true, '3-4': false, '3-5': true, '3-6': false, '3-7': true,
      '4-0': true, '4-1': false, '4-2': false, '4-3': true, '4-4': true, '4-5': true, '4-6': true, '4-7': true,
      '5-0': true, '5-1': true, '5-2': false, '5-3': false, '5-4': false, '5-5': true, '5-6': true, '5-7': true,
      '6-0': false, '6-1': true, '6-2': true, '6-3': true, '6-4': true, '6-5': false, '6-6': false, '6-7': false,
    }
  },
  {
    id: '4',
    name: 'Marie Laurent',
    email: 'marie.laurent@example.com',
    availability: {
      '0-0': true, '0-1': true, '0-2': true, '0-3': true, '0-4': true, '0-5': false, '0-6': false, '0-7': true,
      '1-0': false, '1-1': false, '1-2': true, '1-3': true, '1-4': true, '1-5': true, '1-6': true, '1-7': false,
      '2-0': true, '2-1': false, '2-2': false, '2-3': false, '2-4': true, '2-5': true, '2-6': true, '2-7': true,
      '3-0': true, '3-1': true, '3-2': true, '3-3': false, '3-4': false, '3-5': false, '3-6': true, '3-7': true,
      '4-0': false, '4-1': true, '4-2': true, '4-3': true, '4-4': false, '4-5': false, '4-6': false, '4-7': false,
      '5-0': true, '5-1': true, '5-2': true, '5-3': true, '5-4': true, '5-5': false, '5-6': false, '5-7': false,
      '6-0': false, '6-1': false, '6-2': false, '6-3': true, '6-4': true, '6-5': true, '6-6': true, '6-7': true,
    }
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [availability, setAvailability] = useState<{ [key: string]: boolean }>({});
  const [originalAvailability, setOriginalAvailability] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', isVisible: false });

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('velora-user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setCurrentPage('planning');
      
      // Load saved availability
      const savedAvailability = localStorage.getItem(`velora-availability-${parsedUser.id}`);
      if (savedAvailability) {
        const parsedAvailability = JSON.parse(savedAvailability);
        setAvailability(parsedAvailability);
        setOriginalAvailability(parsedAvailability);
      }
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérifier les comptes prédéfinis
    const predefinedAccount = PREDEFINED_ACCOUNTS[email as keyof typeof PREDEFINED_ACCOUNTS];
    
    if (predefinedAccount && predefinedAccount.password === password) {
      // Connexion avec compte prédéfini
      const newUser: User = {
        id: email === 'shaka@velora.gg' ? 'shaka' : email === 'mower@velora.gg' ? 'mower' : 'setes',
        name: predefinedAccount.name,
        email: email,
        role: predefinedAccount.role as 'player' | 'manager',
        gameRole: predefinedAccount.gameRole
      };
      
      setUser(newUser);
      localStorage.setItem('velora-user', JSON.stringify(newUser));
      
      // Charger les disponibilités pour les joueurs
      if (predefinedAccount.role === 'player') {
        const playerData = MOCK_PLAYERS.find(p => p.email === email);
        if (playerData) {
          setAvailability(playerData.availability);
          setOriginalAvailability(playerData.availability);
        }
        setCurrentPage('planning');
      } else {
        // Manager va directement au dashboard
        setCurrentPage('manager');
      }
      
      showToast(`Bienvenue ${predefinedAccount.name} !`, 'success');
    } else if (email && password) {
      // Connexion générique pour autres utilisateurs
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        role: 'player'
      };
      
      setUser(newUser);
      localStorage.setItem('velora-user', JSON.stringify(newUser));
      setCurrentPage('planning');
      showToast('Connexion réussie !', 'success');
    } else {
      showToast('Email ou mot de passe incorrect', 'error');
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setAvailability({});
    setOriginalAvailability({});
    setCurrentPage('login');
    localStorage.removeItem('velora-user');
    if (user) {
      localStorage.removeItem(`velora-availability-${user.id}`);
    }
    showToast('Déconnexion réussie', 'info');
  };

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    localStorage.setItem(`velora-availability-${user.id}`, JSON.stringify(availability));
    setOriginalAvailability(availability);
    setIsLoading(false);
    showToast('Disponibilités sauvegardées !', 'success');
  };

  const handleExport = (format: 'csv' | 'json') => {
    const data = MOCK_PLAYERS;
    
    if (format === 'json') {
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `availability-export-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else {
      // CSV export (simplified)
      let csv = 'Nom,Email,Disponibilité\n';
      data.forEach(player => {
        const availableSlots = Object.values(player.availability).filter(Boolean).length;
        const totalSlots = 56; // 7 days * 8 hours
        const percentage = Math.round((availableSlots / totalSlots) * 100);
        csv += `${player.name},${player.email},${percentage}%\n`;
      });
      
      const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
      const exportFileDefaultName = `availability-export-${new Date().toISOString().split('T')[0]}.csv`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
    
    showToast(`Export ${format.toUpperCase()} terminé !`, 'success');
  };

  const hasUnsavedChanges = JSON.stringify(availability) !== JSON.stringify(originalAvailability);
  
  const getAvailableDays = () => {
    const HOURS_PER_DAY = 8;
    const DAYS = 7;
    let availableDays = 0;
    
    for (let day = 0; day < DAYS; day++) {
      let hasAvailableSlot = false;
      for (let hour = 0; hour < HOURS_PER_DAY; hour++) {
        if (availability[`${day}-${hour}`]) {
          hasAvailableSlot = true;
          break;
        }
      }
      if (hasAvailableSlot) availableDays++;
    }
    
    return availableDays;
  };

  const getTimeUntilReset = () => {
    const now = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
    nextSunday.setHours(0, 0, 0, 0);
    
    // Si c'est déjà dimanche, on prend le dimanche suivant
    if (now.getDay() === 0 && now.getHours() === 0 && now.getMinutes() === 0) {
      nextSunday.setDate(nextSunday.getDate() + 7);
    }
    
    const timeDiff = nextSunday.getTime() - now.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}j ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // State pour le countdown
  const [timeUntilReset, setTimeUntilReset] = useState(getTimeUntilReset());

  // Mise à jour du countdown chaque minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeUntilReset(getTimeUntilReset());
    }, 60000); // Mise à jour chaque minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onLogout={handleLogout}
        userRole={user?.role}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {currentPage === 'login' && (
          <LoginForm onLogin={handleLogin} />
        )}

        {currentPage === 'planning' && user && (
          <div className="space-y-6 pb-24">
            {/* Page Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Planning des disponibilités</h2>
              <div className="space-y-1">
                <p className="text-muted-foreground">
                  Définissez vos créneaux de disponibilité pour la semaine (16h - 23h)
                </p>
                {user.gameRole && (
                  <div className="flex justify-center">
                    <Badge 
                      variant="outline" 
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {user.gameRole}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Jours disponibles</p>
                      <p className="text-2xl font-semibold text-foreground">{getAvailableDays()}/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Reset planning</p>
                      <p className="text-2xl font-semibold text-foreground">{timeUntilReset}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    {user.gameRole === 'Flex Support' ? (
                      <img 
                        src={flexSupportIcon} 
                        alt="Flex Support" 
                        className="w-5 h-5 brightness-0 invert"
                        style={{ filter: 'brightness(0) saturate(100%) invert(56%) sepia(92%) saturate(447%) hue-rotate(158deg) brightness(92%) contrast(90%)' }}
                      />
                    ) : (
                      <Users className="w-5 h-5 text-primary" />
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Rôle</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {user.gameRole || 'Joueur'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Week Grid */}
            <WeekGrid
              availability={availability}
              onAvailabilityChange={setAvailability}
            />

            {/* Save Bar */}
            <SaveBar
              hasUnsavedChanges={hasUnsavedChanges}
              isLoading={isLoading}
              availableDays={getAvailableDays()}
              totalDays={7}
              onSave={handleSave}
            />
          </div>
        )}

        {currentPage === 'manager' && user && (
          <ManagerSummary
            players={MOCK_PLAYERS}
            onExport={handleExport}
          />
        )}
      </main>
    </div>
  );
}
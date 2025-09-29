import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Download, Search, Users, Calendar, Filter } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  email: string;
  availability: { [key: string]: boolean };
}

interface ManagerSummaryProps {
  players: Player[];
  onExport: (format: 'csv' | 'json') => void;
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const HOURS = ['16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];

export function ManagerSummary({ players, onExport }: ManagerSummaryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<string>('all');

  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedPlayer === 'all' || player.id === selectedPlayer)
  );

  const getAvailablePlayersForSlot = (dayIndex: number, hourIndex: number) => {
    const key = `${dayIndex}-${hourIndex}`;
    return filteredPlayers.filter(player => player.availability[key]);
  };

  const getTotalAvailableDays = (player: Player) => {
    const availableSlots = Object.values(player.availability).filter(Boolean).length;
    const slotsPerDay = HOURS.length;
    return Math.ceil(availableSlots / slotsPerDay);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Dashboard Manager</h2>
          <p className="text-muted-foreground">Vue d'ensemble des disponibilités de l'équipe</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('csv')}
            className="text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport('json')}
            className="text-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="w-5 h-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Rechercher un joueur</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Nom du joueur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Filtrer par joueur</label>
              <Select value={selectedPlayer} onValueChange={setSelectedPlayer}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les joueurs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les joueurs</SelectItem>
                  {players.map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Joueurs actifs</p>
                <p className="text-2xl font-semibold text-foreground">{filteredPlayers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Créneaux totaux</p>
                <p className="text-2xl font-semibold text-foreground">{DAYS.length * HOURS.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div 
                className="w-5 h-5 rounded"
                style={{ background: 'var(--velora-gradient)' }}
              />
              <div>
                <p className="text-sm text-muted-foreground">Disponibilité moy.</p>
                <p className="text-2xl font-semibold text-foreground">
                  {filteredPlayers.length > 0 
                    ? Math.round(filteredPlayers.reduce((acc, player) => 
                        acc + (Object.values(player.availability).filter(Boolean).length / (DAYS.length * HOURS.length)) * 100, 0
                      ) / filteredPlayers.length)
                    : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Players List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Joueurs ({filteredPlayers.length})
          </CardTitle>
          <CardDescription>
            Liste des joueurs avec leurs statistiques de disponibilité
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPlayers.map((player) => {
              const totalSlots = DAYS.length * HOURS.length;
              const availableSlots = Object.values(player.availability).filter(Boolean).length;
              const availabilityPercentage = Math.round((availableSlots / totalSlots) * 100);
              
              return (
                <div key={player.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {player.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{player.name}</p>
                      <p className="text-sm text-muted-foreground">{player.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{availabilityPercentage}%</p>
                      <p className="text-xs text-muted-foreground">{availableSlots}/{totalSlots} créneaux</p>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={`${
                        availabilityPercentage >= 70 ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                        availabilityPercentage >= 40 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}
                    >
                      {availabilityPercentage >= 70 ? 'Très disponible' :
                       availabilityPercentage >= 40 ? 'Moyennement disponible' :
                       'Peu disponible'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Grid Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Vue d'ensemble hebdomadaire</CardTitle>
          <CardDescription>
            Nombre de joueurs disponibles par créneau
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-2">
            <div className="text-sm font-medium text-muted-foreground"></div>
            {DAYS.map((day) => (
              <div key={day} className="text-sm font-medium text-center p-2 text-foreground">
                {day.slice(0, 3)}
              </div>
            ))}

            {HOURS.map((hour, hourIndex) => (
              <React.Fragment key={hour}>
                <div className="text-sm font-medium text-muted-foreground p-2 flex items-center">
                  {hour}
                </div>
                {DAYS.map((_, dayIndex) => {
                  const availablePlayers = getAvailablePlayersForSlot(dayIndex, hourIndex);
                  const intensity = filteredPlayers.length > 0 
                    ? availablePlayers.length / filteredPlayers.length 
                    : 0;
                  
                  return (
                    <div
                      key={`${dayIndex}-${hourIndex}`}
                      className="h-12 rounded-md border border-border/50 flex items-center justify-center text-sm font-medium transition-colors duration-200"
                      style={{
                        backgroundColor: intensity > 0 
                          ? `rgba(108, 207, 230, ${Math.max(0.1, intensity * 0.8)})` 
                          : 'rgba(43, 43, 78, 0.3)',
                        color: intensity > 0.5 ? '#110F16' : '#D5B6C6'
                      }}
                    >
                      {availablePlayers.length}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Check, X } from 'lucide-react';

interface WeekGridProps {
  availability: { [key: string]: boolean };
  onAvailabilityChange: (availability: { [key: string]: boolean }) => void;
  readOnly?: boolean;
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const HOURS = ['16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'];

export function WeekGrid({ availability, onAvailabilityChange, readOnly = false }: WeekGridProps) {
  const [localAvailability, setLocalAvailability] = useState(availability);

  useEffect(() => {
    setLocalAvailability(availability);
  }, [availability]);

  const generateSlotKey = (dayIndex: number, hourIndex: number) => {
    return `${dayIndex}-${hourIndex}`;
  };

  const toggleSlot = (dayIndex: number, hourIndex: number) => {
    if (readOnly) return;
    
    const key = generateSlotKey(dayIndex, hourIndex);
    const newAvailability = {
      ...localAvailability,
      [key]: !localAvailability[key]
    };
    setLocalAvailability(newAvailability);
    onAvailabilityChange(newAvailability);
  };

  const handleKeyDown = (e: React.KeyboardEvent, dayIndex: number, hourIndex: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSlot(dayIndex, hourIndex);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border/50 p-6">
      <div className="grid grid-cols-8 gap-2 mb-4">
        {/* Header */}
        <div className="text-sm font-medium text-muted-foreground"></div>
        {DAYS.map((day) => (
          <div key={day} className="text-sm font-medium text-center p-2 text-foreground">
            {day}
          </div>
        ))}

        {/* Grid */}
        {HOURS.map((hour, hourIndex) => (
          <React.Fragment key={hour}>
            <div className="text-sm font-medium text-muted-foreground p-2 flex items-center">
              {hour}
            </div>
            {DAYS.map((_, dayIndex) => {
              const key = generateSlotKey(dayIndex, hourIndex);
              const isAvailable = localAvailability[key] || false;
              
              return (
                <button
                  key={`${dayIndex}-${hourIndex}`}
                  onClick={() => toggleSlot(dayIndex, hourIndex)}
                  onKeyDown={(e) => handleKeyDown(e, dayIndex, hourIndex)}
                  disabled={readOnly}
                  className={`
                    relative h-12 rounded-md border-2 transition-all duration-200 transform
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
                    ${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-105'}
                    ${isAvailable 
                      ? 'border-primary bg-primary/10 hover:bg-primary/20' 
                      : 'border-border bg-muted/30 hover:bg-muted/50'
                    }
                  `}
                  style={isAvailable ? { 
                    background: readOnly 
                      ? 'rgba(108, 207, 230, 0.2)' 
                      : 'linear-gradient(135deg, rgba(108, 207, 230, 0.1) 0%, rgba(170, 153, 175, 0.1) 50%, rgba(239, 183, 168, 0.1) 100%)',
                    borderColor: '#6CCFE6'
                  } : undefined}
                  aria-label={`${DAYS[dayIndex]} ${hour} - ${isAvailable ? 'Disponible' : 'Non disponible'}`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isAvailable ? (
                      <Check className="w-5 h-5 text-primary" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground opacity-30" />
                    )}
                  </div>
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      
      {!readOnly && (
        <div className="text-sm text-muted-foreground text-center">
          Cliquez sur les cases pour définir vos disponibilités
        </div>
      )}
    </div>
  );
}
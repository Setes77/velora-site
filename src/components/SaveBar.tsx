import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Save, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface SaveBarProps {
  hasUnsavedChanges: boolean;
  isLoading: boolean;
  availableDays: number;
  totalDays: number;
  onSave: () => void;
}

export function SaveBar({ hasUnsavedChanges, isLoading, availableDays, totalDays, onSave }: SaveBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Status & Counter */}
          <div className="flex items-center space-x-4">
            {/* Save Status */}
            <div className="flex items-center space-x-2">
              {hasUnsavedChanges ? (
                <>
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-500">Modifications non sauvegardées</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">Sauvegardé</span>
                </>
              )}
            </div>

            {/* Available Days Counter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Jours disponibles:</span>
              <Badge 
                variant="secondary" 
                className="bg-primary/10 text-primary border-primary/20"
              >
                {availableDays}/{totalDays}
              </Badge>
            </div>
          </div>

          {/* Save Button */}
          <Button
            onClick={onSave}
            disabled={!hasUnsavedChanges || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:scale-105 disabled:transform-none"
            style={{ 
              background: hasUnsavedChanges && !isLoading ? 'var(--velora-gradient)' : undefined 
            }}
          >
            {isLoading ? (
              <>
                <Clock className="w-4 h-4 mr-2 animate-spin" />
                Sauvegarde...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
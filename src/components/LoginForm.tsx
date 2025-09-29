import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, Lock, Loader2 } from 'lucide-react';
import veloraLogo from 'figma:asset/1fcde756da9e0d6e75f5a1d03cf66c15d32f9629.png';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setLoading(true);
    try {
      await onLogin(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-30 h-30 mx-auto mb-6 transition-transform duration-300 hover:scale-105">
            <img 
              src={veloraLogo} 
              alt="Velora eSports" 
              className="w-full h-full object-contain drop-shadow-xl"
              style={{ width: '120px', height: '120px' }}
            />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Velora eSports</h1>
          <p className="text-muted-foreground">Gestion des disponibilités</p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardDescription className="text-center">
              Connectez-vous à votre compte pour gérer vos disponibilités
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 border-border/50 focus:border-primary transition-colors duration-200"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 border-border/50 focus:border-primary transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 transform hover:scale-[1.02]"
                disabled={loading || !email || !password}
                style={{ background: loading ? undefined : 'var(--velora-gradient)' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
            
            {/* Codes d'accès Velora */}
            <div className="mt-6 p-4 rounded-lg border border-border/50 relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-10"
                style={{ background: 'var(--velora-gradient)' }}
              />
              <div className="relative">
                <h3 className="text-sm font-semibold text-foreground mb-3 text-center">Comptes Velora eSports</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">Shaka (Joueur)</span>
                    <span className="text-muted-foreground">shaka@velora.gg • VEL2024!</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">Mower (Joueur)</span>
                    <span className="text-muted-foreground">mower@velora.gg • VEL2024!</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-accent font-medium">Setes (Manager)</span>
                    <span className="text-muted-foreground">setes@velora.gg • MGR2024!</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
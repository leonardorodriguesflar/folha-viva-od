import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  console.log('LoginScreen rendering...');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    usuario: '',
    senha: '',
    bancoDados: '',
    idioma: 'pt-BR'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-accent flex flex-col">
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Odebrecht Logo */}
          <div className="text-center mb-12">
            <div className="text-white text-2xl font-ubuntu font-bold mb-2">
              ODEBRECHT
            </div>
            <div className="text-white/90 text-lg font-ubuntu font-medium">
              ENGENHARIA & CONSTRUÇÃO
            </div>
          </div>

          {/* Version */}
          <div className="text-center mb-8">
            <div className="text-white/75 text-sm font-ubuntu font-light">
              Versão do Sistema: 2.1.0
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="usuario" className="text-white font-ubuntu font-medium">
                Usuário
              </Label>
              <Input
                id="usuario"
                type="text"
                value={formData.usuario}
                onChange={(e) => setFormData(prev => ({ ...prev, usuario: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 font-ubuntu"
                placeholder="Digite seu usuário"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-white font-ubuntu font-medium">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  value={formData.senha}
                  onChange={(e) => setFormData(prev => ({ ...prev, senha: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 font-ubuntu pr-10"
                  placeholder="Digite sua senha"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bancoDados" className="text-white font-ubuntu font-medium">
                Banco de Dados
              </Label>
              <Select value={formData.bancoDados} onValueChange={(value) => setFormData(prev => ({ ...prev, bancoDados: value }))}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white font-ubuntu">
                  <SelectValue placeholder="Selecione o banco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="producao">Produção</SelectItem>
                  <SelectItem value="homologacao">Homologação</SelectItem>
                  <SelectItem value="desenvolvimento">Desenvolvimento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idioma" className="text-white font-ubuntu font-medium">
                Idioma
              </Label>
              <Select value={formData.idioma} onValueChange={(value) => setFormData(prev => ({ ...prev, idioma: value }))}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white font-ubuntu">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-white text-primary hover:bg-white/90 font-ubuntu font-medium py-3 text-lg"
            >
              OK
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
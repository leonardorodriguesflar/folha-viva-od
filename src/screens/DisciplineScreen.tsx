import { useState } from "react";
import { MobileHeader } from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import { Save, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface DisciplineScreenProps {
  onDisciplineSelect: (discipline: string) => void;
  onBack: () => void;
}

const disciplines = [
  { id: 'arquitetura', name: 'ARQUITETURA' },
  { id: 'civil', name: 'CIVIL' },
  { id: 'duto', name: 'DUTO' },
  { id: 'eletrica', name: 'ELÉTRICA' },
  { id: 'e-mecanicos', name: 'E. MECÂNICOS' },
  { id: 'e-estaticos', name: 'E. ESTÁTICOS' },
  { id: 'instrumentacao', name: 'INSTRUMENTAÇÃO' },
  { id: 'tubulacao', name: 'TUBULAÇÃO' }
];

export const DisciplineScreen = ({ onDisciplineSelect, onBack }: DisciplineScreenProps) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);

  const handleDisciplineClick = (disciplineId: string) => {
    setSelectedDiscipline(disciplineId);
    // Simular um pequeno delay para feedback visual
    setTimeout(() => {
      onDisciplineSelect(disciplineId);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="FOLHAS DE SERVIÇO"
        subtitle={selectedDiscipline ? disciplines.find(d => d.id === selectedDiscipline)?.name : "Disciplinas"}
        showBack
        onBack={onBack}
        showSync
        isOnline={true}
        lastSync="há 5 min"
      />
      
      <div className="p-4 space-y-4">
        {/* Disciplines Grid */}
        <div className="grid grid-cols-2 gap-4">
          {disciplines.map((discipline) => (
            <Button
              key={discipline.id}
              onClick={() => handleDisciplineClick(discipline.id)}
              className={cn(
                "h-20 text-sm font-ubuntu font-medium transition-all duration-200",
                selectedDiscipline === discipline.id
                  ? "bg-primary text-primary-foreground shadow-lg scale-95"
                  : "bg-card hover:bg-card/80 text-card-foreground border border-border hover:shadow-md"
              )}
              variant={selectedDiscipline === discipline.id ? "default" : "outline"}
            >
              {discipline.name}
            </Button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-6 left-4 right-4">
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-success hover:bg-success/90 text-success-foreground font-ubuntu font-medium"
              size="lg"
            >
              <Save className="h-5 w-5 mr-2" />
              SALVAR
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-ubuntu font-medium"
              size="lg"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              SINCRONIZAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
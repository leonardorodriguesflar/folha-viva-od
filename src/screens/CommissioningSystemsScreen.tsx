import { MobileHeader } from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import { Cpu, Gauge, Zap, Droplets, Wind, Thermometer } from "lucide-react";

interface CommissioningSystemsScreenProps {
  onSystemSelect: (system: string) => void;
  onBack: () => void;
}

const systems = [
  {
    id: 'eletrico',
    name: 'ELÉTRICO',
    icon: Zap,
    color: 'bg-primary hover:bg-primary/90'
  },
  {
    id: 'instrumentacao',
    name: 'INSTRUMENTAÇÃO', 
    icon: Gauge,
    color: 'bg-accent hover:bg-accent/90'
  },
  {
    id: 'mecanico',
    name: 'MECÂNICO',
    icon: Cpu,
    color: 'bg-success hover:bg-success/90'
  },
  {
    id: 'hidraulico',
    name: 'HIDRÁULICO',
    icon: Droplets,
    color: 'bg-warning hover:bg-warning/90'
  },
  {
    id: 'ventilacao',
    name: 'VENTILAÇÃO',
    icon: Wind,
    color: 'bg-info hover:bg-info/90'
  },
  {
    id: 'termico',
    name: 'TÉRMICO',
    icon: Thermometer,
    color: 'bg-danger hover:bg-danger/90'
  }
];

export const CommissioningSystemsScreen = ({ onSystemSelect, onBack }: CommissioningSystemsScreenProps) => {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="Comissionamento"
        subtitle="Sistemas"
        showBack
        onBack={onBack}
        showSync
        isOnline={true}
        lastSync="há 3 min"
      />
      
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {systems.map((system) => {
            const IconComponent = system.icon;
            return (
              <Button
                key={system.id}
                onClick={() => onSystemSelect(system.id)}
                className={`h-20 ${system.color} text-white font-ubuntu font-medium text-base flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all`}
              >
                <IconComponent className="h-6 w-6" />
                {system.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
import { MobileHeader } from "@/components/MobileHeader";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, FileText } from "lucide-react";

interface ModuleScreenProps {
  contractName: string;
  onModuleSelect: (module: string) => void;
  onBack: () => void;
}

const modules = [
  {
    id: 'programacao',
    name: 'PROGRAMAÇÃO',
    icon: Calendar,
    color: 'bg-primary hover:bg-primary/90'
  },
  {
    id: 'comissionamento',
    name: 'COMISSIONAMENTO', 
    icon: CheckCircle,
    color: 'bg-accent hover:bg-accent/90'
  },
  {
    id: 'liberacoes',
    name: 'LIBERAÇÕES DE SERVIÇO',
    icon: FileText,
    color: 'bg-success hover:bg-success/90'
  }
];

export const ModuleScreen = ({ contractName, onModuleSelect, onBack }: ModuleScreenProps) => {
  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="Módulos"
        subtitle={contractName}
        showBack
        onBack={onBack}
        showSync
        isOnline={true}
        lastSync="há 5 min"
      />
      
      <div className="p-6 space-y-6">
        {modules.map((module) => {
          const IconComponent = module.icon;
          return (
            <Button
              key={module.id}
              onClick={() => onModuleSelect(module.id)}
              className={`w-full h-24 ${module.color} text-white font-ubuntu font-medium text-lg flex items-center justify-center gap-4 shadow-lg hover:shadow-xl transition-all`}
            >
              <IconComponent className="h-8 w-8" />
              {module.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
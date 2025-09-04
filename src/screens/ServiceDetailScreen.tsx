import { useState } from "react";
import { Camera, Upload, Check, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileHeader } from "@/components/MobileHeader";
import { Badge } from "@/components/ui/badge";

interface Activity {
  wbs: string;
  descricao: string;
  tarefa: string;
  dataProgramacao: string;
  percentualExecucao: number;
  concluida: boolean;
  dataExecucao?: string;
  responsavel?: string;
}

interface ServiceDetailScreenProps {
  serviceNumber: string;
  onBack: () => void;
}

const mockServiceData = {
  wbs: "1.2.3.4",
  sigla: "FS-ARQ-001",
  dataProgramada: "15/01/2024",
  avancoTotal: 65
};

const mockActivities: Activity[] = [
  {
    wbs: "1.2.3.4.1",
    descricao: "Escavação para fundação",
    tarefa: "Escavar área delimitada",
    dataProgramacao: "15/01/2024",
    percentualExecucao: 100,
    concluida: true,
    dataExecucao: "15/01/2024",
    responsavel: "João Silva"
  },
  {
    wbs: "1.2.3.4.2", 
    descricao: "Armação de ferragem",
    tarefa: "Montar armação conforme projeto",
    dataProgramacao: "16/01/2024",
    percentualExecucao: 80,
    concluida: false
  },
  {
    wbs: "1.2.3.4.3",
    descricao: "Concretagem",
    tarefa: "Lançar e nivelar concreto",
    dataProgramacao: "18/01/2024",
    percentualExecucao: 0,
    concluida: false
  }
];

export const ServiceDetailScreen = ({ serviceNumber, onBack }: ServiceDetailScreenProps) => {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  const handleActivityToggle = (index: number) => {
    const updatedActivities = [...activities];
    const activity = updatedActivities[index];
    
    if (!activity.concluida) {
      activity.concluida = true;
      activity.dataExecucao = new Date().toLocaleDateString('pt-BR');
      activity.percentualExecucao = 100;
    } else {
      activity.concluida = false;
      activity.dataExecucao = undefined;
      activity.percentualExecucao = 0;
    }
    
    setActivities(updatedActivities);
  };

  const handleResponsavelChange = (index: number, responsavel: string) => {
    const updatedActivities = [...activities];
    updatedActivities[index].responsavel = responsavel;
    setActivities(updatedActivities);
  };

  const completedActivities = activities.filter(a => a.concluida).length;
  const totalActivities = activities.length;
  const overallProgress = Math.round((completedActivities / totalActivities) * 100);

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader 
        title="FOLHAS DE SERVIÇO"
        subtitle={serviceNumber}
        showBack
        onBack={onBack}
        showSync
        isOnline={true}
        lastSync="agora"
      />
      
      <div className="p-4 space-y-4">
        {/* Service Info Header */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-ubuntu font-bold text-primary">
              Informações da Folha de Serviço
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground font-ubuntu font-medium">WBS:</span>
                <div className="font-ubuntu font-bold">{mockServiceData.wbs}</div>
              </div>
              <div>
                <span className="text-muted-foreground font-ubuntu font-medium">Sigla:</span>
                <div className="font-ubuntu font-bold">{mockServiceData.sigla}</div>
              </div>
              <div>
                <span className="text-muted-foreground font-ubuntu font-medium">Data Programada:</span>
                <div className="font-ubuntu font-bold">{mockServiceData.dataProgramada}</div>
              </div>
              <div>
                <span className="text-muted-foreground font-ubuntu font-medium">Avanço Total:</span>
                <div className="font-ubuntu font-bold text-primary">{overallProgress}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities List */}
        <div className="space-y-3">
          <h2 className="text-lg font-ubuntu font-bold text-foreground">Atividades</h2>
          
          {activities.map((activity, index) => (
            <Card key={activity.wbs} className={activity.concluida ? "bg-success/5 border-success/20" : ""}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Activity Header */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={activity.concluida}
                      onCheckedChange={() => handleActivityToggle(index)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs font-ubuntu">
                          {activity.wbs}
                        </Badge>
                        {activity.concluida && (
                          <Check className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <h3 className="font-ubuntu font-medium text-foreground">
                        {activity.descricao}
                      </h3>
                      <p className="text-sm text-muted-foreground font-ubuntu">
                        {activity.tarefa}
                      </p>
                    </div>
                  </div>

                  {/* Activity Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground font-ubuntu font-medium">Data Programação:</span>
                      <div className="font-ubuntu">{activity.dataProgramacao}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-ubuntu font-medium">Execução:</span>
                      <div className="font-ubuntu font-bold text-primary">
                        {activity.percentualExecucao}%
                      </div>
                    </div>
                  </div>

                  {/* Execution Date (when completed) */}
                  {activity.concluida && (
                    <div className="p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-success" />
                        <span className="text-sm font-ubuntu font-medium text-success">
                          Concluída em: {activity.dataExecucao}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`responsavel-${index}`} className="text-sm font-ubuntu">
                          Responsável pelo Avanço
                        </Label>
                        <Input
                          id={`responsavel-${index}`}
                          value={activity.responsavel || ''}
                          onChange={(e) => handleResponsavelChange(index, e.target.value)}
                          placeholder="Nome do responsável"
                          className="font-ubuntu text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {/* Evidence Buttons */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 font-ubuntu text-xs"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Foto
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 font-ubuntu text-xs"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Arquivo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
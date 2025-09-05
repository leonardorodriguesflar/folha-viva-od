import { MobileHeader } from "@/components/MobileHeader";
import { StatusChip } from "@/components/StatusChip";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

interface CommissioningDetailScreenProps {
  itemTag: string;
  onBack: () => void;
}

interface ChecklistItem {
  id: string;
  descricao: string;
  obrigatorio: boolean;
  concluido: boolean;
  observacao?: string;
}

const mockItem = {
  tag: 'MT-001',
  descricao: 'Motor Principal Bomba Centrifuga 1',
  sistema: 'ELÉTRICO',
  area: 'Casa de Bombas',
  status: 'em-andamento',
  percentual: 65,
  responsavel: 'João Silva',
  dataInicio: '15/01/2024',
  dataPrevista: '20/01/2024',
  especificacoes: {
    potencia: '150 HP',
    tensao: '440V',
    corrente: '200A',
    rotacao: '1800 RPM'
  }
};

const mockChecklist: ChecklistItem[] = [
  {
    id: '1',
    descricao: 'Verificação da instalação elétrica',
    obrigatorio: true,
    concluido: true,
    observacao: 'Todas as conexões verificadas e aprovadas'
  },
  {
    id: '2',
    descricao: 'Teste de isolamento',
    obrigatorio: true,
    concluido: true
  },
  {
    id: '3',
    descricao: 'Calibração dos instrumentos',
    obrigatorio: true,
    concluido: false
  },
  {
    id: '4',
    descricao: 'Teste de vibração',
    obrigatorio: false,
    concluido: false
  },
  {
    id: '5',
    descricao: 'Documentação técnica',
    obrigatorio: true,
    concluido: true,
    observacao: 'Manuais e certificados arquivados'
  }
];

export const CommissioningDetailScreen = ({ itemTag, onBack }: CommissioningDetailScreenProps) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(mockChecklist);
  const [observacoes, setObservacoes] = useState('');

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, concluido: !item.concluido } : item
    ));
  };

  const updateObservacao = (id: string, observacao: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, observacao } : item
    ));
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'em-andamento':
        return 'em-andamento' as const;
      default:
        return 'aberta' as const;
    }
  };

  const chipStatus = getStatusConfig(mockItem.status);
  const completedItems = checklist.filter(item => item.concluido).length;
  const totalItems = checklist.length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="Comissionamento"
        subtitle={mockItem.tag}
        showBack
        onBack={onBack}
        showSync
        isOnline={true}
        lastSync="agora"
      />
      
      <div className="p-4 space-y-4">
        {/* Item Info */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="font-ubuntu font-bold text-lg text-foreground">{mockItem.tag}</h2>
                <p className="text-muted-foreground mt-1">{mockItem.descricao}</p>
              </div>
              <StatusChip 
                status={chipStatus}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Sistema:</span>
                <p className="font-medium">{mockItem.sistema}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Área:</span>
                <p className="font-medium">{mockItem.area}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Responsável:</span>
                <p className="font-medium">{mockItem.responsavel}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Data Prevista:</span>
                <p className="font-medium">{mockItem.dataPrevista}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progresso ({completedItems}/{totalItems})</span>
                <span className="font-medium">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-success h-2 rounded-full transition-all" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Specifications */}
        <Card className="p-4">
          <h3 className="font-ubuntu font-medium text-foreground mb-3">Especificações Técnicas</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {Object.entries(mockItem.especificacoes).map(([key, value]) => (
              <div key={key}>
                <span className="text-muted-foreground capitalize">{key}:</span>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Checklist */}
        <Card className="p-4">
          <h3 className="font-ubuntu font-medium text-foreground mb-4">Lista de Verificação</h3>
          <div className="space-y-4">
            {checklist.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`p-1 h-auto ${item.concluido ? 'text-success' : 'text-muted-foreground'}`}
                    onClick={() => toggleChecklistItem(item.id)}
                  >
                    <CheckCircle className={`h-5 w-5 ${item.concluido ? 'fill-current' : ''}`} />
                  </Button>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${item.concluido ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {item.descricao}
                      </span>
                      {item.obrigatorio && (
                        <AlertCircle className="h-4 w-4 text-warning" />
                      )}
                    </div>
                    {item.observacao && (
                      <p className="text-xs text-muted-foreground bg-secondary p-2 rounded">
                        {item.observacao}
                      </p>
                    )}
                    {item.concluido && (
                      <Input
                        placeholder="Adicionar observação..."
                        value={item.observacao || ''}
                        onChange={(e) => updateObservacao(item.id, e.target.value)}
                        className="text-xs"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <Card className="p-4">
          <h3 className="font-ubuntu font-medium text-foreground mb-3">Documentação</h3>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2">
              <Camera className="h-4 w-4" />
              Foto
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <FileText className="h-4 w-4" />
              Documento
            </Button>
          </div>
        </Card>

        {/* Notes */}
        <Card className="p-4">
          <h3 className="font-ubuntu font-medium text-foreground mb-3">Observações Gerais</h3>
          <Textarea
            placeholder="Adicione observações gerais sobre o comissionamento..."
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={4}
          />
        </Card>

        {/* Save Button */}
        <Button className="w-full bg-success hover:bg-success/90 gap-2">
          <CheckCircle className="h-4 w-4" />
          Salvar Progresso
        </Button>
      </div>
    </div>
  );
};
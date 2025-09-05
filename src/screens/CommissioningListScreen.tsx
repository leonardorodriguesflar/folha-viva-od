import { MobileHeader } from "@/components/MobileHeader";
import { StatusChip } from "@/components/StatusChip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Filter, SortAsc } from "lucide-react";
import { useState } from "react";

interface CommissioningItem {
  id: string;
  tag: string;
  descricao: string;
  sistema: string;
  area: string;
  status: 'nao-iniciado' | 'em-andamento' | 'concluido' | 'aprovado';
  percentual: number;
  responsavel: string;
  dataInicio?: string;
  dataPrevista: string;
}

interface CommissioningListScreenProps {
  system: string;
  onItemSelect: (item: CommissioningItem) => void;
  onBack: () => void;
}

const mockItems: CommissioningItem[] = [
  {
    id: '1',
    tag: 'MT-001',
    descricao: 'Motor Principal Bomba Centrifuga 1',
    sistema: 'elétrico',
    area: 'Casa de Bombas',
    status: 'em-andamento',
    percentual: 65,
    responsavel: 'João Silva',
    dataInicio: '15/01/2024',
    dataPrevista: '20/01/2024'
  },
  {
    id: '2',
    tag: 'VL-002',
    descricao: 'Válvula de Controle de Pressão',
    sistema: 'instrumentacao',
    area: 'Unidade de Processo',
    status: 'concluido',
    percentual: 100,
    responsavel: 'Maria Santos',
    dataInicio: '10/01/2024',
    dataPrevista: '18/01/2024'
  },
  {
    id: '3',
    tag: 'CP-003',
    descricao: 'Compressor de Ar Principal',
    sistema: 'mecanico',
    area: 'Sala de Máquinas',
    status: 'nao-iniciado',
    percentual: 0,
    responsavel: 'Pedro Costa',
    dataPrevista: '25/01/2024'
  },
  {
    id: '4',
    tag: 'BM-004',
    descricao: 'Bomba Hidráulica Secundária',
    sistema: 'hidraulico',
    area: 'Casa de Bombas',
    status: 'aprovado',
    percentual: 100,
    responsavel: 'Ana Oliveira',
    dataInicio: '05/01/2024',
    dataPrevista: '15/01/2024'
  }
];

export const CommissioningListScreen = ({ system, onItemSelect, onBack }: CommissioningListScreenProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const systemNames: Record<string, string> = {
    'eletrico': 'ELÉTRICO',
    'instrumentacao': 'INSTRUMENTAÇÃO',
    'mecanico': 'MECÂNICO',
    'hidraulico': 'HIDRÁULICO',
    'ventilacao': 'VENTILAÇÃO',
    'termico': 'TÉRMICO'
  };

  const filteredItems = mockItems.filter(item => 
    item.sistema === system &&
    (item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'nao-iniciado':
        return 'aberta' as const;
      case 'em-andamento':
        return 'em-andamento' as const;
      case 'concluido':
        return 'concluida' as const;
      case 'aprovado':
        return 'ativo' as const;
      default:
        return 'aberta' as const;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="Comissionamento"
        subtitle={systemNames[system] || system.toUpperCase()}
        showBack
        onBack={onBack}
        showSync
        isOnline={true}
        lastSync="há 2 min"
      />
      
      <div className="p-4 space-y-4">
        {/* Search and Filters */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por TAG ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <SortAsc className="h-4 w-4" />
          </Button>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const chipStatus = getStatusConfig(item.status);
            return (
              <Card 
                key={item.id} 
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onItemSelect(item)}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-ubuntu font-medium text-foreground">{item.tag}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.descricao}</p>
                    </div>
                    <StatusChip 
                      status={chipStatus}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Área:</span>
                      <span className="font-medium">{item.area}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Responsável:</span>
                      <span className="font-medium">{item.responsavel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Data Prevista:</span>
                      <span className="font-medium">{item.dataPrevista}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progresso</span>
                      <span className="font-medium">{item.percentual}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all" 
                        style={{ width: `${item.percentual}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Nenhum item encontrado para este sistema.</p>
          </div>
        )}
      </div>
    </div>
  );
};
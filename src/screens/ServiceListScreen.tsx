import { useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileHeader } from "@/components/MobileHeader";
import { StatusChip } from "@/components/StatusChip";

interface ServiceSheet {
  numero: string;
  descricao: string;
  criterioMedicao: string;
  subcontrato: string;
  unidadeProcesso: string;
  situacao: 'em-andamento' | 'concluida' | 'aberta';
  percentualAvanco: number;
  dataProgramacao: string;
}

interface ServiceListScreenProps {
  discipline: string;
  onServiceSelect: (service: ServiceSheet) => void;
  onBack: () => void;
}

const mockServices: ServiceSheet[] = [
  {
    numero: "FS-ARQ-001",
    descricao: "Fundação de Estrutura Principal",
    criterioMedicao: "Por Unidade",
    subcontrato: "Construtora ABC Ltda",
    unidadeProcesso: "Área 100",
    situacao: "em-andamento",
    percentualAvanco: 65,
    dataProgramacao: "15/01/2024"
  },
  {
    numero: "FS-ARQ-002",
    descricao: "Estrutura Metálica Torre A",
    criterioMedicao: "Por Peso (Ton)",
    subcontrato: "Metalúrgica XYZ S.A.",
    unidadeProcesso: "Área 200",
    situacao: "aberta",
    percentualAvanco: 0,
    dataProgramacao: "20/01/2024"
  },
  {
    numero: "FS-ARQ-003",
    descricao: "Cobertura Galpão Industrial",
    criterioMedicao: "Por m²",
    subcontrato: "Construtora ABC Ltda",
    unidadeProcesso: "Área 300",
    situacao: "concluida",
    percentualAvanco: 100,
    dataProgramacao: "10/01/2024"
  }
];

export const ServiceListScreen = ({ discipline, onServiceSelect, onBack }: ServiceListScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredServices = mockServices.filter(service =>
    service.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.numero.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProgressColor = (percent: number) => {
    if (percent === 0) return 'bg-status-pending';
    if (percent < 50) return 'bg-status-progress';
    if (percent < 100) return 'bg-status-active';
    return 'bg-status-complete';
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="FOLHAS DE SERVIÇO"
        subtitle={discipline.toUpperCase()}
        showBack
        onBack={onBack}
        showSync
        isOnline={true}
        lastSync="há 2 min"
      />
      
      <div className="p-4 space-y-4">
        {/* Search and Controls */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Pesquisar folhas de serviço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-ubuntu"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="font-ubuntu"
            >
              <Filter className="h-4 w-4 mr-2" />
              FILTROS
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="font-ubuntu"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              ORDENAR
            </Button>
          </div>
        </div>

        {/* Service Sheets List */}
        <div className="space-y-3">
          {filteredServices.map((service) => (
            <Card 
              key={service.numero}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onServiceSelect(service)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-ubuntu font-bold text-primary text-sm">
                      {service.numero}
                    </div>
                    <h3 className="font-ubuntu font-medium text-foreground mt-1">
                      {service.descricao}
                    </h3>
                  </div>
                  <StatusChip status={service.situacao} />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-muted-foreground font-ubuntu">
                      <span className="font-medium">Critério:</span><br/>
                      {service.criterioMedicao}
                    </div>
                    <div className="text-muted-foreground font-ubuntu">
                      <span className="font-medium">Un. Processo:</span><br/>
                      {service.unidadeProcesso}
                    </div>
                  </div>
                  
                  <div className="text-muted-foreground font-ubuntu text-xs">
                    <span className="font-medium">Subcontrato:</span> {service.subcontrato}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-ubuntu font-medium">Avanço</span>
                      <span className="text-xs font-ubuntu font-bold">{service.percentualAvanco}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getProgressColor(service.percentualAvanco)}`}
                        style={{ width: `${service.percentualAvanco}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground font-ubuntu">
              Nenhuma folha de serviço encontrada
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
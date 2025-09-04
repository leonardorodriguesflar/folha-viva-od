import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MobileHeader } from "@/components/MobileHeader";
import { StatusChip } from "@/components/StatusChip";

interface Contract {
  codigo: string;
  nome: string;
  cliente: string;
  empresa: string;
  status: 'ativo' | 'encerrado';
}

interface ContractScreenProps {
  onContractSelect: (contract: Contract) => void;
  onBack: () => void;
}

const mockContracts: Contract[] = [
  {
    codigo: "EPC-2024-001",
    nome: "Complexo Petroquímico Bahia",
    cliente: "Petrobras S.A.",
    empresa: "Odebrecht Engenharia",
    status: "ativo"
  },
  {
    codigo: "EPC-2024-002", 
    nome: "Refinaria de Petróleo RJ",
    cliente: "Petrobras S.A.",
    empresa: "Odebrecht Engenharia",
    status: "ativo"
  },
  {
    codigo: "EPC-2023-045",
    nome: "Terminal Portuário Santos",
    cliente: "Porto de Santos S.A.",
    empresa: "Odebrecht Infraestrutura",
    status: "encerrado"
  },
  {
    codigo: "EPC-2024-003",
    nome: "Usina Termelétrica CE",
    cliente: "Eletrobras",
    empresa: "Odebrecht Energia",
    status: "ativo"
  }
];

export const ContractScreen = ({ onContractSelect, onBack }: ContractScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredContracts = mockContracts.filter(contract =>
    contract.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contract.cliente.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader 
        title="Contratos"
        showBack
        onBack={onBack}
        showSync
        isOnline={true}
        lastSync="há 5 min"
      />
      
      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Pesquisar contratos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-ubuntu"
          />
        </div>

        {/* Contracts List */}
        <div className="space-y-3">
          {filteredContracts.map((contract) => (
            <Card 
              key={contract.codigo}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onContractSelect(contract)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-ubuntu font-medium text-foreground">
                    {contract.codigo}
                  </div>
                  <StatusChip status={contract.status} />
                </div>
                
                <h3 className="font-ubuntu font-medium text-lg text-foreground mb-2">
                  {contract.nome}
                </h3>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground font-ubuntu">
                    <span className="font-medium">Cliente:</span> {contract.cliente}
                  </div>
                  <div className="text-sm text-muted-foreground font-ubuntu">
                    <span className="font-medium">Empresa:</span> {contract.empresa}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredContracts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground font-ubuntu">
              Nenhum contrato encontrado para "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
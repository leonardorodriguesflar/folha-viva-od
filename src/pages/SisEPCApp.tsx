import { useState } from "react";
import { LoginScreen } from "@/screens/LoginScreen";
import { ContractScreen } from "@/screens/ContractScreen";
import { ModuleScreen } from "@/screens/ModuleScreen";
import { DisciplineScreen } from "@/screens/DisciplineScreen";
import { ServiceListScreen } from "@/screens/ServiceListScreen";
import { ServiceDetailScreen } from "@/screens/ServiceDetailScreen";
import { CommissioningSystemsScreen } from "@/screens/CommissioningSystemsScreen";
import { CommissioningListScreen } from "@/screens/CommissioningListScreen";
import { CommissioningDetailScreen } from "@/screens/CommissioningDetailScreen";

type Screen = 'login' | 'contracts' | 'modules' | 'disciplines' | 'services' | 'service-detail' | 
             'commissioning-systems' | 'commissioning-list' | 'commissioning-detail';

interface Contract {
  codigo: string;
  nome: string;
  cliente: string;
  empresa: string;
  status: 'ativo' | 'encerrado';
}

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

export const SisEPCApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceSheet | null>(null);
  const [selectedCommissioningSystem, setSelectedCommissioningSystem] = useState<string>('');
  const [selectedCommissioningItem, setSelectedCommissioningItem] = useState<CommissioningItem | null>(null);

  const handleLogin = () => {
    setCurrentScreen('contracts');
  };

  const handleContractSelect = (contract: Contract) => {
    setSelectedContract(contract);
    setCurrentScreen('modules');
  };

  const handleModuleSelect = (module: string) => {
    setSelectedModule(module);
    if (module === 'programacao') {
      setCurrentScreen('disciplines');
    } else if (module === 'comissionamento') {
      setCurrentScreen('commissioning-systems');
    }
  };

  const handleDisciplineSelect = (discipline: string) => {
    setSelectedDiscipline(discipline);
    setCurrentScreen('services');
  };

  const handleServiceSelect = (service: ServiceSheet) => {
    setSelectedService(service);
    setCurrentScreen('service-detail');
  };

  const handleCommissioningSystemSelect = (system: string) => {
    setSelectedCommissioningSystem(system);
    setCurrentScreen('commissioning-list');
  };

  const handleCommissioningItemSelect = (item: CommissioningItem) => {
    setSelectedCommissioningItem(item);
    setCurrentScreen('commissioning-detail');
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'contracts':
        setCurrentScreen('login');
        break;
      case 'modules':
        setCurrentScreen('contracts');
        break;
      case 'disciplines':
        setCurrentScreen('modules');
        break;
      case 'services':
        setCurrentScreen('disciplines');
        break;
      case 'service-detail':
        setCurrentScreen('services');
        break;
      case 'commissioning-systems':
        setCurrentScreen('modules');
        break;
      case 'commissioning-list':
        setCurrentScreen('commissioning-systems');
        break;
      case 'commissioning-detail':
        setCurrentScreen('commissioning-list');
        break;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      
      case 'contracts':
        return (
          <ContractScreen
            onContractSelect={handleContractSelect}
            onBack={handleBack}
          />
        );
      
      case 'modules':
        return (
          <ModuleScreen
            contractName={selectedContract?.nome || ''}
            onModuleSelect={handleModuleSelect}
            onBack={handleBack}
          />
        );
      
      case 'disciplines':
        return (
          <DisciplineScreen
            onDisciplineSelect={handleDisciplineSelect}
            onBack={handleBack}
          />
        );
      
      case 'services':
        return (
          <ServiceListScreen
            discipline={selectedDiscipline}
            onServiceSelect={handleServiceSelect}
            onBack={handleBack}
          />
        );
      
      case 'service-detail':
        return (
          <ServiceDetailScreen
            serviceNumber={selectedService?.numero || ''}
            onBack={handleBack}
          />
        );
      
      case 'commissioning-systems':
        return (
          <CommissioningSystemsScreen
            onSystemSelect={handleCommissioningSystemSelect}
            onBack={handleBack}
          />
        );
      
      case 'commissioning-list':
        return (
          <CommissioningListScreen
            system={selectedCommissioningSystem}
            onItemSelect={handleCommissioningItemSelect}
            onBack={handleBack}
          />
        );
      
      case 'commissioning-detail':
        return (
          <CommissioningDetailScreen
            itemTag={selectedCommissioningItem?.tag || ''}
            onBack={handleBack}
          />
        );
      
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="font-ubuntu antialiased">
      {renderScreen()}
    </div>
  );
};
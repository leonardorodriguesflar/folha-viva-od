import { useState } from "react";
import { LoginScreen } from "@/screens/LoginScreen";
import { ContractScreen } from "@/screens/ContractScreen";
import { ModuleScreen } from "@/screens/ModuleScreen";
import { DisciplineScreen } from "@/screens/DisciplineScreen";
import { ServiceListScreen } from "@/screens/ServiceListScreen";
import { ServiceDetailScreen } from "@/screens/ServiceDetailScreen";

type Screen = 'login' | 'contracts' | 'modules' | 'disciplines' | 'services' | 'service-detail';

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

export const SisEPCApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceSheet | null>(null);

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
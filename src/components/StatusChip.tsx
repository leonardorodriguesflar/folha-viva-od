import { cn } from "@/lib/utils";

interface StatusChipProps {
  status: 'ativo' | 'encerrado' | 'em-andamento' | 'concluida' | 'aberta';
  className?: string;
}

export const StatusChip = ({ status, className }: StatusChipProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'ativo':
        return {
          label: 'ATIVO',
          className: 'bg-status-active text-white'
        };
      case 'encerrado':
        return {
          label: 'ENCERRADO',
          className: 'bg-muted text-muted-foreground'
        };
      case 'em-andamento':
        return {
          label: 'EM ANDAMENTO',
          className: 'bg-status-progress text-white'
        };
      case 'concluida':
        return {
          label: 'CONCLUÍDA',
          className: 'bg-status-complete text-white'
        };
      case 'aberta':
        return {
          label: 'ABERTA',
          className: 'bg-status-pending text-white'
        };
      default:
        return {
          label: status.toUpperCase(),
          className: 'bg-muted text-muted-foreground'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-ubuntu font-medium",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};
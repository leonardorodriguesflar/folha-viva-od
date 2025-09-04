import { ArrowLeft, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showSync?: boolean;
  isOnline?: boolean;
  lastSync?: string;
  onSync?: () => void;
}

export const MobileHeader = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  showSync = false,
  isOnline = true,
  lastSync,
  onSync
}: MobileHeaderProps) => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary/20 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="text-lg font-ubuntu font-bold">EPC</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showSync && (
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="h-4 w-4 text-success" />
              ) : (
                <WifiOff className="h-4 w-4 text-warning" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onSync}
                className="text-primary-foreground hover:bg-primary/20 p-2"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {title && (
        <div className="mt-2">
          <h1 className="text-lg font-ubuntu font-medium">{title}</h1>
          {subtitle && (
            <p className="text-sm opacity-90 font-ubuntu font-light">{subtitle}</p>
          )}
        </div>
      )}

      {lastSync && (
        <div className="mt-2 text-xs opacity-75 font-ubuntu font-light">
          Última sincronização: {lastSync}
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

interface ActionButtonsProps {
  onDownload: () => void;
  onTelegramShare: () => void;
  hideTelegramShare?: boolean;
}

export const ActionButtons = ({ 
  onDownload, 
  onTelegramShare, 
  hideTelegramShare = false 
}: ActionButtonsProps) => {
  return (
    <div className="mt-5 border-t border-white/10 pt-5">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={onDownload}
          className="h-12 flex-1 rounded-xl bg-amber-300 text-slate-950 font-semibold hover:bg-amber-200 focus-visible:ring-amber-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </Button>
        
        {!hideTelegramShare && (
          <Button
            onClick={onTelegramShare}
            variant="outline"
            className="h-12 flex-1 rounded-xl border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share to Telegram
          </Button>
        )}
      </div>
      <p className="mt-3 text-center text-xs text-slate-400">1080 × 1080 px · PNG image</p>
    </div>
  );
};

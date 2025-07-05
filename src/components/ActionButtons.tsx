
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
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20">
      <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={onDownload}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Poster
        </Button>
        
        {!hideTelegramShare && (
          <Button
            onClick={onTelegramShare}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/20 flex-1"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share to Telegram
          </Button>
        )}
      </div>
    </div>
  );
};

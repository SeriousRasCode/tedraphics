
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';

interface ActionButtonsProps {
  onDownload: () => void;
  onTelegramShare: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDownload,
  onTelegramShare
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 space-y-3">
      <Button 
        onClick={onDownload}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
      >
        <Download className="mr-2 h-5 w-5" />
        Download Poster (1080×1080)
      </Button>
      
      <Button 
        onClick={onTelegramShare}
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
      >
        <Send className="mr-2 h-5 w-5" />
        Share to Telegram Bot
      </Button>
    </div>
  );
};

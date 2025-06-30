
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Info, Code } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const HeaderSection: React.FC = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showVersion, setShowVersion] = useState(false);

  return (
    <div className="text-center mb-6 sm:mb-8 relative">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">
        Tedraphics
      </h1>
      <p className="text-sm sm:text-xl text-blue-200 max-w-2xl mx-auto px-4">
        Create beautiful 1080×1080 posters with elegant designs and bilingual support
      </p>
      
      {/* Dropdown Menu */}
      <div className="absolute top-0 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border border-white/20 z-50">
            <DropdownMenuLabel className="text-lg font-semibold text-slate-800">
              Menu
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="flex items-center gap-3 p-4 hover:bg-slate-100 cursor-pointer"
              onClick={() => setShowAbout(!showAbout)}
            >
              <Info className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-slate-800">About</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="flex items-center gap-3 p-4 hover:bg-slate-100 cursor-pointer"
              onClick={() => setShowVersion(!showVersion)}
            >
              <Code className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-slate-800">Version</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* About Message */}
      {showAbout && (
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-left max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Info className="h-5 w-5 text-blue-400" />
            <span className="font-semibold text-white">About</span>
          </div>
          <p className="text-sm text-blue-200 leading-relaxed">
            Built By <span className="font-medium text-blue-300">Tedros Teshome (Ras Moa)</span>, 
            for automating poster design when there is no one to design urgent posters.
          </p>
        </div>
      )}

      {/* Version Message */}
      {showVersion && (
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-left max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Code className="h-5 w-5 text-green-400" />
            <span className="font-semibold text-white">Version</span>
          </div>
          <p className="text-sm text-blue-200">v1.0.0 ras</p>
        </div>
      )}
    </div>
  );
};

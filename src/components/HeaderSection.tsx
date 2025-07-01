
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Menu } from 'lucide-react';

export const HeaderSection = () => {
  return (
    <div className="text-center mb-6 sm:mb-12">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-600 mb-3 sm:mb-4">
            Tedraphics
          </h1>
          <p className="text-lg sm:text-xl text-blue-100/90 mb-4 sm:mb-6 max-w-2xl mx-auto">
            Create beautiful 1080×1080 posters easy
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Menu className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-600 text-white">
            <DialogHeader>
              <DialogTitle className="text-yellow-400">About Tedraphics</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-slate-300">
                  Tedraphics is a powerful poster creation tool designed for creating beautiful 1080×1080 posters.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Developer</h3>
                <p className="text-slate-300">Created by Tedros Teshome</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Version</h3>
                <p className="text-slate-300">Version 2.1.0 ras</p>
                <p className="text-sm text-slate-400">Built with React + Vite</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>• Custom font uploads</li>
                  <li>• Multiple frame styles</li>
                  <li>• Gradient customization</li>
                  <li>• Social media integration</li>
                  <li>• Clipart support</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

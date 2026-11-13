import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Info } from 'lucide-react';

export const HeaderSection = () => {
  return (
    <header className="mb-7 border-b border-white/10 pb-6 sm:mb-9 sm:pb-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
            Poster studio
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Tedraphics<span className="text-amber-300">.</span></h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Create a polished social poster in minutes, right from your browser.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="About Tedraphics" className="h-11 w-11 shrink-0 rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Info className="h-5 w-5" aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent className="border-slate-700 bg-slate-900 text-white">
            <DialogHeader>
              <DialogTitle className="text-amber-300">About Tedraphics</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm leading-6 text-slate-300">
              <p>Tedraphics helps you make 1080 × 1080 social media posters with your own text, images, and colors.</p>
              <p>Your uploads stay in this browser. Use Download PNG to save the finished poster to your device.</p>
              <p>Created by Tedros Teshome.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

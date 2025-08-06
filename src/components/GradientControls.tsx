
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface GradientStop {
  color: string;
  opacity: number;
  position: number; // 0-100 percentage
}

interface SimpleGradientConfig {
  enabled: boolean;
  height: number;
  stops: GradientStop[];
}

interface GradientConfig {
  enabled: boolean;
  top: SimpleGradientConfig;
  bottom: SimpleGradientConfig;
}

interface GradientControlsProps {
  gradient: GradientConfig;
  onGradientChange: (gradient: GradientConfig) => void;
}

export const GradientControls = ({ gradient, onGradientChange }: GradientControlsProps) => {
  const updateGradient = (updates: Partial<GradientConfig>) => {
    onGradientChange({ ...gradient, ...updates });
  };

  const updateTopGradient = (updates: Partial<SimpleGradientConfig>) => {
    updateGradient({ top: { ...gradient.top, ...updates } });
  };

  const updateBottomGradient = (updates: Partial<SimpleGradientConfig>) => {
    updateGradient({ bottom: { ...gradient.bottom, ...updates } });
  };

  const updateTopStop = (index: number, updates: Partial<GradientStop>) => {
    const newStops = [...gradient.top.stops];
    newStops[index] = { ...newStops[index], ...updates };
    updateTopGradient({ stops: newStops });
  };

  const updateBottomStop = (index: number, updates: Partial<GradientStop>) => {
    const newStops = [...gradient.bottom.stops];
    newStops[index] = { ...newStops[index], ...updates };
    updateBottomGradient({ stops: newStops });
  };

  const addTopStop = () => {
    const newStop: GradientStop = {
      color: '#083765',
      opacity: 80,
      position: 50
    };
    updateTopGradient({ stops: [...gradient.top.stops, newStop] });
  };

  const addBottomStop = () => {
    const newStop: GradientStop = {
      color: '#083765',
      opacity: 80,
      position: 50
    };
    updateBottomGradient({ stops: [...gradient.bottom.stops, newStop] });
  };

  const removeTopStop = (index: number) => {
    if (gradient.top.stops.length > 2) {
      const newStops = gradient.top.stops.filter((_, i) => i !== index);
      updateTopGradient({ stops: newStops });
    }
  };

  const removeBottomStop = (index: number) => {
    if (gradient.bottom.stops.length > 2) {
      const newStops = gradient.bottom.stops.filter((_, i) => i !== index);
      updateBottomGradient({ stops: newStops });
    }
  };

  return (
    <div className="space-y-6 bg-white/5 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <Label className="text-white text-lg font-semibold">Background Gradients</Label>
        <Switch
          checked={gradient.enabled}
          onCheckedChange={(enabled) => updateGradient({ enabled })}
        />
      </div>

      {gradient.enabled && (
        <div className="space-y-8">
          {/* Top Gradient Controls */}
          <div className="space-y-4 bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <Label className="text-white font-semibold">Top Gradient</Label>
              <Switch
                checked={gradient.top.enabled}
                onCheckedChange={(enabled) => updateTopGradient({ enabled })}
              />
            </div>

            {gradient.top.enabled && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Height: {gradient.top.height}px</Label>
                  <Slider
                    value={[gradient.top.height]}
                    onValueChange={([height]) => updateTopGradient({ height })}
                    max={540}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white font-medium">Color Stops</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addTopStop}
                      className="text-white border-white/30 hover:bg-white/20"
                    >
                      Add Stop
                    </Button>
                  </div>

                  {gradient.top.stops.map((stop, index) => (
                    <div key={index} className="space-y-3 p-3 bg-white/5 rounded border border-white/10">
                      <div className="flex items-center justify-between">
                        <Label className="text-white text-sm">Stop {index + 1}</Label>
                        {gradient.top.stops.length > 2 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTopStop(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/20 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-white text-xs">Color</Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={stop.color}
                              onChange={(e) => updateTopStop(index, { color: e.target.value })}
                              className="w-8 h-8 rounded border border-white/30"
                            />
                            <input
                              type="text"
                              value={stop.color}
                              onChange={(e) => updateTopStop(index, { color: e.target.value })}
                              className="flex-1 bg-white/20 border border-white/30 text-white text-xs rounded px-2 py-1"
                              placeholder="#083765"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white text-xs">Opacity: {stop.opacity}%</Label>
                          <Slider
                            value={[stop.opacity]}
                            onValueChange={([opacity]) => updateTopStop(index, { opacity })}
                            max={100}
                            min={0}
                            step={5}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white text-xs">Position: {stop.position}%</Label>
                        <Slider
                          value={[stop.position]}
                          onValueChange={([position]) => updateTopStop(index, { position })}
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bottom Gradient Controls */}
          <div className="space-y-4 bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center justify-between">
              <Label className="text-white font-semibold">Bottom Gradient</Label>
              <Switch
                checked={gradient.bottom.enabled}
                onCheckedChange={(enabled) => updateBottomGradient({ enabled })}
              />
            </div>

            {gradient.bottom.enabled && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Height: {gradient.bottom.height}px</Label>
                  <Slider
                    value={[gradient.bottom.height]}
                    onValueChange={([height]) => updateBottomGradient({ height })}
                    max={540}
                    min={50}
                    step={10}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white font-medium">Color Stops</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={addBottomStop}
                      className="text-white border-white/30 hover:bg-white/20"
                    >
                      Add Stop
                    </Button>
                  </div>

                  {gradient.bottom.stops.map((stop, index) => (
                    <div key={index} className="space-y-3 p-3 bg-white/5 rounded border border-white/10">
                      <div className="flex items-center justify-between">
                        <Label className="text-white text-sm">Stop {index + 1}</Label>
                        {gradient.bottom.stops.length > 2 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeBottomStop(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/20 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-white text-xs">Color</Label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={stop.color}
                              onChange={(e) => updateBottomStop(index, { color: e.target.value })}
                              className="w-8 h-8 rounded border border-white/30"
                            />
                            <input
                              type="text"
                              value={stop.color}
                              onChange={(e) => updateBottomStop(index, { color: e.target.value })}
                              className="flex-1 bg-white/20 border border-white/30 text-white text-xs rounded px-2 py-1"
                              placeholder="#083765"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-white text-xs">Opacity: {stop.opacity}%</Label>
                          <Slider
                            value={[stop.opacity]}
                            onValueChange={([opacity]) => updateBottomStop(index, { opacity })}
                            max={100}
                            min={0}
                            step={5}
                            className="w-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white text-xs">Position: {stop.position}%</Label>
                        <Slider
                          value={[stop.position]}
                          onValueChange={([position]) => updateBottomStop(index, { position })}
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export type { GradientConfig, GradientStop };

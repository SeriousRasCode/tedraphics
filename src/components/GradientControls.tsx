import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface GradientStop {
  color: string;
  opacity: number;
  position: number; // 0-100 percentage
}

interface GradientConfig {
  enabled: boolean;
  type: 'linear' | 'radial';
  direction: 'top' | 'bottom' | 'both' | 'center';
  angle: number; // 0-360 degrees for linear gradients
  height: number; // How much of the canvas height the gradient covers
  stops: GradientStop[];
}

interface GradientControlsProps {
  gradient: GradientConfig;
  onGradientChange: (gradient: GradientConfig) => void;
}

export const GradientControls = ({ gradient, onGradientChange }: GradientControlsProps) => {
  const updateGradient = (updates: Partial<GradientConfig>) => {
    onGradientChange({ ...gradient, ...updates });
  };

  const updateStop = (index: number, updates: Partial<GradientStop>) => {
    const newStops = [...gradient.stops];
    newStops[index] = { ...newStops[index], ...updates };
    updateGradient({ stops: newStops });
  };

  const addStop = () => {
    const newStop: GradientStop = {
      color: '#083765',
      opacity: 80,
      position: 50
    };
    updateGradient({ stops: [...gradient.stops, newStop] });
  };

  const removeStop = (index: number) => {
    if (gradient.stops.length > 2) {
      const newStops = gradient.stops.filter((_, i) => i !== index);
      updateGradient({ stops: newStops });
    }
  };

  return (
    <div className="space-y-6 bg-white/5 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <Label className="text-white text-lg font-semibold">Background Gradient</Label>
        <Switch
          checked={gradient.enabled}
          onCheckedChange={(enabled) => updateGradient({ enabled })}
        />
      </div>

      {gradient.enabled && (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Gradient Type</Label>
              <Select value={gradient.type} onValueChange={(type: 'linear' | 'radial') => updateGradient({ type })}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Direction</Label>
              <Select value={gradient.direction} onValueChange={(direction: 'top' | 'bottom' | 'both' | 'center') => updateGradient({ direction })}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="both">Both (Top & Bottom)</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {gradient.type === 'linear' && (
              <div className="space-y-2">
                <Label className="text-white">Angle: {gradient.angle}°</Label>
                <Slider
                  value={[gradient.angle]}
                  onValueChange={([angle]) => updateGradient({ angle })}
                  max={360}
                  min={0}
                  step={15}
                  className="w-full"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-white">Coverage Height: {gradient.height}px</Label>
              <Slider
                value={[gradient.height]}
                onValueChange={([height]) => updateGradient({ height })}
                max={540}
                min={50}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white font-semibold">Color Stops</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={addStop}
                className="text-white border-white/30 hover:bg-white/20"
              >
                Add Stop
              </Button>
            </div>

            {gradient.stops.map((stop, index) => (
              <div key={index} className="space-y-3 p-3 bg-white/5 rounded border border-white/10">
                <div className="flex items-center justify-between">
                  <Label className="text-white text-sm">Stop {index + 1}</Label>
                  {gradient.stops.length > 2 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeStop(index)}
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
                        onChange={(e) => updateStop(index, { color: e.target.value })}
                        className="w-8 h-8 rounded border border-white/30"
                      />
                      <input
                        type="text"
                        value={stop.color}
                        onChange={(e) => updateStop(index, { color: e.target.value })}
                        className="flex-1 bg-white/20 border border-white/30 text-white text-xs rounded px-2 py-1"
                        placeholder="#083765"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-xs">Opacity: {stop.opacity}%</Label>
                    <Slider
                      value={[stop.opacity]}
                      onValueChange={([opacity]) => updateStop(index, { opacity })}
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
                    onValueChange={([position]) => updateStop(index, { position })}
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
  );
};

export type { GradientConfig, GradientStop };
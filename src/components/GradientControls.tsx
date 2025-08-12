
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GradientStop {
  color: string;
  opacity: number;
  position: number; // 0-100 percentage
}

interface SimpleGradientConfig {
  enabled: boolean;
  height: number;
  stops: GradientStop[];
  type: 'linear' | 'radial';
  angle: number; // for linear gradients (0-360 degrees)
  centerX: number; // for radial gradients (0-100%)
  centerY: number; // for radial gradients (0-100%)
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light' | 'hard-light';
  intensity: number; // overall gradient intensity (0-100%)
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

  const renderGradientSection = (
    config: SimpleGradientConfig,
    updateConfig: (updates: Partial<SimpleGradientConfig>) => void,
    updateStop: (index: number, updates: Partial<GradientStop>) => void,
    addStop: () => void,
    removeStop: (index: number) => void,
    title: string
  ) => (
    <div className="space-y-4 bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between">
        <Label className="text-white font-semibold">{title}</Label>
        <Switch
          checked={config.enabled}
          onCheckedChange={(enabled) => updateConfig({ enabled })}
        />
      </div>

      {config.enabled && (
        <>
          {/* Basic Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white text-sm">Height: {config.height}px</Label>
              <Slider
                value={[config.height]}
                onValueChange={([height]) => updateConfig({ height })}
                max={540}
                min={50}
                step={10}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white text-sm">Intensity: {config.intensity}%</Label>
              <Slider
                value={[config.intensity]}
                onValueChange={([intensity]) => updateConfig({ intensity })}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          {/* Gradient Type and Direction */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white text-sm">Type</Label>
              <Select value={config.type} onValueChange={(type: 'linear' | 'radial') => updateConfig({ type })}>
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
              <Label className="text-white text-sm">Blend Mode</Label>
              <Select value={config.blendMode} onValueChange={(blendMode: SimpleGradientConfig['blendMode']) => updateConfig({ blendMode })}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="multiply">Multiply</SelectItem>
                  <SelectItem value="screen">Screen</SelectItem>
                  <SelectItem value="overlay">Overlay</SelectItem>
                  <SelectItem value="soft-light">Soft Light</SelectItem>
                  <SelectItem value="hard-light">Hard Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Direction Controls */}
          {config.type === 'linear' ? (
            <div className="space-y-2">
              <Label className="text-white text-sm">Angle: {config.angle}°</Label>
              <Slider
                value={[config.angle]}
                onValueChange={([angle]) => updateConfig({ angle })}
                max={360}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-sm">Center X: {config.centerX}%</Label>
                <Slider
                  value={[config.centerX]}
                  onValueChange={([centerX]) => updateConfig({ centerX })}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white text-sm">Center Y: {config.centerY}%</Label>
                <Slider
                  value={[config.centerY]}
                  onValueChange={([centerY]) => updateConfig({ centerY })}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Color Stops */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white font-medium">Color Stops</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={addStop}
                className="text-white border-white/30 hover:bg-white/20"
              >
                Add Stop
              </Button>
            </div>

            {config.stops.map((stop, index) => (
              <div key={index} className="space-y-3 p-3 bg-white/5 rounded border border-white/10">
                <div className="flex items-center justify-between">
                  <Label className="text-white text-sm">Stop {index + 1}</Label>
                  {config.stops.length > 2 && (
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
                      step={1}
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
          {renderGradientSection(
            gradient.top,
            updateTopGradient,
            updateTopStop,
            addTopStop,
            removeTopStop,
            "Top Gradient"
          )}

          {renderGradientSection(
            gradient.bottom,
            updateBottomGradient,
            updateBottomStop,
            addBottomStop,
            removeBottomStop,
            "Bottom Gradient"
          )}
        </div>
      )}
    </div>
  );
};

export type { GradientConfig, GradientStop };

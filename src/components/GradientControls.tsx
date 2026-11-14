
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

interface SoftCover {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  softness: number;
}

interface LinearOverlay {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  opacity: number;
  enabled: boolean;
}

interface SimpleGradientConfig {
  enabled: boolean;
  height: number;
  stops: GradientStop[];
  type: 'linear' | 'radial';
  angle: number; // for linear gradients (0-360 degrees)
  centerX: number; // for radial gradients (0-100%)
  centerY: number; // for radial gradients (0-100%)
  blendMode: GlobalCompositeOperation;
  intensity: number; // overall gradient intensity (0-100%)
}

interface GradientConfig {
  enabled: boolean;
  top: SimpleGradientConfig;
  bottom: SimpleGradientConfig;
  covers: SoftCover[];
  linearOverlays: LinearOverlay[];
}

interface GradientControlsProps {
  gradient: GradientConfig;
  onGradientChange: (gradient: GradientConfig) => void;
  themeColor: string;
  hasImage: boolean;
  selectedCoverId: number | null;
  onSelectedCoverChange: (id: number | null) => void;
  onAddCover: (color: string, opacity: number, softness: number) => void;
  selectedLinearId: number | null;
  onSelectedLinearChange: (id: number | null) => void;
  onAddLinear: (initial?: Partial<LinearOverlay>) => void;
  onAddPhotoFades: () => void;
}

export const GradientControls = ({ gradient, onGradientChange, themeColor, hasImage, selectedCoverId, onSelectedCoverChange, onAddCover, selectedLinearId, onSelectedLinearChange, onAddLinear, onAddPhotoFades }: GradientControlsProps) => {
  const selectedCover = gradient.covers.find(cover => cover.id === selectedCoverId);
  const selectedLinear = gradient.linearOverlays.find(layer => layer.id === selectedLinearId);
  const updateLinear = (updates: Partial<LinearOverlay>) => onGradientChange({
    ...gradient,
    linearOverlays: gradient.linearOverlays.map(layer => layer.id === selectedLinearId ? { ...layer, ...updates } : layer),
  });
  const removeLinear = () => {
    const linearOverlays = gradient.linearOverlays.filter(layer => layer.id !== selectedLinearId);
    onGradientChange({ ...gradient, linearOverlays });
    onSelectedLinearChange(linearOverlays[linearOverlays.length - 1]?.id ?? null);
  };

  const updateCover = (updates: Partial<SoftCover>) => {
    onGradientChange({
      ...gradient,
      covers: gradient.covers.map(cover => cover.id === selectedCoverId ? { ...cover, ...updates } : cover),
    });
  };

  const removeCover = () => {
    const covers = gradient.covers.filter(cover => cover.id !== selectedCoverId);
    onGradientChange({ ...gradient, covers });
    onSelectedCoverChange(covers[0]?.id ?? null);
  };
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
              <Select value={config.blendMode} onValueChange={(blendMode: GlobalCompositeOperation) => updateConfig({ blendMode })}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="source-over">Normal</SelectItem>
                  <SelectItem value="multiply">Multiply</SelectItem>
                  <SelectItem value="screen">Screen</SelectItem>
                  <SelectItem value="overlay">Overlay</SelectItem>
                  <SelectItem value="soft-light">Soft Light</SelectItem>
                  <SelectItem value="hard-light">Hard Light</SelectItem>
                  <SelectItem value="darken">Darken</SelectItem>
                  <SelectItem value="lighten">Lighten</SelectItem>
                  <SelectItem value="color-dodge">Color Dodge</SelectItem>
                  <SelectItem value="color-burn">Color Burn</SelectItem>
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
    <div id="gradient-tools" className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4 scroll-mt-20">
      <div>
        <p className="text-sm font-semibold text-white">Gradient layers</p>
        <p className="mt-1 text-xs text-slate-300">Add as many fades as you need. Drag the two ends of a linear fade on the poster.</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button type="button" onClick={() => onAddLinear()} className="h-11 justify-start rounded-lg bg-amber-300 font-semibold text-slate-950 hover:bg-amber-200">
          + Linear fade
        </Button>
        <Button type="button" variant="outline" onClick={() => onAddCover('#0f172a', 85, 70)} className="h-11 justify-start rounded-lg border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">
          + Radial cover
        </Button>
        {hasImage && (
          <Button type="button" variant="outline" onClick={onAddPhotoFades} className="h-11 justify-start gap-3 rounded-lg border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:col-span-2">
            <span aria-hidden="true" className="h-6 w-6 rounded border border-white/20" style={{ background: `linear-gradient(to bottom, ${themeColor}, transparent 50%, ${themeColor})` }} />
            Add top + bottom photo fades
          </Button>
        )}
      </div>
      {gradient.linearOverlays.length > 0 && (
        <div role="group" aria-label="Linear gradient layers" className="space-y-2">
          {gradient.linearOverlays.map((layer, index) => (
            <Button key={layer.id} type="button" variant="outline" aria-pressed={layer.id === selectedLinearId}
              onClick={() => { onSelectedLinearChange(layer.id); onSelectedCoverChange(null); }}
              className={`h-11 w-full justify-start rounded-lg text-white hover:text-white ${layer.id === selectedLinearId ? 'border-amber-300 bg-amber-300/10' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
              <span aria-hidden="true" className="mr-3 h-5 w-5 rounded border border-white/30" style={{ background: `linear-gradient(to bottom, ${layer.color}, transparent)` }} />
              Linear fade {index + 1}{!layer.enabled && ' · hidden'}
            </Button>
          ))}
        </div>
      )}
      {selectedLinear && (
        <div className="space-y-4 rounded-lg border border-amber-300/30 bg-slate-950/30 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-white">Selected linear fade</p>
            <Button type="button" variant="ghost" onClick={removeLinear} className="h-9 px-2 text-sm text-rose-300 hover:bg-rose-400/10 hover:text-rose-200">Remove</Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" onClick={() => onAddLinear({ ...selectedLinear, enabled: true })} className="h-10 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">Duplicate</Button>
            <Button type="button" variant="outline" onClick={() => updateLinear({ enabled: !selectedLinear.enabled })} className="h-10 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white">{selectedLinear.enabled ? 'Hide' : 'Show'}</Button>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-slate-300">Quick direction</p>
            <div role="group" aria-label="Linear fade direction" className="grid grid-cols-4 gap-1">
              {[
                { label: 'Top', startX: 540, startY: 90, endX: 540, endY: 420 },
                { label: 'Bottom', startX: 540, startY: 990, endX: 540, endY: 660 },
                { label: 'Left', startX: 90, startY: 540, endX: 460, endY: 540 },
                { label: 'Right', startX: 990, startY: 540, endX: 620, endY: 540 },
              ].map(direction => (
                <Button key={direction.label} type="button" variant="outline" onClick={() => updateLinear(direction)}
                  className="h-10 rounded-lg border-white/20 bg-white/5 px-1 text-xs text-white hover:bg-white/10 hover:text-white">{direction.label}</Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2"><Label htmlFor="linear-color" className="text-sm text-white">Fade color</Label><input id="linear-color" type="color" value={selectedLinear.color} onChange={event => updateLinear({ color: event.target.value })} className="h-11 w-full cursor-pointer rounded-lg border border-white/20 bg-white/10 p-1" /></div>
            <div className="space-y-2"><Label className="text-sm text-white">Strength: {selectedLinear.opacity}%</Label><Slider aria-label="Linear fade strength" value={[selectedLinear.opacity]} onValueChange={([opacity]) => updateLinear({ opacity })} min={0} max={100} step={1} /></div>
          </div>
          <p className="text-xs text-slate-300">Move either end on the poster to change the fade direction and length.</p>
          <Button type="button" variant="outline"
            onClick={() => document.getElementById('preview-title')?.scrollIntoView({ block: 'start', behavior: 'smooth' })}
            className="h-11 w-full border-amber-300/40 bg-amber-300/10 text-amber-100 hover:bg-amber-300/20 hover:text-white lg:hidden">Move on poster ↑</Button>
        </div>
      )}
      {gradient.covers.length > 0 && <div className="border-t border-white/10 pt-3"><p className="text-sm font-medium text-white">Radial covers</p></div>}
      {gradient.covers.length > 1 && (
        <div role="group" aria-label="Select a soft cover" className="flex flex-wrap gap-2">
          {gradient.covers.map((cover, index) => (
            <Button key={cover.id} type="button" variant="outline" aria-pressed={cover.id === selectedCoverId}
              onClick={() => onSelectedCoverChange(cover.id)}
              className={`h-10 rounded-lg text-white hover:text-white ${cover.id === selectedCoverId ? 'border-amber-300 bg-amber-300/10' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}>
              Cover {index + 1}
            </Button>
          ))}
        </div>
      )}
      {selectedCover && (
        <div className="space-y-3 rounded-lg border border-amber-300/30 bg-slate-950/30 p-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-white">Cover selected</p>
            <Button type="button" variant="ghost" onClick={removeCover} className="h-9 px-2 text-sm text-rose-300 hover:bg-rose-400/10 hover:text-rose-200">Remove</Button>
          </div>
          <Button type="button" variant="outline"
            onClick={() => document.getElementById('preview-title')?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
            className="h-11 w-full rounded-lg border-amber-300/40 bg-amber-300/10 text-amber-100 hover:bg-amber-300/20 hover:text-white lg:hidden">
            Move on poster ↑
          </Button>
          <details>
            <summary className="cursor-pointer rounded py-2 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">Adjust cover</summary>
            <div className="space-y-4 pt-3">
              <div className="grid grid-cols-3 gap-2" aria-label="Cover colors">
                {[
                  { label: 'Dark', color: '#0f172a', opacity: 85 },
                  { label: 'Light', color: '#ffffff', opacity: 75 },
                  { label: 'Warm', color: '#f59e0b', opacity: 55 },
                ].map(preset => (
                  <Button key={preset.label} type="button" variant="outline"
                    onClick={() => updateCover({ color: preset.color, opacity: preset.opacity })}
                    className="h-11 rounded-lg border-white/20 bg-white/5 text-xs text-white hover:bg-white/10 hover:text-white">
                    {preset.label}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="soft-cover-color" className="text-sm text-white">Custom color</Label>
                <input id="soft-cover-color" type="color" value={selectedCover.color} onChange={event => updateCover({ color: event.target.value })} className="h-11 w-full cursor-pointer rounded-lg border border-white/20 bg-white/10 p-1" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label className="text-sm text-white">Strength: {selectedCover.opacity}%</Label><Slider aria-label="Cover strength" value={[selectedCover.opacity]} onValueChange={([opacity]) => updateCover({ opacity })} min={0} max={100} step={1} /></div>
                <div className="space-y-2"><Label className="text-sm text-white">Size: {selectedCover.radius}px</Label><Slider aria-label="Cover size" value={[selectedCover.radius]} onValueChange={([radius]) => updateCover({ radius })} min={40} max={850} step={10} /></div>
                <div className="space-y-2 sm:col-span-2"><Label className="text-sm text-white">Soft edge: {selectedCover.softness}%</Label><Slider aria-label="Cover soft edge" value={[selectedCover.softness]} onValueChange={([softness]) => updateCover({ softness })} min={0} max={100} step={1} /></div>
              </div>
              <details className="text-sm text-slate-300">
                <summary className="cursor-pointer rounded py-2 font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">Precise position</summary>
                <div className="grid gap-4 pt-3 sm:grid-cols-2">
                  <div className="space-y-2"><Label className="text-sm text-white">Horizontal: {Math.round(selectedCover.x)}px</Label><Slider aria-label="Cover horizontal position" value={[selectedCover.x]} onValueChange={([x]) => updateCover({ x })} min={0} max={1080} step={5} /></div>
                  <div className="space-y-2"><Label className="text-sm text-white">Vertical: {Math.round(selectedCover.y)}px</Label><Slider aria-label="Cover vertical position" value={[selectedCover.y]} onValueChange={([y]) => updateCover({ y })} min={0} max={1080} step={5} /></div>
                </div>
              </details>
            </div>
          </details>
        </div>
      )}
      <details className="border-t border-white/10 pt-3">
        <summary className="cursor-pointer rounded py-2 text-sm font-medium text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">More gradient settings</summary>
        <div className="space-y-5 pt-4">
          <div className="flex items-center justify-between gap-3"><Label htmlFor="gradient-enabled" className="text-sm text-white">Show gradient overlays</Label><Switch id="gradient-enabled" checked={gradient.enabled} onCheckedChange={(enabled) => updateGradient({ enabled })} /></div>
          {renderGradientSection(gradient.top, updateTopGradient, updateTopStop, addTopStop, removeTopStop, 'Top gradient')}
          {renderGradientSection(gradient.bottom, updateBottomGradient, updateBottomStop, addBottomStop, removeBottomStop, 'Bottom gradient')}
        </div>
      </details>
    </div>
  );
};

export type { GradientConfig, GradientStop, SimpleGradientConfig, SoftCover, LinearOverlay };

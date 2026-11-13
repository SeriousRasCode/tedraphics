
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { templates } from '@/utils/posterTemplates';

interface TemplateSelectorProps {
  selectedTemplate: number;
  onTemplateChange: (template: number) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  return (
    <div>
      <label htmlFor="poster-theme" className="block text-white text-sm font-medium mb-2">
        Color theme
      </label>
      <Select
        value={selectedTemplate.toString()}
        onValueChange={(value) => onTemplateChange(parseInt(value))}
      >
        <SelectTrigger id="poster-theme" className="h-11 w-full rounded-xl border-white/20 bg-white/10 text-white">
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          {Object.entries(templates).map(([key, template]) => (
            <SelectItem 
              key={key} 
              value={key}
              className="text-white hover:bg-slate-700"
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-4 w-4 rounded-full border border-white/30" style={{ backgroundColor: template.colors.secondary }} />
                {template.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

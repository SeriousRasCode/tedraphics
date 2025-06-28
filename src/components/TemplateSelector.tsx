
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
    <div className="mb-6">
      <label className="block text-white text-sm font-medium mb-2">
        Choose Template
      </label>
      <Select
        value={selectedTemplate.toString()}
        onValueChange={(value) => onTemplateChange(parseInt(value))}
      >
        <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-700">
          {Object.entries(templates).map(([key, template]) => (
            <SelectItem 
              key={key} 
              value={key}
              className="text-white hover:bg-slate-700"
            >
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

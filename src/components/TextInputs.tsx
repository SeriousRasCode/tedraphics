
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface TextInputsProps {
  title: string;
  mainText: string;
  quotedText: string;
  onTitleChange: (value: string) => void;
  onMainTextChange: (value: string) => void;
  onQuotedTextChange: (value: string) => void;
}

export const TextInputs: React.FC<TextInputsProps> = ({
  title,
  mainText,
  quotedText,
  onTitleChange,
  onMainTextChange,
  onQuotedTextChange,
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Title
        </label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter your title"
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Main Content
        </label>
        <Textarea
          value={mainText}
          onChange={(e) => onMainTextChange(e.target.value)}
          placeholder="Enter your main content"
          rows={4}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
        />
      </div>

      <div>
        <label className="block text-white text-sm font-medium mb-2">
          Quoted Text (Optional)
        </label>
        <Textarea
          value={quotedText}
          onChange={(e) => onQuotedTextChange(e.target.value)}
          placeholder="Enter a quote or special message"
          rows={2}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
        />
      </div>
    </div>
  );
};

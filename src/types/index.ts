export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
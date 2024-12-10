import { AlertCircle } from 'lucide-react';

interface ValidationErrorsProps {
  errors: string[];
}

export function ValidationErrors({ errors }: ValidationErrorsProps) {
  if (errors.length === 0) return null;

  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
        <AlertCircle className="w-5 h-5" />
        <span>Validation Errors</span>
      </div>
      <ul className="list-disc list-inside space-y-1 text-red-700">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
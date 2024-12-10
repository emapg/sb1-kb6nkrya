import React, { useState, useCallback } from 'react';
import { Wand2, CheckCircle2, XCircle, FileJson } from 'lucide-react';
import toast from 'react-hot-toast';
import { Editor } from './components/Editor';
import { ValidationErrors } from './components/ValidationErrors';
import { generateSchema } from './utils/schemaGenerator';
import { validateJson } from './utils/validator';
import type { ValidationResult } from './types';

const DEFAULT_JSON = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "hobbies": ["reading", "gaming"]
}`;

function App() {
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [schema, setSchema] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult>({ isValid: true, errors: [] });

  const handleGenerateSchema = useCallback(() => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const generatedSchema = generateSchema(parsedJson);
      setSchema(JSON.stringify(generatedSchema, null, 2));
      toast.success('Schema generated successfully!');
    } catch (error) {
      toast.error('Invalid JSON input');
    }
  }, [jsonInput]);

  const handleValidate = useCallback(() => {
    if (!schema) {
      toast.error('Please generate or input a schema first');
      return;
    }
    const result = validateJson(jsonInput, schema);
    setValidationResult(result);
    
    if (result.isValid) {
      toast.success('Validation successful!');
    } else {
      toast.error('Validation failed');
    }
  }, [jsonInput, schema]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <FileJson className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">JSON Schema Generator & Validator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">JSON Input</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleGenerateSchema}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Schema
                </button>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Editor
                value={jsonInput}
                onChange={setJsonInput}
                language="json"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">JSON Schema</h2>
              <button
                onClick={handleValidate}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {validationResult.isValid ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                Validate
              </button>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <Editor
                value={schema}
                onChange={setSchema}
                language="json"
              />
            </div>
            <ValidationErrors errors={validationResult.errors} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
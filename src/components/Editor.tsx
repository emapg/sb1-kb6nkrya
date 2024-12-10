import { Editor as MonacoEditor } from '@monaco-editor/react';
import type { EditorProps } from '../types';

export function Editor({ value, onChange, language, height = '400px' }: EditorProps) {
  return (
    <MonacoEditor
      height={height}
      language={language}
      value={value}
      onChange={(value) => onChange(value || '')}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true
      }}
    />
  );
}
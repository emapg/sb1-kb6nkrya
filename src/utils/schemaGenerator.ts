export function generateSchema(json: any): any {
  if (json === null) return { type: 'null' };
  
  switch (typeof json) {
    case 'string':
      return { type: 'string' };
    case 'number':
      return { type: 'number' };
    case 'boolean':
      return { type: 'boolean' };
    case 'object':
      if (Array.isArray(json)) {
        const items = json.length > 0 
          ? generateSchema(json[0])
          : {};
        return {
          type: 'array',
          items
        };
      }
      
      const properties: Record<string, any> = {};
      const required: string[] = [];
      
      Object.entries(json).forEach(([key, value]) => {
        properties[key] = generateSchema(value);
        required.push(key);
      });
      
      return {
        type: 'object',
        properties,
        required
      };
    default:
      return {};
  }
}
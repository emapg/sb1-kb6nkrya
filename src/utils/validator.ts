import Ajv from 'ajv';
import type { ValidationResult } from '../types';

const ajv = new Ajv();

export function validateJson(json: string, schema: string): ValidationResult {
  try {
    const parsedJson = JSON.parse(json);
    const parsedSchema = JSON.parse(schema);
    
    const validate = ajv.compile(parsedSchema);
    const isValid = validate(parsedJson);
    
    return {
      isValid: !!isValid,
      errors: isValid ? [] : validate.errors?.map(err => `${err.instancePath} ${err.message}`) || []
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [(error as Error).message]
    };
  }
}
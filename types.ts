// Fix: Populate the types.ts file with required type definitions.
export enum ProcessingState {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type ExtractedData = Record<string, any>[];

export interface Template {
  name: string;
  fields: string[];
}

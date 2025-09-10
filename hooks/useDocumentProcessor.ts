// Fix: Populate the custom hook to manage document processing state.
import { useState, useCallback } from 'react';
import { ExtractedData, ProcessingState } from '../types';

export const useDocumentProcessor = () => {
  const [processingState, setProcessingState] = useState<ProcessingState>(ProcessingState.IDLE);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const processDocument = useCallback(async (selectedFile: File, extractor: (file: File) => Promise<ExtractedData>) => {
    setProcessingState(ProcessingState.PROCESSING);
    setExtractedData(null);
    setError(null);
    setFile(selectedFile);

    try {
      const data = await extractor(selectedFile);
      setExtractedData(data);
      setProcessingState(ProcessingState.SUCCESS);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Bilinmeyen bir hata oluştu.';
      console.error(e);
      setError(errorMessage);
      setProcessingState(ProcessingState.ERROR);
    }
  }, []);

  const reset = useCallback(() => {
    setProcessingState(ProcessingState.IDLE);
    setExtractedData(null);
    setError(null);
    setFile(null);
  }, []);

  return {
    processingState,
    extractedData,
    error,
    file,
    processDocument,
    reset,
  };
};

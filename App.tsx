import React, { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { FileUpload } from './components/FileUpload';
import { Loader } from './components/Loader';
import { DataTable } from './components/DataTable';
import { ActionButton } from './components/ActionButton';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Icon } from './components/Icon';
import { useDocumentProcessor } from './hooks/useDocumentProcessor';
import { extractInitialDataForTemplate, extractDataUsingTemplate } from './services/geminiService';
import { ProcessingState, Template, ExtractedData } from './types';

const App: React.FC = () => {
  const { processingState, extractedData, error, file, processDocument, reset } = useDocumentProcessor();
  
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [selectedTemplateFields, setSelectedTemplateFields] = useState(new Set<string>());
  const [newTemplateName, setNewTemplateName] = useState('');
  const [templateNameError, setTemplateNameError] = useState<string | null>(null);
  const [sessionDocuments, setSessionDocuments] = useState<{ fileName: string; data: ExtractedData }[]>([]);
  const [confirmingClear, setConfirmingClear] = useState(false);

  // Load templates from localStorage on initial render
  useEffect(() => {
    try {
      const storedTemplates = localStorage.getItem('doc-extractor-templates');
      if (storedTemplates) {
        setTemplates(JSON.parse(storedTemplates));
      }
    } catch (e) {
      console.error("Şablonlar localStorage'dan yüklenemedi", e);
    }
  }, []);

  // Save templates to localStorage whenever they change
  useEffect(() => {
    try {
        localStorage.setItem('doc-extractor-templates', JSON.stringify(templates));
    } catch (e) {
        console.error("Şablonlar localStorage'a kaydedilemedi", e);
    }
  }, [templates]);

  // Handle successful data extraction
  useEffect(() => {
    if (processingState === ProcessingState.SUCCESS && !isCreatingTemplate && extractedData && file) {
      setSessionDocuments(prev => [...prev, { fileName: file.name, data: extractedData }]);
      reset(); // Go back to idle to allow next upload
    }
  }, [processingState, isCreatingTemplate, extractedData, file, reset]);
  
  // Timeout for clear confirmation
  useEffect(() => {
    let timer: number;
    if (confirmingClear) {
        timer = window.setTimeout(() => {
            setConfirmingClear(false);
        }, 4000); // Reset after 4 seconds
    }
    return () => clearTimeout(timer);
  }, [confirmingClear]);

  const handleTemplateNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewTemplateName(name);
    if (name.trim() === '') {
        setTemplateNameError("Şablon adı boş olamaz.");
    } else if (templates.some(t => t.name.toLowerCase() === name.toLowerCase().trim())) {
        setTemplateNameError("Bu isimde bir şablon zaten mevcut.");
    } else {
        setTemplateNameError(null);
    }
  };

  const handleFileUpload = useCallback((selectedFile: File) => {
    if (activeTemplate) {
      processDocument(selectedFile, (file) => extractDataUsingTemplate(file, activeTemplate.fields));
    } else {
      setIsCreatingTemplate(true);
      setSelectedTemplateFields(new Set<string>());
      const initialName = selectedFile.name.split('.').slice(0, -1).join('.') || "Yeni Şablon";
      setNewTemplateName(initialName);
       if (templates.some(t => t.name.toLowerCase() === initialName.toLowerCase())) {
        setTemplateNameError("Bu isimde bir şablon zaten mevcut. Lütfen değiştirin.");
      } else {
        setTemplateNameError(null);
      }
      processDocument(selectedFile, extractInitialDataForTemplate);
    }
  }, [activeTemplate, processDocument, templates]);
  
  const handleToggleTemplateField = useCallback((field: string) => {
    setSelectedTemplateFields(prev => {
      const newSet = new Set(prev);
      if (newSet.has(field)) {
        newSet.delete(field);
      } else {
        newSet.add(field);
      }
      return newSet;
    });
  }, []);

  const handleSaveTemplate = () => {
    const trimmedName = newTemplateName.trim();
    if (trimmedName === '' || !!templateNameError || selectedTemplateFields.size === 0) {
      return;
    }
    const fields = Array.from(selectedTemplateFields);
    const newTemplate: Template = { name: trimmedName, fields };
    
    setTemplates(prev => [...prev, newTemplate]);
    setActiveTemplate(newTemplate);
    setIsCreatingTemplate(false);
    setSessionDocuments([]); // Reset session
    reset();
  };
  
  const handleSelectTemplate = (templateName: string) => {
    const selected = templates.find(t => t.name === templateName);
    if (selected) {
      setActiveTemplate(selected);
      setSessionDocuments([]); // Reset session
      reset();
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteTemplate = (templateName: string) => {
    if (window.confirm(`"${templateName}" şablonunu silmek istediğinizden emin misiniz?`)) {
      setTemplates(prev => prev.filter(t => t.name !== templateName));
      if (activeTemplate?.name === templateName) {
        setActiveTemplate(null);
        setSessionDocuments([]); // Reset session
      }
    }
  };

  const handleNewTemplate = () => {
     setActiveTemplate(null);
     setSessionDocuments([]); // Reset session
     reset();
     setIsSidebarOpen(false);
  };
  
  const handleReset = () => {
    setIsCreatingTemplate(false);
    reset();
  };

  const handleClearSessionClick = () => {
    if (confirmingClear) {
        setSessionDocuments([]);
        setConfirmingClear(false);
    } else {
        if (sessionDocuments.length > 0) {
            setConfirmingClear(true);
        }
    }
  };

  const downloadAllAsXLSX = () => {
    if (sessionDocuments.length === 0) return;

    const allData = sessionDocuments.flatMap(doc => doc.data);
    if (allData.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(allData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Çıkarılan Veriler");

    const today = new Date();
    const dateStr = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
    const fileName = `${activeTemplate?.name || 'Veriler'}-${dateStr}.xlsx`;
    
    XLSX.writeFile(workbook, fileName);
  };

  const renderContent = () => {
    switch (processingState) {
      case ProcessingState.PROCESSING:
        return <Loader message="Belge analiz ediliyor, lütfen bekleyin..." />;
      
      case ProcessingState.SUCCESS:
        if (isCreatingTemplate) {
          const isSaveDisabled = selectedTemplateFields.size === 0 || !!templateNameError || newTemplateName.trim() === '';
          return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Adım 2: Şablon Oluşturma</h2>
                  <p className="text-slate-400 mt-1">
                    Şablonunuza bir ad verin ve aşağıdaki tablonun başlıklarından dahil edilecek alanları seçin.
                  </p>
                </div>
                <ActionButton onClick={handleReset} variant="secondary">
                  İptal
                </ActionButton>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-grow w-full">
                      <label htmlFor="template-name" className="block text-sm font-medium text-slate-300 mb-2">Şablon Adı</label>
                      <input
                          type="text"
                          id="template-name"
                          value={newTemplateName}
                          onChange={handleTemplateNameChange}
                          className={`w-full bg-slate-700 text-white rounded-md border ${templateNameError ? 'border-red-500' : 'border-slate-600'} px-4 py-2 focus:outline-none focus:ring-2 ${templateNameError ? 'focus:ring-red-500' : 'focus:ring-cyan-500'}`}
                      />
                      {templateNameError && <p className="text-red-400 text-sm mt-2">{templateNameError}</p>}
                  </div>
                  <div className="flex-shrink-0 w-full md:w-auto pt-0 md:pt-8">
                      <ActionButton 
                          onClick={handleSaveTemplate} 
                          disabled={isSaveDisabled}
                      >
                          Şablonu Kaydet
                      </ActionButton>
                  </div>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-4">Veri Önizlemesi ve Alan Seçimi</h3>
              {extractedData && (
                <DataTable 
                  data={extractedData} 
                  isSelectable={true}
                  selectedHeaders={selectedTemplateFields}
                  onHeaderSelect={handleToggleTemplateField}
                />
              )}
            </div>
          );
        }
        return null;

      case ProcessingState.ERROR:
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Bir Hata Oluştu</h2>
            <p className="text-slate-300 mb-6">{error}</p>
            <ActionButton onClick={handleReset} variant="error">
              Tekrar Dene
            </ActionButton>
          </div>
        );
        
      case ProcessingState.IDLE:
      default:
        return (
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center pt-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                    {activeTemplate ? `Şablon: ${activeTemplate.name}` : 'Yeni Bir Şablon Oluştur'}
                </h2>
                <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                    {activeTemplate ? `Bu şablonu kullanarak veri çıkarmak için bir veya daha fazla belge yükleyin.` : `Bir belge yükleyerek başlayın. Yeniden kullanılabilir bir şablon oluşturmak için alanları otomatik olarak algılayacağız.`}
                </p>
                <FileUpload onFileUpload={handleFileUpload} />
                 {activeTemplate && (
                    <button onClick={handleNewTemplate} className="mt-4 text-sm text-cyan-500 hover:underline">
                        veya, yeni bir şablon oluştur
                    </button>
                )}
              </div>

              {activeTemplate && (
                <div className="mt-16">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Taranan Belgeler ({sessionDocuments.reduce((acc, doc) => acc + doc.data.length, 0)} satır)</h3>
                        <div className="flex items-center gap-4">
                            <ActionButton 
                                onClick={handleClearSessionClick}
                                disabled={sessionDocuments.length === 0}
                                variant={confirmingClear ? "error" : "secondary"}
                                icon={<Icon name={confirmingClear ? "error-circle" : "trash"} className="w-5 h-5" />}
                            >
                                {confirmingClear ? "Temizlemeyi Onayla" : "Listeyi Temizle"}
                            </ActionButton>
                            <ActionButton 
                                onClick={downloadAllAsXLSX} 
                                disabled={sessionDocuments.length === 0}
                                icon={<Icon name="download" className="w-5 h-5" />}
                            >
                                Tümünü Excel Olarak İndir
                            </ActionButton>
                        </div>
                    </div>
                    <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg">
                        {sessionDocuments.length > 0 ? (
                             <table className="min-w-full divide-y divide-slate-700">
                                <thead className="bg-slate-700/50">
                                    <tr>
                                        {activeTemplate.fields.map((header) => (
                                            <th
                                                key={header}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {sessionDocuments.flatMap(doc => doc.data).map((row, index) => (
                                        <tr key={index} className="hover:bg-slate-700/50 transition-colors">
                                            {activeTemplate.fields.map((header) => (
                                                <td key={header} className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                                    {String(row[header] || '')}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-4">
                                <p className="text-center text-slate-500 py-8">
                                    Henüz belge işlenmedi. Yukarıdan bir dosya yükleyin.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
              )}
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans relative">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        templates={templates}
        activeTemplateName={activeTemplate?.name || null}
        onSelect={handleSelectTemplate}
        onDelete={handleDeleteTemplate}
        onNew={handleNewTemplate}
      />
      <main>
        {renderContent()}
      </main>
      <footer className="absolute bottom-2 right-4 text-xs text-slate-600">
        v.2.0.0
      </footer>
    </div>
  );
};

export default App;

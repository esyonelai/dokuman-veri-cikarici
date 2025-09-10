import React from 'react';
import { Icon } from './Icon';
import { Template } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
  activeTemplateName: string | null;
  onSelect: (templateName: string) => void;
  onDelete: (templateName: string) => void;
  onNew: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, templates, activeTemplateName, onSelect, onDelete, onNew }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 h-full bg-slate-800 w-72 shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">Şablonlarım</h2>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-700">
                    <Icon name="close" className="w-6 h-6" />
                </button>
            </div>
            
            <nav className="flex-grow p-4 overflow-y-auto">
                <ul>
                    {templates.map((template) => (
                        <li key={template.name} className="mb-2">
                           <div className={`flex items-center justify-between rounded-md group ${activeTemplateName === template.name ? 'bg-cyan-500/20' : 'hover:bg-slate-700'}`}>
                             <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); onSelect(template.name); }}
                                className={`block flex-grow px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTemplateName === template.name ? 'text-cyan-400' : 'text-slate-300 group-hover:text-white'}`}
                            >
                                {template.name}
                            </a>
                             <button 
                                onClick={() => onDelete(template.name)} 
                                className="p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity mr-2"
                                aria-label={`${template.name} şablonunu sil`}
                             >
                                <Icon name="trash" className="w-4 h-4" />
                             </button>
                           </div>
                        </li>
                    ))}
                </ul>
                 {templates.length === 0 && (
                    <p className="text-center text-slate-500 text-sm mt-4">Henüz şablon oluşturulmadı.</p>
                )}
            </nav>

            <div className="p-4 border-t border-slate-700">
                <button 
                    onClick={onNew}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 bg-slate-700 text-slate-200 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500"
                >
                    <Icon name="plus" className="w-5 h-5" />
                    <span>Yeni Şablon Oluştur</span>
                </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
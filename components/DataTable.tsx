import React, { useState, useEffect } from 'react';
import { ExtractedData } from '../types';
import { Icon } from './Icon';

interface DataTableProps {
  data: ExtractedData;
  onUpdate?: (updatedData: ExtractedData) => void;
  isSelectable?: boolean;
  selectedHeaders?: Set<string>;
  onHeaderSelect?: (header: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({ 
  data, 
  onUpdate,
  isSelectable = false,
  selectedHeaders,
  onHeaderSelect
}) => {

  if (isSelectable) {
    if (!data || data.length === 0) {
      return <p className="text-center text-slate-500 mt-8">Önizlenecek veri yok.</p>;
    }
    const headers = Object.keys(data[0] || {});
    
    return (
      <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-700/50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider"
                >
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded bg-slate-600 border-slate-500 text-cyan-500 focus:ring-cyan-600 focus:ring-offset-slate-800"
                      checked={selectedHeaders?.has(header) ?? false}
                      onChange={() => onHeaderSelect?.(header)}
                    />
                    {header}
                  </label>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {data.slice(0, 5).map((row, index) => (
              <tr key={index} className="hover:bg-slate-700/50 transition-colors">
                {headers.map((header) => (
                  <td key={header} className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {String(row[header] || '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length > 5 && (
            <div className="p-4 text-center text-sm text-slate-500 bg-slate-700/50 border-t border-slate-700">
                Ve {data.length - 5} diğer satır...
            </div>
        )}
      </div>
    );
  }

  // --- Existing editable table logic below ---
  const [editedData, setEditedData] = useState<ExtractedData>([]);

  useEffect(() => {
    setEditedData(data.map((row, index) => ({ ...row, _id: index })));
  }, [data]);

  const handleCellChange = (rowIndex: number, column: string, value: string) => {
    const newData = editedData.map((row) => {
      if (row._id === rowIndex) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setEditedData(newData);
    const dataToUpdate = newData.map(({ _id, ...rest }) => rest);
    onUpdate?.(dataToUpdate);
  };

  const addRow = () => {
    const headers = Object.keys(data[0] || {});
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: '' }), {});
    const newId = editedData.length > 0 ? Math.max(...editedData.map(d => d._id)) + 1 : 0;
    setEditedData([...editedData, { ...newRow, _id: newId }]);
  };

  const deleteRow = (rowIndex: number) => {
    const newData = editedData.filter(row => row._id !== rowIndex);
    setEditedData(newData);
    const dataToUpdate = newData.map(({ _id, ...rest }) => rest);
    onUpdate?.(dataToUpdate);
  };

  if (!editedData || editedData.length === 0) {
    return <p className="text-center text-slate-500 mt-8">Görüntülenecek veri yok.</p>;
  }

  const headers = Object.keys(editedData[0]).filter(key => key !== '_id');

  return (
    <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-slate-700">
        <thead className="bg-slate-700/50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-bold text-cyan-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
             <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Sil</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {editedData.map((row) => (
            <tr key={row._id} className="hover:bg-slate-700/50 transition-colors">
              {headers.map((header) => (
                <td key={header} className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={row[header] || ''}
                    onChange={(e) => handleCellChange(row._id, header, e.target.value)}
                    className="w-full bg-transparent text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded-md px-2 py-1"
                  />
                </td>
              ))}
               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  onClick={() => deleteRow(row._id)} 
                  className="text-slate-500 hover:text-red-400"
                  aria-label="Satırı sil"
                >
                  <Icon name="trash" className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-slate-700/50 border-t border-slate-700">
        <button
            onClick={addRow}
            className="flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
        >
            <Icon name="plus" className="w-4 h-4" />
            Satır Ekle
        </button>
      </div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ onUpload, accept = "image/*", label = "Upload File" }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile);
      if (typeof onUpload === 'function') {
        onUpload(selectedFile);
      }
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      
      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => fileInputRef.current.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${isDragging ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-800 hover:border-indigo-400 dark:hover:border-indigo-700'}`}
        >
          <input type="file" ref={fileInputRef} onChange={(e) => handleFile(e.target.files[0])} accept={accept} className="hidden" />
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Upload className="w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-gray-900 dark:text-white">Click or drag to upload</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">PNG, JPG or PDF up to 10MB</p>
          </div>
        </div>
      ) : (
        <div className="relative bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700">
            {file.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <FileText className="w-8 h-8 text-indigo-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{file.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 mt-1">
              <CheckCircle2 className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Ready to upload</span>
            </div>
          </div>
          <button 
            onClick={() => { setFile(null); onUpload(null); }}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

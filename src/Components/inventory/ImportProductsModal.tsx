import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertCircle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface ImportProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}

const ImportProductsModal: React.FC<ImportProductsModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const validateFile = (file: File) => {
    setError(null);
    
    // Check file type (CSV or Excel)
    const validTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a CSV or Excel file');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }
    
    setFile(file);
  };

  const handleSubmit = () => {
    if (file) {
      onImport(file);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Products"
      size="md"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Upload a CSV or Excel file containing your product data. Make sure your file follows the required format.
        </p>
        
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
          />
          
          <label
            htmlFor="file-upload"
            className="cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-blue-100 p-3 rounded-full text-blue-600"
              >
                <Upload size={24} />
              </motion.div>
              <p className="text-sm font-medium">
                {file ? file.name : 'Drag & drop your file here or click to browse'}
              </p>
              <p className="text-xs text-gray-500">
                Supports CSV and Excel files (max 5MB)
              </p>
            </div>
          </label>
        </div>
        
        {error && (
          <div className="flex items-center text-red-600 text-sm">
            <AlertCircle size={16} className="mr-1" />
            {error}
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={(e) => e.preventDefault()}
          >
            Download template
          </a>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!file}
              onClick={handleSubmit}
            >
              Import Products
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImportProductsModal;
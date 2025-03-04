import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemCount: number;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemCount,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
      size="sm"
    >
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {itemCount > 1 ? 'Delete Multiple Products' : 'Delete Product'}
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          {itemCount > 1
            ? `Are you sure you want to delete these ${itemCount} products? This action cannot be undone.`
            : 'Are you sure you want to delete this product? This action cannot be undone.'}
        </p>
        <div className="flex justify-center space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
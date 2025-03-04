import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Product } from '../../types/inventory';
import { categories } from '../../data/mockData';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editProduct?: Product;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editProduct,
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    sku: '',
    category: '',
    price: 0,
    cost: 0,
    quantity: 0,
    status: 'draft',
    imageUrl: '',
  });

  React.useEffect(() => {
    if (editProduct) {
      const { id, createdAt, updatedAt, ...rest } = editProduct;
      setFormData(rest);
    } else {
      setFormData({
        name: '',
        sku: '',
        category: '',
        price: 0,
        cost: 0,
        quantity: 0,
        status: 'draft',
        imageUrl: '',
      });
    }
  }, [editProduct, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const statusOptions = [
    { value: 'draft', label: 'Draft' },
    { value: 'finalized', label: 'Finalized' },
    { value: 'sold', label: 'Sold' },
    { value: 'onmemo', label: 'On Memo' },
  ];

  const categoryOptions = categories
    .filter(category => category !== 'All Categories')
    .map(category => ({
      value: category,
      label: category,
    }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editProduct ? 'Edit Product' : 'Add New Product'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Category"
            name="category"
            options={categoryOptions}
            value={formData.category}
            onChange={handleChange}
            required
          />
          <Select
            label="Status"
            name="status"
            options={statusOptions}
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Price ($)"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <Input
            label="Cost ($)"
            name="cost"
            type="number"
            step="0.01"
            value={formData.cost}
            onChange={handleChange}
            required
          />
          <Input
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          label="Image URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              variant="primary"
            >
              {editProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </motion.div>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
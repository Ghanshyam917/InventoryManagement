import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types/inventory';
import { cn } from '../../utils/cn';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const [showActions, setShowActions] = React.useState(false);

  const statusColors = {
    draft: 'bg-gray-200 text-gray-800',
    finalized: 'bg-green-100 text-green-800',
    sold: 'bg-blue-100 text-blue-800',
    onmemo: 'bg-yellow-100 text-yellow-800',
    all: 'bg-purple-100 text-purple-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow",
        isSelected ? "ring-2 ring-blue-500" : ""
      )}
    >
      <div className="relative">
        <div className="absolute top-2 left-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(product.id)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        <div className="absolute top-2 right-2">
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-700"
            >
              <MoreHorizontal size={16} />
            </button>
            {showActions && (
              <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 py-1">
                <button
                  onClick={() => {
                    onEdit(product);
                    setShowActions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  <Edit size={14} className="mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(product.id);
                    setShowActions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-40 w-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">SKU: {product.sku}</span>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full",
            statusColors[product.status]
          )}>
            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
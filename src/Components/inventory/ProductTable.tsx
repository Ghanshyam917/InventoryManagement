import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Product } from '../../types/inventory';
import Checkbox from '../ui/Checkbox';

interface ProductTableProps {
  products: Product[];
  selectedProducts: string[];
  onSelectProduct: (id: string) => void;
  onSelectAll: (selected: boolean) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  onEdit,
  onDelete,
}) => {
  const allSelected = products.length > 0 && selectedProducts.length === products.length;
  const [activeRow, setActiveRow] = React.useState<string | null>(null);

  const statusColors = {
    draft: 'bg-gray-200 text-gray-800',
    finalized: 'bg-green-100 text-green-800',
    sold: 'bg-blue-100 text-blue-800',
    onmemo: 'bg-yellow-100 text-yellow-800',
    all: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <Checkbox
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <motion.tr 
              key={product.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hover:bg-gray-50"
              onMouseEnter={() => setActiveRow(product.id)}
              onMouseLeave={() => setActiveRow(null)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => onSelectProduct(product.id)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.sku}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[product.status]}`}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
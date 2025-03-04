import React from 'react';
import { motion } from 'framer-motion';
import { X, Filter } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { FilterOptions } from '../../types/inventory';
import { categories } from '../../data/mockData';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onResetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'minPrice' || name === 'maxPrice') {
      onFilterChange({
        ...filters,
        priceRange: {
          ...filters.priceRange,
          [name === 'minPrice' ? 'min' : 'max']: Number(value),
        },
      });
    } else if (name === 'startDate' || name === 'endDate') {
      onFilterChange({
        ...filters,
        dateRange: {
          ...filters.dateRange,
          [name === 'startDate' ? 'start' : 'end']: value,
        },
      });
    } else {
      onFilterChange({
        ...filters,
        [name]: value,
      });
    }
  };

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'finalized', label: 'Finalized' },
    { value: 'sold', label: 'Sold' },
    { value: 'onmemo', label: 'On Memo' },
  ];

  const categoryOptions = categories.map(category => ({
    value: category === 'All Categories' ? '' : category,
    label: category
  }));

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <motion.div
        className="fixed top-0 right-0 h-full bg-white shadow-lg z-50 overflow-y-auto w-120"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter size={18} className="mr-2" />
              Filters
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <Input
              label="Search"
              name="search"
              placeholder="Search products..."
              value={filters.search}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Select
              label="Category"
              name="category"
              options={categoryOptions}
              value={filters.category}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Select
              label="Status"
              name="status"
              options={statusOptions}
              value={filters.status}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <div className="flex space-x-2">
              <Input
                name="minPrice"
                type="number"
                placeholder="Min"
                value={filters.priceRange.min || ''}
                onChange={handleInputChange}
              />
              <Input
                name="maxPrice"
                type="number"
                placeholder="Max"
                value={filters.priceRange.max || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Range
            </label>
            <div className="flex space-x-2">
              <Input
                name="startDate"
                type="date"
                value={filters.dateRange.start}
                onChange={handleInputChange}
              />
              <Input
                name="endDate"
                type="date"
                value={filters.dateRange.end}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={onClose}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onResetFilters}
            >
              Reset
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FilterSidebar;
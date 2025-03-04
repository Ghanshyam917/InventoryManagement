import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Plus,Filter,RefreshCw,Upload,Search,Grid,List,ChevronLeft,ChevronRight,BarChart3} from 'lucide-react';
import Button from '../Components/ui/Button';
import Input from '../Components/ui/Input';
// import Select from '../Components/ui/Select';
import ProductTable from '../Components/inventory/ProductTable';
import ProductCard from '../Components/inventory/ProductCard';
import FilterSidebar from '../Components/inventory/FilterSidebar';
import AddProductModal from '../Components/inventory/AddProductModal';
import ImportProductsModal from '../Components/inventory/ImportProductsModal';
import DeleteConfirmationModal from '../Components/inventory/DeleteConfirmationModal';
import { Product, FilterOptions } from '../types/inventory';
import { mockProducts, categories } from '../data/mockData';
import { cn } from '../utils/cn';

const InventoryPage: React.FC = () => {
  // State
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const [productsToDelete, setProductsToDelete] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    category: '',
    status: '',
    priceRange: {
      min: 0,
      max: 0,
    },
    dateRange: {
      start: '',
      end: '',
    },
  });

  // Tabs
  const tabs = [
    { id: 'all', label: 'All', count: products.filter(p => p).length },
    { id: 'draft', label: 'Draft', count: products.filter(p => p.status === 'draft').length },
    { id: 'finalized', label: 'Finalized', count: products.filter(p => p.status === 'finalized').length },
    { id: 'sold', label: 'Sold', count: products.filter(p => p.status === 'sold').length },
    { id: 'onmemo', label: 'On Memo', count: products.filter(p => p.status === 'onmemo').length },
  ];

  // Filter products based on active tab and filters
  useEffect(() => {
    let result = [...products];

    // Filter by tab
    if (activeTab !== 'all') {
      result = result.filter(product => product.status === activeTab);
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.sku.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }

    // Apply status filter (if different from tab)
    if (filters.status && filters.status !== activeTab) {
      result = result.filter(product => product.status === filters.status);
    }

    // Apply price range filter
    if (filters.priceRange.min > 0) {
      result = result.filter(product => product.price >= filters.priceRange.min);
    }
    if (filters.priceRange.max > 0) {
      result = result.filter(product => product.price <= filters.priceRange.max);
    }

    // Apply date range filter
    if (filters.dateRange.start) {
      const startDate = new Date(filters.dateRange.start);
      result = result.filter(product => new Date(product.createdAt) >= startDate);
    }
    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end);
      endDate.setHours(23, 59, 59, 999); // End of day
      result = result.filter(product => new Date(product.createdAt) <= endDate);
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeTab, filters, products]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSelectedProducts([]);
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
    );
  };

  const handleSelectAllProducts = (selected: boolean) => {
    if (selected) {
      setSelectedProducts(paginatedProducts.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleAddProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `${products.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts([newProduct, ...products]);
  };

  const handleEditProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!productToEdit) return;

    const updatedProducts = products.map(product =>
      product.id === productToEdit.id
        ? {
            ...product,
            ...productData,
            updatedAt: new Date().toISOString(),
          }
        : product
    );

    setProducts(updatedProducts);
    setProductToEdit(undefined);
  };

  const handleDeleteProducts = () => {
    setProducts(products.filter(product => !productsToDelete.includes(product.id)));
    setSelectedProducts(selectedProducts.filter(id => !productsToDelete.includes(id)));
    setProductsToDelete([]);
  };

  const openDeleteModal = (ids: string[]) => {
    setProductsToDelete(ids);
    setIsDeleteModalOpen(true);
  };

  const handleImportProducts = (file: File) => {
    // In a real app, this would process the CSV/Excel file
    console.log('Importing products from file:', file.name);
    // For demo purposes, let's just add a dummy product
    const newProduct: Product = {
      id: `imported-${Date.now()}`,
      name: `Imported Product ${file.name}`,
      sku: `IMP-${Date.now().toString().slice(-4)}`,
      category: 'Electronics',
      price: 99.99,
      cost: 50.00,
      quantity: 10,
      status: 'draft',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts([newProduct, ...products]);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      priceRange: {
        min: 0,
        max: 0,
      },
      dateRange: {
        start: '',
        end: '',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className='flex items-center gap-2'>
            <BarChart3 className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">InventoryPro</h1>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                leftIcon={<Upload size={16} />}
                onClick={() => setIsImportModalOpen(true)}
              >
                Import
              </Button>
              <Button
                variant="primary"
                leftIcon={<Plus size={16} />}
                onClick={() => {
                  setProductToEdit(undefined);
                  setIsAddProductModalOpen(true);
                }}
              >
                Add Product
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="mb-6 border-b">
          <div className="flex hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap",
                  "border-b-2 -mb-px transition-colors",
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label} <span className="ml-1 text-xs rounded-full bg-gray-100 px-2 py-0.5">{tab.count}</span>
              </button>
            ))}
          </div>
          
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex flex-1 max-w-md">
            <Input
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              leftIcon={<Search size={16} />}
              className="w-full"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Button
              variant="outline"
              leftIcon={<RefreshCw size={16} />}
              onClick={() => setProducts([...mockProducts])}
              className="sm:order-1"
            >
              Refresh
            </Button>

            <Button
              variant="outline"
              leftIcon={<Filter size={16} />}
              onClick={() => setIsFilterSidebarOpen(true)}
              className="sm:order-2"
            >
              Filter
            </Button>

            <div className="flex border rounded-md overflow-hidden sm:order-3">
              <button
                className={cn(
                  "p-2 transition-colors",
                  viewMode === 'list'
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={18} />
              </button>
              <button
                className={cn(
                  "p-2 transition-colors",
                  viewMode === 'grid'
                    ? "bg-gray-100 text-gray-800"
                    : "bg-white text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Selected Items Actions */}
        <AnimatePresence>
          {selectedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md flex justify-between items-center"
            >
              <span className="text-sm text-blue-800">
                <span className="font-medium">{selectedProducts.length}</span> item{selectedProducts.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProducts([])}
                >
                  Deselect All
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openDeleteModal(selectedProducts)}
                >
                  Delete Selected
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products List/Grid */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-6">
          {filteredProducts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          ) : viewMode === 'list' ? (
            <ProductTable
              products={paginatedProducts}
              selectedProducts={selectedProducts}
              onSelectProduct={handleSelectProduct}
              onSelectAll={handleSelectAllProducts}
              onEdit={(product) => {
                setProductToEdit(product);
                setIsAddProductModalOpen(true);
              }}
              onDelete={(id) => openDeleteModal([id])}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={selectedProducts.includes(product.id)}
                  onSelect={handleSelectProduct}
                  onEdit={(product) => {
                    setProductToEdit(product);
                    setIsAddProductModalOpen(true);
                  }}
                  onDelete={(id) => openDeleteModal([id])}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="px-4 py-3 flex items-center justify-between border-t">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredProducts.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={cn(
                            "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                            currentPage === pageNumber
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          )}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={resetFilters}
      />

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => {
          setIsAddProductModalOpen(false);
          setProductToEdit(undefined);
        }}
        onSave={productToEdit ? handleEditProduct : handleAddProduct}
        editProduct={productToEdit}
      />

      <ImportProductsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportProducts}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProducts}
        itemCount={productsToDelete.length}
      />
    </div>
  );
};

export default InventoryPage;
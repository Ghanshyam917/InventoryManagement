export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  quantity: number;
  status: 'all' | 'draft' | 'finalized' | 'sold' | 'onmemo';
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  search: string;
  category: string;
  status: string;
  priceRange: {
    min: number;
    max: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
}
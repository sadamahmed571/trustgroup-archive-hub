
import React from 'react';
import { Link } from 'react-router-dom';

export interface PriceInfo {
  amount: number;
  currency: string;
  marketplace: string;
}

export interface Product {
  id: string;
  name: string;
  prices: PriceInfo[];
  category: string;
  imageUrl: string;
  status: string;
  manufacturer?: string;
  description?: string;
  archiveType?: string;
  createdBy?: string;
  createdAt?: string;
  rating?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Get the main price to display (first price in the array)
  const mainPrice = product.prices && product.prices.length > 0 
    ? product.prices[0] 
    : { amount: 0, currency: 'USD', marketplace: '' };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="card-hover rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        {product.imageUrl && (
          <div className="relative h-32 w-full overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.status && (
              <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full
                ${product.status === 'available' ? 'bg-green-500 text-white' : 
                  product.status === 'unavailable' ? 'bg-red-500 text-white' : 
                  'bg-amber-500 text-white'}`}
              >
                {product.status}
              </div>
            )}
          </div>
        )}
        <div className="p-2">
          <h3 className="font-medium text-sm mb-1 truncate">{product.name}</h3>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 dark:text-gray-400">
              {product.category}
            </span>
            <span className="font-bold text-professional-700 dark:text-professional-300">
              {mainPrice.currency === 'USD' ? '$' : 
               mainPrice.currency === 'CNY' ? '¥' : mainPrice.currency}{mainPrice.amount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

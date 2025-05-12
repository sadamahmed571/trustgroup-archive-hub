
import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { t } = useLanguage();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4">
      {products.map(product => (
        <div key={product.id} className="relative">
          <ProductCard product={product} />
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            <User size={12} />
            <span>{t('by')} {product.createdBy || 'User'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;

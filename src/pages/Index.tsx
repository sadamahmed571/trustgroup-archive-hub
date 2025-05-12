
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from '@/components/product/ProductFilters';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleProducts } from '@/data/sampleProducts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

  const handleFilterChange = (filters: any) => {
    let results = [...sampleProducts];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        (product.manufacturer && product.manufacturer.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      results = results.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Apply status filter
    if (filters.status && filters.status !== 'all') {
      results = results.filter(product => product.status === filters.status);
    }
    
    // Apply marketplace filter
    if (filters.marketplace && filters.marketplace !== 'all') {
      results = results.filter(product => 
        product.prices.some(price => 
          price.marketplace.toLowerCase() === filters.marketplace.toLowerCase()
        )
      );
    }
    
    // Apply price range filter
    if (filters.priceRange.min !== '') {
      results = results.filter(product => 
        product.prices.some(price => price.amount >= filters.priceRange.min)
      );
    }
    
    if (filters.priceRange.max !== '') {
      results = results.filter(product => 
        product.prices.some(price => price.amount <= filters.priceRange.max)
      );
    }
    
    setFilteredProducts(results);
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-professional-800 dark:text-professional-200">{t('welcome')}</h1>
        </div>
        
        {/* Horizontal filter bar with reduced height */}
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm mb-6">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>
        
        <div className="mb-4">
          <h2 className="text-xl font-medium text-professional-700 dark:text-professional-300">{t('recentProducts')}</h2>
        </div>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center p-6 border rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <p className="text-gray-500 dark:text-gray-400">{t('noProductsFound')}</p>
          </div>
        )}

        {/* Floating action button */}
        <div className="fixed bottom-6 right-6 z-10">
          <Button 
            className="rounded-full h-14 w-14 bg-professional-600 hover:bg-professional-700 shadow-lg"
            size="icon"
            asChild
          >
            <Link to="/add-product">
              <Plus size={24} />
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

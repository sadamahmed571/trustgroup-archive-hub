
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from 'lucide-react';

interface FiltersState {
  search: string;
  category: string;
  status: string;
  marketplace: string;
  priceRange: {
    min: number | '';
    max: number | '';
  };
}

interface ProductFiltersProps {
  onFilterChange: (filters: FiltersState) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ onFilterChange }) => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FiltersState>({
    search: '',
    category: '',
    status: '',
    marketplace: '',
    priceRange: {
      min: '',
      max: ''
    }
  });
  
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const handleFilterChange = (name: keyof Omit<FiltersState, 'priceRange'>, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    // Convert to number only if not empty string
    const numberValue = value === '' ? '' : Number(value);
    
    const newFilters = {
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: numberValue
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    const clearedFilters: FiltersState = {
      search: '',
      category: '',
      status: '',
      marketplace: '',
      priceRange: {
        min: '',
        max: ''
      }
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="w-full mb-4">
      {/* Horizontal Navigation Bar for Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-row items-center gap-3 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 shrink-0">
              <Filter size={16} />
              <span className="text-sm font-medium">{t('filters')}</span>
            </div>
            
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger id="category" className="h-8 min-w-[120px] text-sm">
                <SelectValue placeholder={`${t('category')}...`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                <SelectItem value="electronics">{t('electronics')}</SelectItem>
                <SelectItem value="clothing">{t('clothing')}</SelectItem>
                <SelectItem value="homeAppliances">{t('homeAppliances')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger id="status" className="h-8 min-w-[120px] text-sm">
                <SelectValue placeholder={`${t('status')}...`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allStatus')}</SelectItem>
                <SelectItem value="available">{t('available')}</SelectItem>
                <SelectItem value="unavailable">{t('unavailable')}</SelectItem>
                <SelectItem value="onOrder">{t('onOrder')}</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              placeholder={`${t('search')}...`}
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="h-8 min-w-[150px] text-sm"
            />
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="h-8 text-xs"
            >
              {showMoreFilters ? t('lessFilters') : t('moreFilters')}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClear}
              className="h-8 text-xs ml-auto"
            >
              {t('clear')}
            </Button>
          </div>
          
          {/* More filters section */}
          {showMoreFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
              <div>
                <Select
                  value={filters.marketplace}
                  onValueChange={(value) => handleFilterChange('marketplace', value)}
                >
                  <SelectTrigger id="marketplace" className="w-full text-sm">
                    <SelectValue placeholder={`${t('marketplaces')}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('allMarketplaces')}</SelectItem>
                    <SelectItem value="amazon">{t('amazon')}</SelectItem>
                    <SelectItem value="ebay">{t('ebay')}</SelectItem>
                    <SelectItem value="aliexpress">{t('aliexpress')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Input
                  type="number"
                  placeholder={`${t('price')} (Min)`}
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="w-full text-sm"
                />
              </div>
              
              <div>
                <Input
                  type="number"
                  placeholder={`${t('price')} (Max)`}
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="w-full text-sm"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFilters;

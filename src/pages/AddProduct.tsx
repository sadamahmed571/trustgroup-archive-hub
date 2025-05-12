
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Plus, Trash2, Upload, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PriceEntry {
  id: string;
  amount: string;
  currency: 'USD' | 'CNY' | 'YER';
  marketplace: string;
}

interface ProductLink {
  id: string;
  url: string;
  marketplace: string;
}

interface SimilarProductLink {
  id: string;
  url: string;
  description: string;
}

const currencies = [
  { label: 'US Dollar', value: 'USD', symbol: '$' },
  { label: 'Chinese Yuan', value: 'CNY', symbol: '¥' },
  { label: 'Yemeni Riyal', value: 'YER', symbol: 'ر.ي' }
];

const marketplaces = [
  'Amazon',
  'eBay',
  'AliExpress',
  'Walmart',
  'Etsy',
  'Other'
];

const categories = [
  'Electronics',
  'Clothing',
  'Home Appliances',
  'Furniture',
  'Books',
  'Health & Beauty',
  'Sports & Outdoors',
  'Toys & Games',
  'Other'
];

const productStatuses = [
  'available',
  'unavailable',
  'onOrder'
];

const AddProduct = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [prices, setPrices] = useState<PriceEntry[]>([{ id: '1', amount: '', currency: 'USD', marketplace: 'Amazon' }]);
  const [productLinks, setProductLinks] = useState<ProductLink[]>([{ id: '1', url: '', marketplace: 'Amazon' }]);
  const [similarProducts, setSimilarProducts] = useState<SimilarProductLink[]>([]);
  const [newCategory, setNewCategory] = useState<string>('');
  const [availableCategories, setAvailableCategories] = useState<string[]>(categories);
  const [rating, setRating] = useState<number>(0);
  
  const form = useForm({
    defaultValues: {
      productName: '',
      manufacturer: '',
      category: '',
      status: 'available',
      notes: '',
      archiveType: 'public',
    }
  });
  
  const handleAddPrice = () => {
    const newId = (prices.length + 1).toString();
    setPrices([...prices, { id: newId, amount: '', currency: 'USD', marketplace: 'Amazon' }]);
  };
  
  const handleRemovePrice = (id: string) => {
    setPrices(prices.filter(price => price.id !== id));
  };
  
  const handlePriceChange = (id: string, field: keyof PriceEntry, value: string) => {
    setPrices(prices.map(price => 
      price.id === id ? { ...price, [field]: value } : price
    ));
  };
  
  const handleAddProductLink = () => {
    const newId = (productLinks.length + 1).toString();
    setProductLinks([...productLinks, { id: newId, url: '', marketplace: 'Amazon' }]);
  };
  
  const handleRemoveProductLink = (id: string) => {
    setProductLinks(productLinks.filter(link => link.id !== id));
  };
  
  const handleProductLinkChange = (id: string, field: keyof ProductLink, value: string) => {
    setProductLinks(productLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    ));
  };
  
  const handleAddSimilarProduct = () => {
    const newId = (similarProducts.length + 1).toString();
    setSimilarProducts([...similarProducts, { id: newId, url: '', description: '' }]);
  };
  
  const handleRemoveSimilarProduct = (id: string) => {
    setSimilarProducts(similarProducts.filter(product => product.id !== id));
  };
  
  const handleSimilarProductChange = (id: string, field: keyof SimilarProductLink, value: string) => {
    setSimilarProducts(similarProducts.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPreviews: string[] = [];
      
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => {
          if (ev.target?.result) {
            newPreviews.push(ev.target.result.toString());
            setImagePreview([...imagePreview, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newPreviews = [...imagePreview];
    newPreviews.splice(index, 1);
    setImagePreview(newPreviews);
  };
  
  const handleAddCategory = () => {
    if (newCategory && !availableCategories.includes(newCategory)) {
      setAvailableCategories([...availableCategories, newCategory]);
      form.setValue('category', newCategory);
      setNewCategory('');
    }
  };
  
  const onSubmit = (data: any) => {
    // Combine form data with other state
    const productData = {
      ...data,
      prices,
      productLinks,
      similarProducts,
      images: imagePreview,
      rating,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User', // This would be replaced by actual user data
    };
    
    console.log('Submitting product data:', productData);
    
    toast({
      title: t('productAdded'),
      description: t('productAddedMessage'),
    });
    
    // Reset form after submission
    form.reset();
    setPrices([{ id: '1', amount: '', currency: 'USD', marketplace: 'Amazon' }]);
    setProductLinks([{ id: '1', url: '', marketplace: 'Amazon' }]);
    setSimilarProducts([]);
    setImagePreview([]);
    setRating(0);
  };
  
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          size={24} 
          className={`cursor-pointer ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          onClick={() => setRating(i)}
        />
      );
    }
    return stars;
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-6 text-professional-800 dark:text-professional-200">{t('addProduct')}</h1>
        
        <Card className="bg-card dark:bg-card border-border">
          <CardHeader>
            <CardTitle>{t('newProduct')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Name */}
                  <div className="space-y-2">
                    <Label htmlFor="productName" className="text-sm font-medium">
                      {t('productName')} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="productName"
                      placeholder={t('enterProductName')}
                      {...form.register('productName', { required: true })}
                      className={form.formState.errors.productName ? 'border-red-500' : ''}
                    />
                    {form.formState.errors.productName && (
                      <p className="text-sm text-red-500">{t('requiredField')}</p>
                    )}
                  </div>

                  {/* Manufacturer */}
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer" className="text-sm font-medium">
                      {t('manufacturer')}
                    </Label>
                    <Input
                      id="manufacturer"
                      placeholder={t('enterManufacturer')}
                      {...form.register('manufacturer')}
                    />
                  </div>
                  
                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      {t('category')} <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Select 
                        onValueChange={value => form.setValue('category', value)}
                        value={form.watch('category')}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder={t('selectCategory')} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="relative flex items-center">
                        <Input
                          placeholder={t('newCategory')}
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="pr-9"
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleAddCategory}
                          className="absolute right-2"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                    {form.formState.errors.category && (
                      <p className="text-sm text-red-500">{t('requiredField')}</p>
                    )}
                  </div>
                  
                  {/* Status */}
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      {t('status')}
                    </Label>
                    <Select 
                      onValueChange={value => form.setValue('status', value)}
                      defaultValue={form.watch('status')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectStatus')} />
                      </SelectTrigger>
                      <SelectContent>
                        {productStatuses.map(status => (
                          <SelectItem key={status} value={status}>{t(status)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Prices */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">{t('prices')}</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddPrice}>
                      <Plus size={16} className="mr-1" />
                      {t('addPrice')}
                    </Button>
                  </div>
                  
                  {prices.map((price, index) => (
                    <div key={price.id} className="grid grid-cols-3 gap-3 items-center">
                      <div>
                        <Label htmlFor={`amount-${price.id}`} className="sr-only">
                          {t('amount')}
                        </Label>
                        <Input
                          id={`amount-${price.id}`}
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder={t('amount')}
                          value={price.amount}
                          onChange={(e) => handlePriceChange(price.id, 'amount', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`currency-${price.id}`} className="sr-only">
                          {t('currency')}
                        </Label>
                        <Select
                          value={price.currency}
                          onValueChange={(value: any) => handlePriceChange(price.id, 'currency', value)}
                        >
                          <SelectTrigger id={`currency-${price.id}`}>
                            <SelectValue placeholder={t('selectCurrency')} />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map(currency => (
                              <SelectItem key={currency.value} value={currency.value}>
                                {currency.symbol} {currency.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex gap-2">
                        <Select
                          value={price.marketplace}
                          onValueChange={(value) => handlePriceChange(price.id, 'marketplace', value)}
                        >
                          <SelectTrigger id={`marketplace-${price.id}`} className="flex-1">
                            <SelectValue placeholder={t('marketplace')} />
                          </SelectTrigger>
                          <SelectContent>
                            {marketplaces.map(marketplace => (
                              <SelectItem key={marketplace} value={marketplace}>{marketplace}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemovePrice(price.id)}
                            className="flex-shrink-0"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Product Links */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">{t('productLinks')}</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddProductLink}>
                      <Plus size={16} className="mr-1" />
                      {t('addLink')}
                    </Button>
                  </div>
                  
                  {productLinks.map((link, index) => (
                    <div key={link.id} className="grid grid-cols-3 gap-3 items-center">
                      <div className="col-span-2">
                        <Label htmlFor={`url-${link.id}`} className="sr-only">
                          {t('url')}
                        </Label>
                        <Input
                          id={`url-${link.id}`}
                          type="url"
                          placeholder={t('productUrl')}
                          value={link.url}
                          onChange={(e) => handleProductLinkChange(link.id, 'url', e.target.value)}
                        />
                      </div>
                      
                      <div className="flex gap-2">
                        <Select
                          value={link.marketplace}
                          onValueChange={(value) => handleProductLinkChange(link.id, 'marketplace', value)}
                        >
                          <SelectTrigger id={`link-marketplace-${link.id}`} className="flex-1">
                            <SelectValue placeholder={t('marketplace')} />
                          </SelectTrigger>
                          <SelectContent>
                            {marketplaces.map(marketplace => (
                              <SelectItem key={marketplace} value={marketplace}>{marketplace}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveProductLink(link.id)}
                            className="flex-shrink-0"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Similar Products */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-medium">{t('similarProducts')}</Label>
                    <Button type="button" variant="outline" size="sm" onClick={handleAddSimilarProduct}>
                      <Plus size={16} className="mr-1" />
                      {t('addSimilarProduct')}
                    </Button>
                  </div>
                  
                  {similarProducts.map((product) => (
                    <div key={product.id} className="grid grid-cols-1 gap-3">
                      <div className="flex gap-2">
                        <Input
                          type="url"
                          placeholder={t('productUrl')}
                          value={product.url}
                          onChange={(e) => handleSimilarProductChange(product.id, 'url', e.target.value)}
                          className="flex-grow"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveSimilarProduct(product.id)}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </Button>
                      </div>
                      <Input
                        placeholder={t('productDescription')}
                        value={product.description}
                        onChange={(e) => handleSimilarProductChange(product.id, 'description', e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Image Upload */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium">{t('productImages')}</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Upload size={24} className="text-gray-400" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('dragDropImages')}</p>
                      <Button type="button" variant="outline" size="sm" className="mt-2" asChild>
                        <label className="cursor-pointer">
                          {t('browseFiles')}
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </Button>
                    </div>
                  </div>
                  
                  {/* Image Previews */}
                  {imagePreview.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {imagePreview.map((src, index) => (
                        <div key={index} className="relative">
                          <img src={src} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <Trash2 size={12} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Rating */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{t('productRating')}</Label>
                  <div className="flex gap-1">
                    {renderStars()}
                  </div>
                </div>
                
                {/* Archive Type */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">{t('archiveType')}</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="private"
                        checked={form.watch('archiveType') === 'private'}
                        onChange={() => form.setValue('archiveType', 'private')}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span>{t('privateArchive')}</span>
                    </label>
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="public"
                        checked={form.watch('archiveType') === 'public'}
                        onChange={() => form.setValue('archiveType', 'public')}
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span>{t('publicArchive')}</span>
                    </label>
                  </div>
                </div>
                
                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">
                    {t('notes')}
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder={t('enterNotes')}
                    rows={4}
                    {...form.register('notes')}
                  />
                </div>
                
                {/* Credits */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-sm">
                  <p>
                    <strong>{t('addedBy')}:</strong> Current User
                  </p>
                  <p>
                    <strong>{t('dateAdded')}:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
                
                <CardFooter className="px-0 pt-4 flex justify-end gap-3">
                  <Button type="button" variant="outline">{t('cancel')}</Button>
                  <Button type="submit" className="bg-professional-600 hover:bg-professional-700">
                    {t('saveProduct')}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddProduct;

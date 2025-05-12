
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { sampleProducts } from '@/data/sampleProducts';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Database, Star } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const product = sampleProducts.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="text-center p-10">
          <h1 className="text-2xl font-bold mb-4">{t('productNotFound')}</h1>
          <Button asChild>
            <Link to="/">{t('backToHome')}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Format price with currency symbol
  const formatPrice = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      CNY: '¥',
      YER: 'ر.ي'
    };
    return `${symbols[currency]}${amount.toFixed(2)}`;
  };

  return (
    <Layout>
      <div className="mb-6">
        <Link 
          to="/" 
          className="text-sm text-trust-600 hover:text-trust-800 flex items-center gap-1"
        >
          <Database size={16} />
          {t('backToProducts')}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            {product && product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-80 text-gray-400">
                {t('noImage')}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-trust-900">{product.name}</h1>
              <Badge className={`${product.status === 'available' ? 'bg-green-100 text-green-800' : 
                product.status === 'unavailable' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                {product.status === 'available' ? t('available') :
                 product.status === 'unavailable' ? t('unavailable') : t('onOrder')}
              </Badge>
            </div>

            {product.manufacturer && (
              <p className="text-gray-600">{t('manufacturer')}: {product.manufacturer}</p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">{t('price')}</h2>
            <div className="space-y-2">
              {product && product.prices.map((price, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <span className="text-sm text-gray-500">{price.marketplace}</span>
                    <div className="font-medium text-lg">{formatPrice(price.amount, price.currency)}</div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    {t('view')}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-2">{t('details')}</h2>
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <span className="text-sm text-gray-500">{t('category')}</span>
                    <p>{product.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">{t('archiveType')}</span>
                    <p>{product.archiveType === 'private' ? t('privateArchive') : t('publicArchive')}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">{t('date')}</span>
                    <p>{new Date(product.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">{t('addedBy')}</span>
                    <p>{product.createdBy}</p>
                  </div>
                </div>
                
                {product.rating && (
                  <div className="pt-2 border-t">
                    <span className="text-sm text-gray-500">{t('rating')}</span>
                    <div className="flex items-center mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i}
                          size={18}
                          className={i < product.rating! ? "fill-gold-500 text-gold-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button variant="default" className="flex-1 bg-trust-600 hover:bg-trust-700">
              {t('edit')}
            </Button>
            <Button variant="outline" className="flex-1">
              {t('share')}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;

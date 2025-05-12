
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

const SearchPage = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 text-professional-800 dark:text-professional-200">{t('search')}</h1>
        
        <Card className="bg-card dark:bg-card border-border">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <Search size={48} className="text-professional-300 dark:text-professional-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-center">{t('underDevelopment')}</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SearchPage;

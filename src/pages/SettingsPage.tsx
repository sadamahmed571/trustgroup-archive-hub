
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <Layout>
      <div className="container mx-auto py-6 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">{t('settings')}</h1>

        <Tabs defaultValue="appearance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appearance">{t('appearance')}</TabsTrigger>
            <TabsTrigger value="language">{t('language')}</TabsTrigger>
            <TabsTrigger value="notifications">{t('notifications')}</TabsTrigger>
            <TabsTrigger value="privacy">{t('privacy')}</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('theme')}</CardTitle>
                <CardDescription>{t('themeDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${theme === 'light' ? 'border-professional-600 bg-professional-50 dark:bg-professional-900/30' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="h-24 bg-white border rounded-md mb-2"></div>
                    <p className="text-center font-medium">{t('lightMode')}</p>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${theme === 'dark' ? 'border-professional-600 bg-professional-50 dark:bg-professional-900/30' : ''}`} 
                    onClick={() => setTheme('dark')}
                  >
                    <div className="h-24 bg-gray-900 border rounded-md mb-2"></div>
                    <p className="text-center font-medium">{t('darkMode')}</p>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${theme === 'system' ? 'border-professional-600 bg-professional-50 dark:bg-professional-900/30' : ''}`} 
                    onClick={() => setTheme('system')}
                  >
                    <div className="h-24 bg-gradient-to-r from-white to-gray-900 border rounded-md mb-2"></div>
                    <p className="text-center font-medium">{t('systemDefault')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('language')}</CardTitle>
                <CardDescription>{t('languageDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={language} onValueChange={(value: any) => setLanguage(value)}>
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder={t('selectLanguage')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t('english')}</SelectItem>
                    <SelectItem value="ar">{t('arabic')}</SelectItem>
                    <SelectItem value="zh">{t('chinese')}</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('notifications')}</CardTitle>
                <CardDescription>{t('notificationsDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">{t('emailNotifications')}</Label>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="product-updates">{t('productUpdates')}</Label>
                  <Switch id="product-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-alerts">{t('priceAlerts')}</Label>
                  <Switch id="price-alerts" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('privacy')}</CardTitle>
                <CardDescription>{t('privacyDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="public-profile">{t('publicProfile')}</Label>
                  <Switch id="public-profile" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-activity">{t('showActivity')}</Label>
                  <Switch id="show-activity" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SettingsPage;

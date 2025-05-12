
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleProducts } from '@/data/sampleProducts';
import ProductCard from '@/components/product/ProductCard';
import { User, Pencil, Upload } from 'lucide-react';

const ProfilePage = () => {
  const { t } = useLanguage();
  const [username, setUsername] = useState('Current User');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Mock data - in a real app, this would be fetched from a backend
  const userProducts = sampleProducts.slice(0, 4);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile on the backend
    console.log('Profile updated');
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-6 animate-fade-in space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">{t('profile')}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    {imagePreview ? (
                      <img src={imagePreview} alt={username} className="object-cover" />
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-professional-100 dark:bg-professional-800 flex items-center justify-center">
                        <User className="h-12 w-12 text-professional-600" />
                      </div>
                    )}
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full"
                    asChild
                  >
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Pencil size={16} />
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </Button>
                </div>
                <h2 className="text-xl font-semibold">{username}</h2>
                <div className="text-sm text-muted-foreground text-center">
                  <p>{userProducts.length} {t('products')}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('updateProfile')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">{t('username')}</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('newPassword')}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t('confirmPassword')}</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {t('save')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* User products */}
          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>{t('yourProducts')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">{t('all')}</TabsTrigger>
                    <TabsTrigger value="public">{t('publicArchive')}</TabsTrigger>
                    <TabsTrigger value="private">{t('privateArchive')}</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userProducts.map((product) => (
                        <div key={product.id} className="relative">
                          <ProductCard product={product} />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <Button size="icon" variant="outline" className="h-7 w-7 bg-white dark:bg-gray-800">
                              <Pencil size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {userProducts.length === 0 && (
                      <div className="text-center p-4 text-muted-foreground">
                        {t('noProductsFound')}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="public" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userProducts.filter(p => p.archiveType === 'public').map((product) => (
                        <div key={product.id} className="relative">
                          <ProductCard product={product} />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <Button size="icon" variant="outline" className="h-7 w-7 bg-white dark:bg-gray-800">
                              <Pencil size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="private" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userProducts.filter(p => p.archiveType === 'private').map((product) => (
                        <div key={product.id} className="relative">
                          <ProductCard product={product} />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <Button size="icon" variant="outline" className="h-7 w-7 bg-white dark:bg-gray-800">
                              <Pencil size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

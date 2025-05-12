import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Edit, User, Tags, ShoppingCart, Database, Bell } from 'lucide-react';
import { sampleProducts } from '@/data/sampleProducts';

// Mock data with the requested user accounts
const mockUsers = [
  { id: 1, username: 'admin', email: 'admin@example.com', role: 'Admin', password: '777967272' },
  { id: 2, username: 'ahmedshumi', email: 'ahmed@example.com', role: 'User', password: '8613185373600' },
  { id: 3, username: 'khaledShumi', email: 'khaled@example.com', role: 'User', password: '905528000065' },
  { id: 4, username: 'sadiqdaari', email: 'sadiq@example.com', role: 'User', password: '13346004085' },
  { id: 5, username: 'ahmednaser', email: 'ahmednaser@example.com', role: 'User', password: '13067536691' },
  { id: 6, username: 'mohammedsalihy', email: 'mohammed@example.com', role: 'User', password: '13270560226' },
  { id: 7, username: 'saddamqazza', email: 'saddam@example.com', role: 'User', password: '777967272' },
  { id: 8, username: 'alihuzami', email: 'ali@example.com', role: 'User', password: '19982442447' },
];

// Keep the existing mockCategories, mockMarketplaces, and mockNotifications
const mockCategories = [
  { id: 1, name: 'Electronics', parentId: null },
  { id: 2, name: 'Smartphones', parentId: 1 },
  { id: 3, name: 'Laptops', parentId: 1 },
  { id: 4, name: 'Clothing', parentId: null },
  { id: 5, name: 'Men\'s Clothing', parentId: 4 },
  { id: 6, name: 'Women\'s Clothing', parentId: 4 },
];

const mockMarketplaces = [
  { id: 1, name: 'Amazon' },
  { id: 2, name: 'eBay' },
  { id: 3, name: 'AliExpress' },
  { id: 4, name: 'Walmart' },
];

const mockNotifications = [
  { id: 1, message: 'New product added', date: '2023-05-15', sent: true },
  { id: 2, message: 'Price change alert', date: '2023-05-14', sent: false },
];

const AdminPage = () => {
  const { t } = useLanguage();
  const [newCategory, setNewCategory] = useState('');
  const [newMarketplace, setNewMarketplace] = useState('');
  const [newNotification, setNewNotification] = useState('');
  
  const allProducts = sampleProducts.map(product => ({
    ...product,
    addedBy: 'User1', // This would come from your backend
  }));

  return (
    <Layout>
      <div className="container mx-auto py-4 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{t('adminPanel')}</h1>
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            {t('adminAccess')}
          </div>
        </div>

        <Tabs defaultValue="products" className="space-y-3">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1 text-xs">
            <TabsTrigger value="products" className="flex items-center gap-1">
              <ShoppingCart size={14} /> {t('products')}
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-1">
              <Tags size={14} /> {t('categories')}
            </TabsTrigger>
            <TabsTrigger value="marketplaces" className="flex items-center gap-1">
              <ShoppingCart size={14} /> {t('marketplaces')}
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-1">
              <User size={14} /> {t('users')}
            </TabsTrigger>
            <TabsTrigger value="backups" className="flex items-center gap-1">
              <Database size={14} /> {t('backups')}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell size={14} /> {t('notifications')}
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-3">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">{t('allProducts')}</CardTitle>
                <CardDescription className="text-sm">
                  {t('totalProducts')}: {allProducts.length}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('productName')}</TableHead>
                        <TableHead>{t('category')}</TableHead>
                        <TableHead>{t('status')}</TableHead>
                        <TableHead>{t('by')}</TableHead>
                        <TableHead className="text-right">{t('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allProducts.map(product => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.status}</TableCell>
                          <TableCell>{product.addedBy}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Edit size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Trash2 size={14} className="text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-3">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">{t('categories')}</CardTitle>
                <CardDescription className="text-sm">{t('categoriesDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder={t('newCategory')}
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button onClick={() => setNewCategory('')} size="sm">
                    <Plus size={14} className="mr-1" /> {t('add')}
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('categoryName')}</TableHead>
                        <TableHead>{t('parent')}</TableHead>
                        <TableHead className="text-right">{t('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCategories.map(category => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>
                            {category.parentId 
                              ? mockCategories.find(c => c.id === category.parentId)?.name 
                              : '-'
                            }
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Edit size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Trash2 size={14} className="text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketplaces Tab */}
          <TabsContent value="marketplaces" className="space-y-3">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">{t('marketplaces')}</CardTitle>
                <CardDescription className="text-sm">{t('marketplacesDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder={t('newMarketplace')}
                    value={newMarketplace}
                    onChange={(e) => setNewMarketplace(e.target.value)}
                  />
                  <Button onClick={() => setNewMarketplace('')} size="sm">
                    <Plus size={14} className="mr-1" /> {t('add')}
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('name')}</TableHead>
                        <TableHead className="text-right">{t('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockMarketplaces.map(marketplace => (
                        <TableRow key={marketplace.id}>
                          <TableCell className="font-medium">{marketplace.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Edit size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Trash2 size={14} className="text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab - Updated with the specified users */}
          <TabsContent value="users" className="space-y-3">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-lg">{t('users')}</CardTitle>
                <CardDescription className="text-sm">{t('usersDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-3">
                  <Button size="sm">
                    <Plus size={14} className="mr-1" /> {t('addUser')}
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('username')}</TableHead>
                        <TableHead>{t('email')}</TableHead>
                        <TableHead>{t('role')}</TableHead>
                        <TableHead>{t('password')}</TableHead>
                        <TableHead className="text-right">{t('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <span className="text-muted-foreground">••••••••</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Edit size={14} />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Trash2 size={14} className="text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backups Tab */}
          <TabsContent value="backups" className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>{t('backups')}</CardTitle>
                <CardDescription>{t('backupsDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-end">
                  <Button>
                    <Plus size={16} className="mr-2" /> {t('createBackup')}
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('date')}</TableHead>
                        <TableHead>{t('size')}</TableHead>
                        <TableHead className="text-right">{t('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">2023-05-15 10:30</TableCell>
                        <TableCell>24 MB</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">{t('download')}</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2023-05-08 09:15</TableCell>
                        <TableCell>22 MB</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">{t('download')}</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>{t('notifications')}</CardTitle>
                <CardDescription>{t('notificationsDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder={t('newNotification')}
                    value={newNotification}
                    onChange={(e) => setNewNotification(e.target.value)}
                  />
                  <Button onClick={() => {
                    // Add new notification logic would go here
                    setNewNotification('');
                  }}>
                    <Plus size={16} className="mr-2" /> {t('add')}
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('message')}</TableHead>
                        <TableHead>{t('date')}</TableHead>
                        <TableHead>{t('status')}</TableHead>
                        <TableHead className="text-right">{t('actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockNotifications.map(notification => (
                        <TableRow key={notification.id}>
                          <TableCell className="font-medium">{notification.message}</TableCell>
                          <TableCell>{notification.date}</TableCell>
                          <TableCell>
                            {notification.sent ? (
                              <span className="text-green-500">{t('sent')}</span>
                            ) : (
                              <span className="text-amber-500">{t('pending')}</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 size={16} className="text-red-500" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminPage;

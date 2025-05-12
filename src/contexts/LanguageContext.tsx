
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: 'TrustGroupArchives',
    home: 'Home',
    products: 'Products',
    addProduct: 'Add Product',
    newProduct: 'New Product',
    search: 'Search',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    productName: 'Product Name',
    price: 'Price',
    currency: 'Currency',
    category: 'Category',
    manufacturer: 'Manufacturer',
    links: 'Links',
    image: 'Image',
    notes: 'Notes',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    filters: 'Filters',
    sortBy: 'Sort By',
    dashboard: 'Dashboard',
    available: 'Available',
    unavailable: 'Unavailable',
    onOrder: 'On Order',
    status: 'Status',
    date: 'Date',
    keywords: 'Keywords',
    rating: 'Rating',
    similarProducts: 'Similar Products',
    marketplaces: 'Marketplaces',
    amazon: 'Amazon',
    ebay: 'eBay',
    aliexpress: 'AliExpress',
    electronics: 'Electronics',
    clothing: 'Clothing',
    homeAppliances: 'Home Appliances',
    usd: 'US Dollar',
    cny: 'Chinese Yuan',
    yer: 'Yemeni Riyal',
    privateArchive: 'Private',
    publicArchive: 'Public',
    archiveType: 'Archive Type',
    language: 'Language',
    english: 'English',
    arabic: 'Arabic',
    chinese: 'Chinese',
    welcome: 'Welcome to TrustGroupArchives',
    recentProducts: 'Recent Products',
    adminPanel: 'Admin Panel',
    adminLogin: 'Admin Login',
    adminPassword: 'Admin Password',
    invalidPassword: 'Invalid password',
    underDevelopment: 'This page is currently under development',
    noProductsFound: 'No products found',
    by: 'by',
    // Add more translations here
  },
  ar: {
    appName: 'أرشيف مجموعة الثقة',
    home: 'الرئيسية',
    products: 'المنتجات',
    addProduct: 'إضافة منتج',
    newProduct: 'منتج جديد',
    search: 'بحث',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    productName: 'اسم المنتج',
    price: 'السعر',
    currency: 'العملة',
    category: 'الفئة',
    manufacturer: 'الشركة المصنعة',
    links: 'الروابط',
    image: 'الصورة',
    notes: 'ملاحظات',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    filters: 'تصفية',
    sortBy: 'ترتيب حسب',
    dashboard: 'لوحة التحكم',
    available: 'متوفر',
    unavailable: 'غير متوفر',
    onOrder: 'قيد الطلب',
    status: 'الحالة',
    date: 'التاريخ',
    keywords: 'الكلمات المفتاحية',
    rating: 'التقييم',
    similarProducts: 'منتجات مشابهة',
    marketplaces: 'أسواق',
    amazon: 'أمازون',
    ebay: 'إيباي',
    aliexpress: 'علي إكسبرس',
    electronics: 'الإلكترونيات',
    clothing: 'الملابس',
    homeAppliances: 'الأجهزة المنزلية',
    usd: 'دولار أمريكي',
    cny: 'يوان صيني',
    yer: 'ريال يمني',
    privateArchive: 'خاص',
    publicArchive: 'عام',
    archiveType: 'نوع الأرشيف',
    language: 'اللغة',
    english: 'الإنجليزية',
    arabic: 'العربية',
    chinese: 'الصينية',
    welcome: 'مرحباً بكم في أرشيف مجموعة الثقة',
    recentProducts: 'المنتجات الحديثة',
    adminPanel: 'لوحة المسؤول',
    adminLogin: 'تسجيل دخول المسؤول',
    adminPassword: 'كلمة مرور المسؤول',
    invalidPassword: 'كلمة المرور غير صحيحة',
    underDevelopment: 'هذه الصفحة قيد التطوير حاليا',
    noProductsFound: 'لم يتم العثور على منتجات',
    by: 'بواسطة',
    allProducts: 'جميع المنتجات',
    totalProducts: 'إجمالي المنتجات',
    adminAccess: 'وصول المسؤول',
    categories: 'الفئات',
    categoriesDescription: 'إدارة فئات المنتجات',
    newCategory: 'فئة جديدة',
    categoryName: 'اسم الفئة',
    parent: 'الفئة الأم',
    actions: 'إجراءات',
    add: 'إضافة',
    name: 'الاسم',
    marketplacesDescription: 'إدارة الأسواق الإلكترونية',
    newMarketplace: 'سوق جديد',
    users: 'المستخدمين',
    usersDescription: 'إدارة حسابات المستخدمين',
    addUser: 'إضافة مستخدم',
    username: 'اسم المستخدم',
    email: 'البريد الإلكتروني',
    role: 'الدور',
    backups: 'النسخ الاحتياطي',
    backupsDescription: 'إدارة النسخ الاحتياطي',
    createBackup: 'إنشاء نسخة احتياطية',
    download: 'تحميل',
    size: 'الحجم',
    notifications: 'الإشعارات',
    notificationsDescription: 'إدارة الإشعارات',
    newNotification: 'إشعار جديد',
    message: 'الرسالة',
    sent: 'تم الإرسال',
    pending: 'قيد الانتظار',
    yourProducts: 'منتجاتك',
    all: 'الكل',
    updateProfile: 'تحديث الملف الشخصي',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    password: 'كلمة المرور'
  },
  zh: {
    appName: '信任集团档案',
    home: '首页',
    products: '产品',
    addProduct: '添加产品',
    search: '搜索',
    profile: '个人资料',
    settings: '设置',
    logout: '退出',
    login: '登录',
    register: '注册',
    productName: '产品名称',
    price: '价格',
    currency: '货币',
    category: '类别',
    manufacturer: '制造商',
    links: '链接',
    image: '图片',
    notes: '备注',
    save: '保存',
    cancel: '取消',
    delete: '删除',
    edit: '编辑',
    view: '查看',
    filters: '筛选',
    sortBy: '排序',
    dashboard: '控制面板',
    available: '可用',
    unavailable: '不可用',
    onOrder: '订购中',
    status: '状态',
    date: '日期',
    keywords: '关键词',
    rating: '评分',
    similarProducts: '类似产品',
    marketplaces: '市场',
    amazon: '亚马逊',
    ebay: '易贝',
    aliexpress: '阿里速卖通',
    electronics: '电子产品',
    clothing: '服装',
    homeAppliances: '家用电器',
    usd: '美元',
    cny: '人民币',
    yer: '也门里亚尔',
    privateArchive: '私人',
    publicArchive: '公开',
    archiveType: '档案类型',
    language: '语言',
    english: '英语',
    arabic: '阿拉伯语',
    chinese: '中文',
    welcome: '欢迎来到信任集团档案',
    recentProducts: '最近产品',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Set HTML dir attribute for RTL support
  useEffect(() => {
    const htmlTag = document.querySelector('html');
    if (htmlTag) {
      if (language === 'ar') {
        htmlTag.setAttribute('dir', 'rtl');
        htmlTag.classList.add('lang-ar');
        htmlTag.classList.remove('lang-zh');
      } else if (language === 'zh') {
        htmlTag.setAttribute('dir', 'ltr');
        htmlTag.classList.remove('lang-ar');
        htmlTag.classList.add('lang-zh');
      } else {
        htmlTag.setAttribute('dir', 'ltr');
        htmlTag.classList.remove('lang-ar', 'lang-zh');
      }
    }
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('preferredLanguage', newLanguage);
    setLanguageState(newLanguage);
  };

  // Load preferred language from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (storedLanguage && ['en', 'ar', 'zh'].includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.substring(0, 2);
      if (browserLang === 'ar') setLanguageState('ar');
      else if (browserLang === 'zh') setLanguageState('zh');
      // Else keep default 'en'
    }
  }, []);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

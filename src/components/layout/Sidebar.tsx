
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { 
  Plus, 
  User, 
  Database,
  LogOut,
  Settings,
  Shield,
  Lock
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Sidebar: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminError, setShowAdminError] = useState(false);
  
  // Admin authentication function
  const authenticateAdmin = () => {
    // Use the specified admin password
    if (adminPassword === '777967272') {
      window.location.href = '/admin';
      setShowAdminError(false);
    } else {
      setShowAdminError(true);
    }
  };

  // Logout function
  const handleLogout = () => {
    // In a real app, this would clear authentication tokens
    toast({
      title: t('logoutSuccess'),
      description: t('logoutSuccessMessage'),
    });
    navigate('/');
  };
  
  const links = [
    { to: '/', label: t('home'), icon: <Database size={18} /> },
    { to: '/add-product', label: t('addProduct'), icon: <Plus size={18} /> },
    { to: '/profile', label: t('profile'), icon: <User size={18} /> },
  ];

  return (
    <aside className="w-56 h-[calc(100vh-3rem)] border-r bg-sidebar p-3 hidden md:block transition-all">
      <nav className="space-y-1">
        {links.map(link => (
          <Link 
            key={link.to} 
            to={link.to}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
              location.pathname === link.to && "bg-professional-50 text-professional-700 font-medium dark:bg-professional-900/30 dark:text-professional-300"
            )}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="absolute bottom-6 left-3 right-3 space-y-1">
        <Link 
          to="/settings" 
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Settings size={18} />
          <span>{t('settings')}</span>
        </Link>

        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left">
              <Shield size={18} />
              <span>{t('adminPanel')}</span>
              <Lock size={14} className="ml-auto" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">{t('adminLogin')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-3">
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder={t('adminPassword')} 
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className={showAdminError ? "border-red-500" : ""}
                />
                {showAdminError && (
                  <p className="text-red-500 text-sm">{t('invalidPassword')}</p>
                )}
              </div>
              <Button onClick={authenticateAdmin} className="w-full">{t('login')}</Button>
            </div>
          </DialogContent>
        </Dialog>

        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 px-3 py-2 w-full text-left rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <LogOut size={18} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;


import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

const Register = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link to="/" className="text-2xl font-bold text-trust-700">
              {t('appName')}
            </Link>
          </div>
          <CardTitle className="text-2xl">{t('register')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                {t('firstName')}
              </label>
              <Input id="firstName" name="firstName" type="text" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                {t('lastName')}
              </label>
              <Input id="lastName" name="lastName" type="text" required />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('email')}
            </label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('password')}
            </label>
            <Input id="password" name="password" type="password" autoComplete="new-password" required />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {t('confirmPassword')}
            </label>
            <Input id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required />
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-trust-600 focus:ring-trust-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              {t('agreeToTerms')}
            </label>
          </div>
          
          <Button className="w-full bg-trust-600 hover:bg-trust-700">
            {t('register')}
          </Button>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            {t('haveAccount')}{' '}
            <Link to="/login" className="font-medium text-trust-600 hover:text-trust-500">
              {t('login')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;

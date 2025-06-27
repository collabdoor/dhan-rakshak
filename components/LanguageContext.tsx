import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LanguageContextProps {
  language: string;
  setLanguage: (lang: string) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextProps>({
  language: 'en',
  setLanguage: () => {},
  translations: {}
});

const translations = {
  en: {
    // English translations
    welcome: 'Welcome to PaisaGuru',
    home: 'Home',
    learn: 'Learn',
    protect: 'Protect',
    calculate: 'Calculate',
    profile: 'Profile',
    // Add more translations as needed
  },
  hi: {
    // Hindi translations
    welcome: 'पैसागुरु में आपका स्वागत है',
    home: 'होम',
    learn: 'सीखें',
    protect: 'सुरक्षा',
    calculate: 'गणना',
    profile: 'प्रोफ़ाइल',
    // Add more translations as needed
  },
  pa: {
    // Punjabi translations
    welcome: 'ਪੈਸਾਗੁਰੂ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    home: 'ਘਰ',
    learn: 'ਸਿੱਖੋ',
    protect: 'ਸੁਰੱਖਿਆ',
    calculate: 'ਗਣਨਾ',
    profile: 'ਪ੍ਰੋਫਾਈਲ',
    // Add more translations as needed
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: string) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        translations: translations[language as keyof typeof translations] || translations.en 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
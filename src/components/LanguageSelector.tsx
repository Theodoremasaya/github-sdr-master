import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: 'en' | 'ja';
  onLanguageChange: (language: 'en' | 'ja') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-gray-600" />
      <div className="flex bg-gray-100 rounded-lg p-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
            currentLanguage === 'en'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          English
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onLanguageChange('ja')}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
            currentLanguage === 'ja'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          日本語
        </motion.button>
      </div>
    </div>
  );
};

export default LanguageSelector;
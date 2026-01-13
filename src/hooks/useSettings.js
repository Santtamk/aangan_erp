import { useState, useEffect } from 'react';

const STORAGE_KEY = 'aangan_settings';

const DEFAULT_SETTINGS = {
    language: 'en' // 'en' | 'np'
};

export const useSettings = () => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        try {
            return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
        } catch (e) {
            return DEFAULT_SETTINGS;
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);

    const setLanguage = (lang) => {
        setSettings(prev => ({ ...prev, language: lang }));
    };

    return {
        settings,
        setLanguage
    };
};

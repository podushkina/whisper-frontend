import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LanguageContextProps {
    language: 'en' | 'ru';
    setLanguage: (language: 'en' | 'ru') => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        welcome: 'Welcome to Whisper API Frontend',
        intro: 'This is a simple frontend to the Whisper API. You can transcribe audio files and view transcribed text.',
        transcribeAudio: 'Transcribe Audio',
        language: 'Language',
        outputFormat: 'Output Format',
        transcribe: 'Transcribe',
        transcription: 'Transcription',
        transcriptions: 'Transcriptions',
        apiKey: 'API Key',
        getToken: 'Get Token',
        tokenReceived: 'Token received and stored!',
        home: 'Home',
        auth: 'Auth',
        transcribePage: 'Transcribe',
        transcriptionsPage: 'Transcriptions',
        audioProcessing: 'Audio file is being processed...',
    errorTranscribing: 'Error transcribing file.',
    errorGettingToken: 'Error getting token.',
        autoDetect: 'Auto Detect'
    },
    ru: {
        welcome: 'Добро пожаловать в интерфейс Whisper API',
        intro: 'Это простой веб-интерфейс для Whisper API. Вы можете транскрибировать аудиофайлы и просматривать транскрибированный текст.',
        transcribeAudio: 'Аудио в текст',
        language: 'Язык',
        outputFormat: 'Формат вывода',
        transcribe: 'Транскрибировать',
        transcription: 'Транскрипция',
        transcriptions: 'Транскрипции',
        apiKey: 'API ключ',
        getToken: 'Получить токен',
        tokenReceived: 'Токен получен и сохранен!',
        home: 'Домой',
        auth: 'Авторизация',
        transcribePage: 'Транскрибировать',
        transcriptionsPage: 'Транскрипции',
        audioProcessing: 'Аудиофайл обрабатывается...',
    errorTranscribing: 'Ошибка при транскрибировании файла.',
    errorGettingToken: 'Ошибка получения токена.',
        autoDetect: 'Определить язык'
    }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<'en' | 'ru'>('en');

    const t = (key: string) => (translations[language] as { [key: string]: string })[key] || key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
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

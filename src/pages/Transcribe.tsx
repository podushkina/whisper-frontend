import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';

const Transcribe: React.FC = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('auto'); // 'auto' для "Определить язык"
  const [outputFormat, setOutputFormat] = useState('txt');
  const [transcription, setTranscription] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);
    if (language !== 'auto') { // Если язык не "Определить язык", добавляем параметр language
      formData.append('language', language);
    }
    formData.append('output_format', outputFormat);

    setIsProcessing(true);
    setErrorMessage('');
    setTranscription('');
    try {
      const response = await axios.post('/api/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTimeout(() => {
        setTranscription(response.data.text);
        setIsProcessing(false);
      }, 5000); // 5 секунд задержки
    } catch (error) {
      setTimeout(() => {
        setErrorMessage(t('errorTranscribing'));
        setIsProcessing(false);
      }, 5000); // 5 секунд задержки
      console.error('Error transcribing file:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>{t('transcribeAudio')}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="file"
            onChange={handleFileChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('language')}</InputLabel>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="auto">{t('autoDetect')}</MenuItem> {/* Новая опция для "Определить язык" */}
              <MenuItem value="ru">Русский</MenuItem>
              <MenuItem value="en">English</MenuItem>
              {/* Add more languages as needed */}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>{t('outputFormat')}</InputLabel>
            <Select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              <MenuItem value="txt">Text</MenuItem>
              <MenuItem value="json">JSON</MenuItem>
              {/* Add more output formats as needed */}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            {t('transcribe')}
          </Button>
        </form>
        {isProcessing && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t('audioProcessing')}
          </Typography>
        )}
        {transcription && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t('transcription')}: {transcription}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Transcribe;

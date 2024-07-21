import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';

const Auth: React.FC = () => {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('/api/auth/token', { api_key: apiKey });
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
    } catch (error) {
      setErrorMessage(t('errorGettingToken'));
      console.error('Error getting token:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>{t('auth')}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label={t('apiKey')}
            type="password"
            fullWidth
            margin="normal"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            {t('getToken')}
          </Button>
        </form>
        {token && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            {t('tokenReceived')}
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

export default Auth;

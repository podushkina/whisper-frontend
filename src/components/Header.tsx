import React from 'react';
import { AppBar, Toolbar, Typography, Button, Select, MenuItem, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Whisper API
        </Typography>
        <Button color="inherit" component={Link} to="/">{t('home')}</Button>
        <Button color="inherit" component={Link} to="/auth">{t('auth')}</Button>
        <Button color="inherit" component={Link} to="/transcribe">{t('transcribePage')}</Button>
        <Button color="inherit" component={Link} to="/transcriptions">{t('transcriptionsPage')}</Button>
        <Box sx={{ ml: 2 }}>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ru')}
            color="primary"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
          </Select>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

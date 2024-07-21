import React from 'react';
import { Typography, Container, Paper } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
    const { t } = useLanguage();

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h4" gutterBottom>{t('welcome')}</Typography>
                <Typography variant="body1">
                    {t('intro')}
                </Typography>
            </Paper>
        </Container>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import { useLocation } from 'react-router-dom';
import api from '../api';
import { useLanguage } from '../contexts/LanguageContext';

interface Transcription {
  id: string;
  transcription: string;
  status: string;
}

interface CompletedTranscription {
  id: string;
  number: number;
  text: string;
}

const Transcriptions: React.FC = () => {
  const { t } = useLanguage();
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [completedMap, setCompletedMap] = useState<Map<string, CompletedTranscription>>(new Map());
  const location = useLocation();

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const response = await api.get('/api/transcribe');
        setTranscriptions(response.data);

        // Обновляем мапу завершенных транскрипций
        setCompletedMap(prevMap => {
          const newMap = new Map(prevMap);
          response.data.forEach((transcription: Transcription) => {
            if (transcription.status === 'completed' && transcription.transcription) {
              if (!newMap.has(transcription.id)) {
                const newNumber = newMap.size + 1;
                newMap.set(transcription.id, {
                  id: transcription.id,
                  number: newNumber,
                  text: transcription.transcription
                });
              }
            }
          });
          return newMap;
        });
      } catch (error) {
        console.error('Error fetching transcriptions:', error);
      }
    };
    fetchTranscriptions();
  }, [location]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const sortedTranscriptions = [...transcriptions].sort((a, b) => {
    const aCompleted = completedMap.get(a.id);
    const bCompleted = completedMap.get(b.id);
    if (aCompleted && bCompleted) return aCompleted.number - bCompleted.number;
    if (aCompleted) return -1;
    if (bCompleted) return 1;
    return 0;
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>{t('transcriptions')}</Typography>
        <List>
          {sortedTranscriptions.map((transcription) => {
            const completedInfo = completedMap.get(transcription.id);
            const transcriptionNumber = completedInfo ? completedInfo.number : completedMap.size + 1;
            
            return (
              <React.Fragment key={transcription.id}>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {t('transcription')} {transcriptionNumber}
                        </Typography>
                        <Chip label={transcription.status} color={getStatusColor(transcription.status)} size="small" sx={{ ml: 1 }} />
                      </React.Fragment>
                    }
                    secondary={
                      completedInfo ? (
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          {completedInfo.text}
                        </Typography>
                      ) : null
                    }
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </Paper>
    </Container>
  );
};

export default Transcriptions;

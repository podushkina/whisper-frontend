import React, { useEffect, useState } from 'react';
import { Typography, Container, Paper } from '@mui/material';
import axios from 'axios';

interface UsageData {
  totalRequests: number;
  totalDuration: number;
}

const Usage: React.FC = () => {
  const [usage, setUsage] = useState<UsageData | null>(null);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const response = await axios.get('/api/usage', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsage(response.data);
      } catch (error) {
        console.error('Error fetching usage:', error);
      }
    };

    fetchUsage();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>Usage Statistics</Typography>
        {usage ? (
          <>
            <Typography variant="body1">Total Requests: {usage.totalRequests}</Typography>
            <Typography variant="body1">Total Duration: {usage.totalDuration} seconds</Typography>
          </>
        ) : (
          <Typography variant="body1">Loading usage data...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Usage;

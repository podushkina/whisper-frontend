import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const transcribeAudio = (file: File, language: string, outputFormat: string) => {
  const formData = new FormData();
  formData.append('audio', file);
  formData.append('language', language);
  formData.append('output_format', outputFormat);
  return api.post('/transcribe', formData);
};

export const getTranscriptions = () => api.get('/transcribe');

export const getToken = (apiKey: string) => api.post('/auth/token', { api_key: apiKey });

export default api;

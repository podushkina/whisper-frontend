import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './pages/Home';
import Transcribe from './pages/Transcribe';
import Transcriptions from './pages/Transcriptions';
import Auth from './components/Auth';
import { LanguageProvider } from './contexts/LanguageContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/transcribe" element={<Transcribe />} />
              <Route path="/transcriptions" element={<Transcriptions />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </LanguageProvider>
  );
}

export default App;

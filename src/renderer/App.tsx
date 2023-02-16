import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  MutableSnapshot,
} from 'recoil';
import { MemoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button, CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import AppBarCustom from './components/AppBar.comp';
import LandingPage from './pages/Landing.page';
import './App.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthState, authStateAtom } from './state/atomsNew';
import TestApiPage from './pages/TestApi.page';
import LoginPage from './pages/Login.page';
import RegisterPage from './pages/Register.page';

export default function App() {
  const isElectron = !!(window.electron && window.electron.ipcRenderer);

  const [authState, setAuthState] = useRecoilState<AuthState>(authStateAtom);

  if (isElectron) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <MemoryRouter>
          <AppBarCustom />
          <Box sx={{ flexGrow: 1, padding: 2, display: 'flex' }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/testapi" element={<TestApiPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Box>
        </MemoryRouter>
      </Box>
    );
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <BrowserRouter>
        <AppBarCustom />
        <Box sx={{ flexGrow: 1, padding: 2, display: 'flex' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/testapi" element={<TestApiPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

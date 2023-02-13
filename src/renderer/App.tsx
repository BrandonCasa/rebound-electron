import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  MutableSnapshot,
} from 'recoil';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  const [authState, setAuthState] = useRecoilState<AuthState>(authStateAtom);

  return (
    <Router>
      <AppBarCustom />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/testapi" element={<TestApiPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

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
import { CssBaseline } from '@mui/material';
import AppBarCustom from './components/AppBar.comp';
import LandingPage from './pages/Landing.page';
import icon from '../../assets/icon.svg';
import './App.scss';
import { todoListState } from './state/atoms';

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      mode: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    palette?: {
      mode?: string;
    };
  }
}
// Dark mode
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const isElectron = !!(window.electron && window.electron.ipcRenderer);

const defaultRecoilState = (snapshot: MutableSnapshot) => {
  if (isElectron) {
    snapshot.set(
      todoListState,
      window.electron.store.get('recoil-todoList-state') || []
    );
  } else {
    // use localstorage
    snapshot.set(
      todoListState,
      JSON.parse(localStorage.getItem('recoil-todoList-state')) || []
    );
  }
};

export default function App() {
  return (
    <RecoilRoot initializeState={defaultRecoilState}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppBarCustom />
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}

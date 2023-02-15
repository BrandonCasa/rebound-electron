import { createRoot } from 'react-dom/client';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from './App';
import { todoListState } from './state/atoms';
import { authStateAtom } from './state/atomsNew';
import type {} from '@mui/lab/themeAugmentation';

// Dark mode
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const isElectron = !!(window.electron && window.electron.ipcRenderer);

const constructDefaultState = (stateName: string, stateFallback: unknown) => {
  let defaultStates;
  if (isElectron) {
    defaultStates = window.electron.store.get(stateName) || stateFallback;
  } else {
    const localStorageItem = localStorage.getItem(stateName);
    const localStorageItemParsed = JSON.parse(
      localStorageItem || JSON.stringify(stateFallback)
    );
    defaultStates = localStorageItemParsed;
  }
  return defaultStates;
};

const defaultRecoilState = (snapshot: MutableSnapshot) => {
  // Todo List State
  const todoListDefault = constructDefaultState('recoil-todoList-state', []);
  snapshot.set(todoListState, todoListDefault);

  // Auth State
  const authDefault = constructDefaultState('recoil-auth-state', {
    isAuthenticated: false,
  });
  snapshot.set(authStateAtom, authDefault);
};

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <RecoilRoot initializeState={defaultRecoilState}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
/*
if (isElectron) {
  // calling IPC exposed from preload script
  window.electron.ipcRenderer.once('ipc-example', (arg) => {
    // eslint-disable-next-line no-console
    console.log(arg);
  });
  window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
}
*/

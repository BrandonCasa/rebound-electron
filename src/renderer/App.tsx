import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  MutableSnapshot,
} from 'recoil';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppBarCustom from './components/AppBar.comp';
import LandingPage from './pages/Landing.page';
import icon from '../../assets/icon.svg';
import './App.scss';
import { todoListState } from './state/atoms';

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <button
        type="button"
        onClick={() => {
          console.log(window.electron.store.get('foo'));
        }}
      >
        Get Value
      </button>
      <button
        type="button"
        onClick={() => {
          window.electron.store.set('foo', 'bar');
        }}
      >
        Set Value
      </button>
      <button
        type="button"
        onClick={() => {
          console.log(window.electron);
        }}
      >
        Check Electron
      </button>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  const isElectron = window.electron && window.electron.ipcRenderer;
  let defaultRecoilState;

  // Pull from web after both of these
  if (isElectron) {
    // Construct the default state for the app from the electron-store
    defaultRecoilState = (snapshot: MutableSnapshot) => {
      snapshot.set(
        todoListState,
        window.electron.store.get('recoil-todoList-state') || []
      );
    };
  } else {
    defaultRecoilState = (snapshot: MutableSnapshot) => {
      snapshot.set(todoListState, [
        {
          name: 'My first todo',
          isCompleted: false,
        },
      ]);
    };
  }

  return (
    <RecoilRoot
      initializeState={isElectron ? defaultRecoilState : defaultRecoilState}
    >
      <Router>
        <AppBarCustom />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.scss';
import AppBarCustom from './components/AppBar.comp';
import LandingPage from './pages/Landing.page';

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
  return (
    <Router>
      <AppBarCustom />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

/* eslint-disable no-console */
import { atom } from 'recoil';

// const isElectron = !!(window.electron && window.electron.ipcRenderer);

export interface AuthState {
  isAuthenticated: boolean;
  user?: {
    id: string;
    displayname: string;
    username: string;
    email: string;
    avatar: string | null;
    friends: string[];
    aboutMe: string;
    createdAt: string;
    servers: string[];
    interests: string[];
  };
}

export const authStateAtom = atom<AuthState>({
  key: 'authStateAtom',
  default: { isAuthenticated: false },
  effects: [
    ({ onSet }) => {
      onSet((newState) => {
        console.log('newAuthState', newState);
        /*
        if (isElectron) {
          window.electron.store.set('recoil-auth-state', newState);
        } else {
          localStorage.setItem(
            'recoil-auth-state',
            JSON.stringify(newState)
          );
        }
        */
      });
    },
  ],
});

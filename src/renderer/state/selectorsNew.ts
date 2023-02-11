import { selector } from 'recoil';
import { AuthState, authStateAtom } from './atomsNew';

const authStateSelector = selector<AuthState>({
  key: 'authStateSelector',
  get: ({ get }) => {
    const auth = get<AuthState>(authStateAtom);
    return auth;
  },
});

export default authStateSelector;

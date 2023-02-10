import { atom } from 'recoil';

const isElectron = !!(window.electron && window.electron.ipcRenderer);

export interface Todo {
  name: string;
  isCompleted: boolean;
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
  effects: [
    ({ onSet }) => {
      onSet((newState) => {
        if (isElectron) {
          window.electron.store.set('recoil-todoList-state', newState);
        } else {
          localStorage.setItem(
            'recoil-todoList-state',
            JSON.stringify(newState)
          );
        }
      });
    },
  ],
});

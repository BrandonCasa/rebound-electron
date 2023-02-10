import { atom } from 'recoil';

const isElectron = !!(window.electron && window.electron.ipcRenderer);

export interface Todo {
  name: string;
  isCompleted: boolean;
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [
    { name: 'Apples', isCompleted: false },
    { name: 'Eggs', isCompleted: false },
    { name: 'Butter', isCompleted: false },
  ],
  effects: [
    ({ onSet }) => {
      onSet((newState) => {
        console.log('New Todos:', newState);
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

export const todoListFilterState = atom<string>({
  key: 'todoListFilterState',
  default: 'Hepsini göster',
});

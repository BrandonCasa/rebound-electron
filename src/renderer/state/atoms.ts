import { atom } from 'recoil';

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
        window.electron.store.set('recoil-todoList-state', newState);
      });
    },
  ],
});

export const todoListFilterState = atom<string>({
  key: 'todoListFilterState',
  default: 'Hepsini göster',
});

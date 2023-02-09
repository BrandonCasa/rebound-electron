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
});

export const todoListState2 = atom<Todo[]>({
  key: 'todoListState2',
  default: [
    { name: 'Apples', isCompleted: false },
    { name: 'Eggs', isCompleted: false },
    { name: 'Butter', isCompleted: false },
  ],
});

export const todoListFilterState = atom<string>({
  key: 'todoListFilterState',
  default: 'Hepsini göster',
});

import { selector } from 'recoil';
import { todoListState, Todo } from './atoms';

interface TodoList {
  todos: Todo[];
}

export const filteredTodoListState = selector<Todo[]>({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const todos = get<Todo[]>(todoListState);
    return todos;
  },
});

interface User {
  name: string;
}

export const currentUserNameQuery = selector<string>({
  key: 'CurrentUserName',
  get: async ({ get }) => {
    const response = await fetch(`https://api.github.com/users/BrandonCasa`);
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    const json = (await response.json()) as User;
    return json.name;
  },
});

import { selector } from 'recoil';
import { todoListFilterState, todoListState, Todo } from './atoms';

interface TodoList {
  todos: Todo[];
  filter: string;
}

export const filteredTodoListState = selector<Todo[]>({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const { filter, todos } = get<TodoList>(todoListState);

    switch (filter) {
      case 'completed':
        return todos.filter((item) => item.isCompleted);
      case 'uncompleted':
        return todos.filter((item) => !item.isCompleted);
      default:
        // all
        return todos;
    }
  },
});

interface User {
  name: string;
}

export const currentUserNameQuery = selector<string>({
  key: 'CurrentUserName',
  get: async ({ get }) => {
    const response = await fetch(`https://api.github.com/users/ozcanzaferayan`);
    if (!response.ok) {
      throw new Error(`Error fetching user: ${response.statusText}`);
    }
    const json = (await response.json()) as User;
    return json.name;
  },
});

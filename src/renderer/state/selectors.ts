import { selector } from 'recoil';
import { todoListState, Todo } from './atoms';

const filteredTodoListState = selector<Todo[]>({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const todos = get<Todo[]>(todoListState);
    return todos;
  },
});

export default filteredTodoListState;

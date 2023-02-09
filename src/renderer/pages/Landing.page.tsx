import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useRecoilState, useRecoilValue } from 'recoil';
import TodoItem from 'renderer/components/TodoItem';
import { Todo, todoListState } from 'renderer/state/atoms';
import { filteredTodoListState } from '../state/selectors';

export default function LandingPage() {
  const filteredTodos = useRecoilValue<Todo[]>(filteredTodoListState);
  const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState);

  const addTodo = () => {
    const todos = [...todoList];
    const todo = {
      name: 'New Todo',
      isCompleted: false,
    };
    todos.push(todo);
    setTodoList(todos);
  };

  return (
    <Box>
      {filteredTodos.map((item, index) => (
        <TodoItem key={`${item}-${index + 1}`} item={item} index={index} />
      ))}
      <Button variant="contained" onClick={addTodo}>
        Add Todo
      </Button>
    </Box>
  );
}

/* eslint-disable */
import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { todoListState, Todo } from '../state/atoms';
// https://codesandbox.io/s/recoil-sample-mbu5x?file=/src/components/TodoItem.js
const propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

type TodoItemProps = PropTypes.InferProps<typeof propTypes>;

const TodoItem: FunctionComponent<TodoItemProps> = ({ item, index }) => {
  const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState);

  const deleteItemAt = (delIndex: number) => {
    const todos = [...todoList];
    todos.splice(delIndex, 1);
    setTodoList(todos);
  };
  const editItemAt = (editIndex: number) => {
    const todos = [...todoList];
    const todo = todoList[editIndex];
    // eslint-disable-next-line no-alert
    const namePrompt = prompt('Change item name', todo.name);
    if (namePrompt !== null) {
      todos[editIndex] = { ...todo, name: namePrompt };
      setTodoList(todos);
    }
  };

  const completeAt = (completeIndex: number) => {
    const todos = [...todoList];
    const todo = todos[completeIndex];
    todos[completeIndex] = { name: todo.name, isCompleted: !todo.isCompleted };
    setTodoList(todos);
  };

  return (
    <li key={item.name}>
      <span
        onClick={() => completeAt(index)}
        style={{
          textDecoration: item.isCompleted ? 'line-through' : 'initial',
        }}
      >
        {item.name}
      </span>
      <button onClick={() => deleteItemAt(index)}>Delete</button>
      <button onClick={() => editItemAt(index)}>Edit</button>
    </li>
  );
};

TodoItem.propTypes = propTypes;

export default TodoItem;

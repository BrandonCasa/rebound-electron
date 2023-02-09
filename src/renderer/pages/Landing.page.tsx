import Box from '@mui/material/Box';
import { useRecoilValue } from 'recoil';
import { filteredTodoListState } from '../state/selectors';

export default function LandingPage() {
  const filteredTodos = useRecoilValue(filteredTodoListState);

  return <Box>{JSON.stringify(filteredTodos)}</Box>;
}

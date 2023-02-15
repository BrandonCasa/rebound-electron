/* eslint-disable no-console */
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { AuthState, authStateAtom } from 'renderer/state/atomsNew';
import { useRecoilState } from 'recoil';
import { Button, TextField } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { ChangeEvent, useState } from 'react';

export default function LoginPage() {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  const [authState, setAuthState] = useRecoilState<AuthState>(authStateAtom);

  return <Box sx={{ flexGrow: 1 }}>xdd</Box>;
}

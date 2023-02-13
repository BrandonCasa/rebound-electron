import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { AuthState, authStateAtom } from 'renderer/state/atomsNew';
import { useRecoilState } from 'recoil';
import { Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TestApiPage() {
  const [authState, setAuthState] = useRecoilState<AuthState>(authStateAtom);

  const handleLogin = () => {
    setAuthState({ isAuthenticated: true });
  };

  const handleLogout = () => {
    setAuthState({ isAuthenticated: false });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={4} lg={3}>
          <Item>Web State Dashboard</Item>
        </Grid>
        <Grid container xs={12} md={8} lg={9} spacing={2} alignItems="stretch">
          <Grid xs={6} lg={3}>
            <Item sx={{ height: '100%' }}>
              <Box
                id="category-a"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                State: Auth
              </Box>
              <Box component="ul" aria-labelledby="category-a" sx={{ pl: 2 }}>
                {Object.keys(authState).map((key) => (
                  <li key={key}>{`${key}: ${authState[key]}`}</li>
                ))}
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item sx={{ height: '100%' }}>
              <Box
                id="category-b"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                State: 2
              </Box>
              <Box component="ul" aria-labelledby="category-b" sx={{ pl: 2 }}>
                <li>Value 1</li>
                <li>Value 2</li>
                <li>Value 3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item sx={{ height: '100%' }}>
              <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                State: 3
              </Box>
              <Box component="ul" aria-labelledby="category-c" sx={{ pl: 2 }}>
                <li>Value 1</li>
                <li>Value 2</li>
                <li>Value 3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item sx={{ height: '100%' }}>
              <Box
                id="category-d"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                State: 4
              </Box>
              <Box component="ul" aria-labelledby="category-d" sx={{ pl: 2 }}>
                <li>Value 1</li>
                <li>Value 2</li>
                <li>Value 3</li>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px' }}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 } }}>
            <Item>Admin Only</Item>
          </Grid>
          <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Grid>
              <Button
                variant="contained"
                onClick={() => {
                  !authState.isAuthenticated ? handleLogin() : handleLogout();
                }}
              >
                {!authState.isAuthenticated ? 'Login' : 'Logout'}
              </Button>
            </Grid>
            <Grid>
              <Button variant="contained" disabled={!authState.isAuthenticated}>
                Add Friend
              </Button>
            </Grid>
            <Grid>
              <Button variant="contained" disabled={!authState.isAuthenticated}>
                Modify Profile
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

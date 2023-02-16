/* eslint-disable no-console */
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { AuthState, authStateAtom } from 'renderer/state/atomsNew';
import { useRecoilState } from 'recoil';
import Tooltip from '@mui/material/Tooltip';
import {
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TreeItem from '@mui/lab/TreeItem';
import React, { ChangeEvent, useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TestApiPage() {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayname, setDisplayname] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState(false);

  const [runningRequest, setRunningRequest] = useState(false);
  const [registerTooltip, setRegisterTooltip] = useState('');
  const [loginTooltip, setLoginTooltip] = useState('');

  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const [authState, setAuthState] = useRecoilState<AuthState>(authStateAtom);

  React.useEffect(() => {
    let registerText = '';
    let loginText = '';
    if (username === '') {
      registerText += 'Username';
      loginText += 'Username';
    }
    if (password === '') {
      if (registerText !== '') {
        registerText += ', ';
      }
      if (loginText !== '') {
        loginText += ', ';
      }
      registerText += 'Password';
      loginText += 'Password';
    }
    if (displayname === '') {
      if (registerText !== '') {
        registerText += ', ';
      }
      registerText += 'Display Name';
    }
    if (email === '') {
      if (registerText !== '') {
        registerText += ', ';
      }
      registerText += 'Email';
    }
    if (interests.length === 0) {
      if (registerText !== '') {
        registerText += ', ';
      }
      registerText += 'Interests';
    }

    if (registerText.includes(', ')) {
      registerText += ' are required.';
    } else if (registerText !== '') {
      registerText += ' is required.';
    }

    if (loginText.includes(', ')) {
      loginText += ' are required.';
    } else if (loginText !== '') {
      loginText += ' is required.';
    }

    if (runningRequest) {
      if (registerText !== '') {
        registerText += ' ';
      }
      if (loginText !== '') {
        loginText += ' ';
      }
      registerText += 'App is busy.';
      loginText += 'App is busy.';
    }
    setRegisterTooltip(registerText);
    setLoginTooltip(loginText);
  }, [username, password, displayname, email, interests, runningRequest]);

  const login = async (response: AxiosResponse) => {
    const { user } = response.data;
    console.log(user);
    setAuthState({
      isAuthenticated: true,
      user: {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        id: user['_id'],
        displayname: user.displayname,
        username: user.username,
        email: user.email,
        avatar: null,
        friends: user.friends,
        aboutMe: user.aboutMe,
        createdAt: user.createdAt,
        servers: user.servers,
        interests: user.interests,
      },
    });
  };

  const handleLogin = async (usernameVal: string, passwordVal: string) => {
    setRunningRequest(true);
    const options = {
      method: 'POST',
      url: isDev
        ? 'http://localhost:6001/api/auth/login'
        : 'https://reboundapp.tv/api/auth/login',
      headers: {
        'content-type': 'application/json',
      },
      data: [
        {
          username: usernameVal,
          password: passwordVal,
        },
      ],
    };
    try {
      const response = await axios.request(options);
      if (response.data.user) {
        login(response);
      }
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError && error.response?.data.error) {
        setLoginError(error.response.data.error);
        console.error(error.response.data.error);
      } else {
        setLoginError('Unknown error');
        console.error(error);
      }
    }
    setRunningRequest(false);
  };

  const handleRegister = async (
    usernameVal: string,
    passwordVal: string,
    displaynameVal: string,
    emailVal: string,
    interestsVal: string[]
  ) => {
    setRunningRequest(true);
    const options = {
      method: 'POST',
      url: isDev
        ? 'http://localhost:6001/api/auth/register'
        : 'https://reboundapp.tv/api/auth/register',
      headers: {
        'content-type': 'application/json',
      },
      data: [
        {
          displayname: displaynameVal,
          username: usernameVal,
          email: emailVal,
          password: passwordVal,
          interests: interestsVal,
        },
      ],
    };
    try {
      const response = await axios.request(options);
      if (response.data.user) {
        login(response);
      }
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError && error.response?.data.error) {
        setRegisterError(error.response.data.error);
        console.error(error.response.data.error);
      } else {
        setRegisterError('Unknown error');
        console.error(error);
      }
    }
    setRunningRequest(false);
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
          <Grid xs={8}>
            <Item sx={{ height: '100%' }}>
              <Box sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
                State: Auth
              </Box>
              <Box component="ul" sx={{ padding: 2, margin: 0 }}>
                <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{
                    height: '100%',
                    flexGrow: 1,
                    overflowY: 'auto',
                  }}
                >
                  <TreeItem
                    nodeId="Logged In"
                    label={`Logged In: ${authState.isAuthenticated}`}
                  />
                  <TreeItem
                    nodeId="User"
                    label="User"
                    sx={{
                      visibility: authState.isAuthenticated
                        ? 'visible'
                        : 'hidden',
                    }}
                  >
                    <TreeItem nodeId="User ID" label="User ID">
                      {authState.user?.id}
                    </TreeItem>
                    <TreeItem nodeId="Display Name" label="Display Name">
                      {authState.user?.displayname}
                    </TreeItem>
                    <TreeItem nodeId="Username" label="Username">
                      {authState.user?.username}
                    </TreeItem>
                    <TreeItem nodeId="Email" label="Email">
                      {authState.user?.email}
                    </TreeItem>
                    <TreeItem nodeId="Friends" label="Friends">
                      {authState?.user?.friends !== null &&
                      authState?.user?.friends.length !== undefined &&
                      authState?.user?.friends.length > 0 ? (
                        Object.keys(authState.user?.friends).map(
                          (key, index) => (
                            <TreeItem
                              key={`Friend-${key}`}
                              nodeId={`Friend-${index}`}
                              label={
                                authState?.user?.friends
                                  ? Object.values(authState?.user?.friends)[
                                      index
                                    ]
                                  : 'Error'
                              }
                            />
                          )
                        )
                      ) : (
                        <TreeItem nodeId="No Friends" label="No Friends" />
                      )}
                    </TreeItem>
                    <TreeItem nodeId="About Me" label="About Me">
                      {authState.user?.aboutMe}
                    </TreeItem>
                    <TreeItem nodeId="Created At" label="Created At">
                      {authState.user?.createdAt}
                    </TreeItem>
                    <TreeItem nodeId="Servers" label="Servers">
                      {authState?.user?.servers !== null &&
                      authState?.user?.servers.length !== undefined &&
                      authState?.user?.servers.length > 0 ? (
                        Object.keys(authState.user?.servers).map(
                          (key, index) => (
                            <TreeItem
                              key={`Server-${key}`}
                              nodeId={`Server-${index}`}
                              label={
                                authState?.user?.servers
                                  ? Object.values(authState?.user?.servers)[
                                      index
                                    ]
                                  : 'Error'
                              }
                            />
                          )
                        )
                      ) : (
                        <TreeItem nodeId="No servers" label="No servers" />
                      )}
                    </TreeItem>
                    <TreeItem nodeId="Interests" label="Interests">
                      {authState?.user?.interests !== null &&
                      authState?.user?.interests.length !== undefined &&
                      authState?.user?.interests.length > 0 ? (
                        Object.keys(authState.user?.interests).map(
                          (key, index) => (
                            <TreeItem
                              key={`Interest-${key}`}
                              nodeId={`Interest-${index}`}
                              label={
                                authState?.user?.interests
                                  ? Object.values(authState?.user?.interests)[
                                      index
                                    ]
                                  : 'Error'
                              }
                            />
                          )
                        )
                      ) : (
                        <TreeItem nodeId="No interests" label="No interests" />
                      )}
                    </TreeItem>
                  </TreeItem>
                </TreeView>
              </Box>
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item sx={{ height: '100%' }}>
              <Box
                id="category-b"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                State: 2
              </Box>
              <Box
                component="ul"
                sx={{
                  padding: 2,
                  margin: 0,
                }}
              >
                <li>Value 1</li>
                <li>Value 2</li>
                <li>Value 3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item sx={{ height: '100%' }}>
              <Box
                id="required-fields"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Required Fields
              </Box>
              <Box
                id="required-fields"
                sx={{ fontSize: '12px', color: 'red' }}
                display={loginError !== '' ? 'block' : 'none'}
              >
                Error: {loginError}
              </Box>
              <Box
                component="form"
                sx={{
                  padding: 2,
                  margin: 0,
                }}
                noValidate
                autoComplete="off"
                onChange={(e: unknown) => {
                  const event = e as React.ChangeEvent<HTMLInputElement>;
                  if (event.target.id === 'Username Field') {
                    setUsername(event.target.value);
                  } else if (event.target.id === 'Password Field') {
                    setPassword(event.target.value);
                  } else if (event.target.id === 'Stay Logged In') {
                    setStayLoggedIn(!stayLoggedIn);
                  } else {
                    console.log('Error on Login Fields');
                  }
                }}
              >
                <TextField
                  fullWidth
                  id="Username Field"
                  label="Username"
                  variant="outlined"
                />
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  id="Password Field"
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography>
                  Stay Logged In (WIP):
                  <Checkbox id="Stay Logged In" checked={stayLoggedIn} />
                </Typography>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item sx={{ height: '100%' }}>
              <Box
                id="register-fields"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Registration Fields
              </Box>
              <Box
                id="required-fields"
                sx={{ fontSize: '12px', color: 'red' }}
                display={registerError !== '' ? 'block' : 'none'}
              >
                Error: {registerError}
              </Box>
              <Box
                component="form"
                sx={{
                  padding: 2,
                  margin: 0,
                }}
                noValidate
                autoComplete="off"
                onChange={(e: unknown) => {
                  const event = e as React.ChangeEvent<HTMLInputElement>;
                  if (event.target.id === 'Email Field') {
                    setEmail(event.target.value);
                  } else if (event.target.id === 'Display Name Field') {
                    setDisplayname(event.target.value);
                  } else if (event.target.id === 'Interests Field') {
                    let interestsVal = event.target.value.split(',');
                    interestsVal = interestsVal.map((interest) =>
                      interest.trim()
                    );
                    setInterests(interestsVal);
                  } else {
                    console.log('Error on Register Fields');
                  }
                }}
              >
                <TextField
                  fullWidth
                  id="Display Name Field"
                  label="Display Name"
                  variant="outlined"
                />
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  id="Email Field"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  sx={{ marginTop: 2 }}
                  fullWidth
                  id="Interests Field"
                  label="Interests"
                  variant="outlined"
                />
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
              <Tooltip title={loginTooltip}>
                <Button
                  variant="contained"
                  onClick={() => {
                    if (!authState.isAuthenticated) {
                      if (username === '' || password === '') {
                        setLoginError('Please fill out all fields');
                      } else if (runningRequest) {
                        setLoginError('Please wait for current request');
                      } else {
                        handleLogin(username, password);
                      }
                    } else {
                      handleLogout();
                    }
                  }}
                >
                  {!authState.isAuthenticated ? 'Login' : 'Logout'}
                </Button>
              </Tooltip>
            </Grid>
            {!authState.isAuthenticated && (
              <Grid>
                <Tooltip title={registerTooltip}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (
                        username === '' ||
                        password === '' ||
                        displayname === '' ||
                        email === '' ||
                        interests.length === 0
                      ) {
                        setRegisterError('Please fill out all fields');
                      } else if (runningRequest) {
                        setRegisterError('Please wait for current request');
                      } else {
                        handleRegister(
                          username,
                          password,
                          displayname,
                          email,
                          interests
                        );
                      }
                    }}
                  >
                    Register
                  </Button>
                </Tooltip>
              </Grid>
            )}
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

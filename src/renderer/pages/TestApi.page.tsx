import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { AuthState, authStateAtom } from 'renderer/state/atomsNew';
import { useRecoilState } from 'recoil';
import { Button, Typography } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TestApiPage() {
  const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

  const [authState, setAuthState] = useRecoilState<AuthState>(authStateAtom);

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

  const handleLogin = async () => {
    const options = {
      method: 'POST',
      url: isDev
        ? 'http://localhost:6001/api/auth/login'
        : 'https://reboundapp.tv/api/auth/register',
      headers: {
        'content-type': 'application/json',
      },
      data: [
        {
          username: 'testusername1',
          password: 'testpassword1',
        },
      ],
    };
    try {
      const response = await axios.request(options);
      if (response.data.user) {
        login(response);
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (
    username: string,
    password: string,
    displayname: string,
    email: string,
    interests: string[]
  ) => {
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
          displayname,
          username,
          email,
          password,
          interests,
        },
      ],
    };
    try {
      const response = await axios.request(options);
      if (response.data.user) {
        login(response);
      }
      return;
    } catch (error: AxiosError | unknown) {
      if (error instanceof AxiosError && error.response?.data.error) {
        console.error(error.response.data.error);
      } else {
        console.error(error);
      }
    }
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
              <Box component="ul" sx={{ pl: 2 }}>
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
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Value 1</li>
                <li>Value 2</li>
                <li>Value 3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item sx={{ height: '100%' }}>
              <Box
                id="category-c"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                State: 3
              </Box>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>Value 1</li>
                <li>Value 2</li>
                <li>Value 3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item sx={{ height: '100%' }}>
              <Box
                id="category-d"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                State: 4
              </Box>
              <Box component="ul" sx={{ pl: 2 }}>
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
                  if (!authState.isAuthenticated) {
                    handleLogin();
                  } else {
                    handleLogout();
                  }
                }}
              >
                {!authState.isAuthenticated ? 'Login' : 'Logout'}
              </Button>
            </Grid>
            {!authState.isAuthenticated && (
              <Grid>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleRegister(
                      'testusername1',
                      'testpassword1',
                      'testdisplayname1',
                      'email@email.email',
                      ['testinterest1', 'testinterest2']
                    );
                  }}
                >
                  Register
                </Button>
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

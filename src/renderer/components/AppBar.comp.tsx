import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { AuthState, authStateAtom } from 'renderer/state/atomsNew';
import { useRecoilState } from 'recoil';
import iconImage from '../../../assets/icon.png';

function AppBarCustom() {
  const [authState, setAuthState] = useRecoilState<AuthState>(authStateAtom);

  const noAuthSettings = ['Login', 'Register'];
  const yesAuthSettings = ['Profile', 'Settings', 'Accounts', 'Logout'];
  const settings = authState.isAuthenticated ? yesAuthSettings : noAuthSettings;

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (newHref: string | null) => {
    if (newHref) {
      navigate(newHref);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    if (setting === 'Login') {
      navigate('/login');
    } else if (setting === 'Register') {
      navigate('/register');
    } else if (setting === 'Logout') {
      setAuthState({ isAuthenticated: false });
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
          <img src={iconImage} alt="icon" width="40" />
        </IconButton>
        <Tooltip title={authState.isAuthenticated ? 'Home' : 'Landing Page'}>
          <Typography
            variant="h6"
            noWrap
            component={Button}
            onClick={() =>
              authState.isAuthenticated ? navigate('/home') : navigate('/')
            }
            sx={{
              my: 2,
              mr: 2,
              display: 'block',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Rebound
          </Typography>
        </Tooltip>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={() => handleCloseNavMenu(null)}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            <MenuItem
              key="Test API"
              onClick={() => handleCloseNavMenu('/testapi')}
            >
              <Typography textAlign="center">Test API</Typography>
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Tooltip title="Admin API Testing">
            <Button
              key="Test API"
              onClick={() => handleCloseNavMenu('/testapi')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Test API
            </Button>
          </Tooltip>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
              <Avatar alt="Remy Sharp" src="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={() => handleCloseUserMenu('None')}
          >
            {settings.map((setting: string) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default AppBarCustom;

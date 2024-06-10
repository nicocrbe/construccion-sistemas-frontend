import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import LightSequenceControl from './LightSequenceControl';
import TVRemoteControl from './TVRemoteControl';
import SoundPlayer from './SoundPlayer';
import ServoControl from './ServoControl';
import Home from './Home';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, Box, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    onLogout();
    navigate('/login', { replace: true });
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button component={Link} to="/lights">
          <ListItemText primary="Control de luces" />
        </ListItem>
        <ListItem button component={Link} to="/tv">
          <ListItemText primary="Control de TV" />
        </ListItem>
        <ListItem button component={Link} to="/sounds">
          <ListItemText primary="Sonidos ambiente" />
        </ListItem>
        <ListItem button component={Link} to="/servo">
          <ListItemText primary="Control de servo" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
          {!isMobile && (
            <Box display="flex" justifyContent="center" flexGrow={1}>
              <Link to="/home" className="nav-link">Inicio</Link>
              <Link to="/lights" className="nav-link">Control de luces</Link>
              <Link to="/tv" className="nav-link">Control de TV</Link>
              <Link to="/sounds" className="nav-link">Sonidos ambiente</Link>
              <Link to="/servo" className="nav-link">Control de servo</Link>
              <button onClick={handleLogout} className="nav-link-button">
                Cerrar sesión
              </button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
      <Container className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/lights" element={<LightSequenceControl />} />
          <Route path="/tv" element={<TVRemoteControl />} />
          <Route path="/sounds" element={<SoundPlayer />} />
          <Route path="/servo" element={<ServoControl />} />
        </Routes>
      </Container>
    </>
  );
}

export default Dashboard;

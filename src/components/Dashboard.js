import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import LightSequenceControl from './LightSequenceControl';
import TVRemoteControl from './TVRemoteControl';
import SoundPlayer from './SoundPlayer';
import ServoControl from './ServoControl';
import Home from './Home';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();  // Utilizamos el hook aquí correctamente

  const handleLogout = () => {
    onLogout();  // Llamada a la función de logout que maneja el estado
    navigate('/login', { replace: true });  // Navegación segura hacia Login
  };

  return (
    <div className="dashboard">
      <nav className="nav-bar">
        <Link to="/home">Inicio</Link>
        <Link to="/lights">Control de luces</Link>
        <Link to="/tv">Control de TV</Link>
        <Link to="/sounds">Sonidos ambiente</Link>
        <Link to="/servo">Control de servo</Link>
        <button onClick={handleLogout} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>
          Cerrar sesión
        </button>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/lights" element={<LightSequenceControl />} />
          <Route path="/tv" element={<TVRemoteControl />} />
          <Route path="/sounds" element={<SoundPlayer />} />
          <Route path="/servo" element={<ServoControl />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useState } from 'react';
import { Button, TextField, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import httpClient from '../httpClient';
import '../Login.css'; // Importa los estilos futuristas personalizados

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Usar useNavigate

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await httpClient.post('/login', { username, password });

      if (response.status === 200 && response.data.message === 'success' && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        onLogin();
        navigate('/home');  // Redirigir a /home después de un login exitoso
      } else {
        setError('Credenciales inválidas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.log(error);
      setError('Error al iniciar sesión. Verifica tu conexión.');
    }
  };

  return (
    <div className="login-container">
      <Typography variant="h5" color="primary" sx={{ marginBottom: 2 }}>
        Inicio de sesión
      </Typography>
      <form onSubmit={handleLogin}>
        <Stack spacing={2}>
          <TextField
            label="Nombre de usuario"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            className="text-field"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            className="text-field"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" className="login-button">
            Iniciar Sesión
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Login;

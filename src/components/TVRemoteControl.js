import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Stack } from '@mui/material';
import axios from 'axios';

function TVControl() {
  // Estado inicial con configuración para la TV
  const [tvSettings, setTvSettings] = useState({
    powerInterval: 1,
    repeatInterval: 1 // Tiempo en minutos para encender la TV
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTvSettings({
      ...tvSettings,
      [name]: value
    });
  };

  const handleSubmit = () => {

    axios.defaults.baseURL = 'http://192.168.85.175:80';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // Envía la configuración al backend
    axios.post('/controlar-tv', tvSettings)
      .then(response => {
        // Manejar respuesta
      })
      .catch(error => {
        // Manejar error
      });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#c9a68a', maxWidth: '100%', margin: 'auto' }}>
      <Typography variant="h5" color="primary" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Configuración de TV
      </Typography>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Intervalo de encendido en minutos"
          variant="outlined"
          name="powerInterval"
          type="number"
          value={tvSettings.powerInterval}
          onChange={handleInputChange}
          sx={{ input: { color: 'white' } }}
        />
        <TextField
          label="Intervalo de repeticion en minutos"
          variant="outlined"
          name="repeatInterval"
          type="number"
          value={tvSettings.repeatInterval}
          onChange={handleInputChange}
          sx={{ input: { color: 'white' } }}
        />
        <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
          Enviar configuración
        </Button>
      </Stack>
    </Paper>
  );
}

export default TVControl;

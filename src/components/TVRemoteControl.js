import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Stack } from '@mui/material';
import axios from 'axios';

function TVControl() {
  // Estado inicial con configuración para la TV
  const [tvSettings, setTvSettings] = useState({
    powerInterval: 60, // Tiempo en minutos para encender la TV
    channelChangeInterval: 15, // Tiempo en minutos para cambio de canal
    volumeChangeInterval: 30, // Tiempo en minutos para cambio de volumen
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTvSettings({
      ...tvSettings,
      [name]: value
    });
  };

  const handleSubmit = () => {

    axios.defaults.baseURL = 'http://192.168.0.133:80';
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
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#333', maxWidth: '100%', margin: 'auto' }}>
      <Typography variant="h5" color="primary" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Configuración de TV
      </Typography>
      <Stack direction="column" spacing={2}>
        <TextField
          label="Intervalo de Encendido (min)"
          variant="outlined"
          name="powerInterval"
          type="number"
          value={tvSettings.powerInterval}
          onChange={handleInputChange}
          sx={{ input: { color: 'white' } }}
        />
        <TextField
          label="Intervalo de Cambio de Canal (min)"
          variant="outlined"
          name="channelChangeInterval"
          type="number"
          value={tvSettings.channelChangeInterval}
          onChange={handleInputChange}
          sx={{ input: { color: 'white' } }}
        />
        <TextField
          label="Intervalo de Cambio de Volumen (min)"
          variant="outlined"
          name="volumeChangeInterval"
          type="number"
          value={tvSettings.volumeChangeInterval}
          onChange={handleInputChange}
          sx={{ input: { color: 'white' } }}
        />
        <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
          Guardar configuración
        </Button>
      </Stack>
    </Paper>
  );
}

export default TVControl;

import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, Stack } from '@mui/material';
import httpClient from '../httpClient';

function TVRemoteControl() {
  const [tvSettings, setTvSettings] = useState({
    powerInterval: 1,
    repeatInterval: 1
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTvSettings({
      ...tvSettings,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await httpClient.post('/controlar-tv', tvSettings);
      // Manejar respuesta
    } catch (error) {
      console.error('Error al enviar configuración de TV', error);
    }
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
          sx={{ input: { color: 'black' } }}
        />
        <TextField
          label="Intervalo de repetición en minutos"
          variant="outlined"
          name="repeatInterval"
          type="number"
          value={tvSettings.repeatInterval}
          onChange={handleInputChange}
          sx={{ input: { color: 'black' } }}
        />
        <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
          Enviar configuración
        </Button>
      </Stack>
    </Paper>
  );
}

export default TVRemoteControl;

import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import httpClient from '../httpClient';

function SoundPlayer() {
  const [soundConfig, setSoundConfig] = useState({
    sound: '',
    interval: ''
  });
  
  const handleSoundConfigChange = (event) => {
    setSoundConfig({ ...soundConfig, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      await httpClient.post('/sounds/settings', soundConfig);
      // Manejar respuesta
    } catch (error) {
      console.error('Error al enviar configuración de sonidos', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: '2rem', backgroundColor: '#c9a68a' }}>
      <Typography variant="h5" color="primary" sx={{ textAlign: 'center' }}>
        Reproductor de sonidos
      </Typography>
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel id="sound-select-label">Selecciona un sonido</InputLabel>
        <Select
          labelId="sound-select-label"
          id="sound-select"
          value={soundConfig.sound}
          onChange={handleSoundConfigChange}
          name="sound"
        >
          <MenuItem value="Ladridos">Ladridos de perros</MenuItem>
          <MenuItem value="Conversaciones">Conversaciones</MenuItem>
          <MenuItem value="Lavarropas">Lavarropas</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="number"
        label="Intervalo (min)"
        name="interval"
        value={soundConfig.interval}
        onChange={handleSoundConfigChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ mt: 2, width: '100%' }}>
        Enviar configuración
      </Button>
    </Paper>
  );
}

export default SoundPlayer;

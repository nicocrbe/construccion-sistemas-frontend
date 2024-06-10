import React, { useState } from 'react';
import { Button, Paper, Typography, Stack, TextField } from '@mui/material';
import httpClient from '../httpClient';

function ServoControl() {
  const [duration, setDuration] = useState(1);
  const [repeatInterval, setRepeatInterval] = useState(1);

  const handleSetMovement = async () => {
    try {
      await httpClient.post('/controlar-servo', { duration, repeatInterval });
      // Manejar respuesta
    } catch (error) {
      console.error('Error al enviar movimiento del servo', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: '20px', margin: '20px', backgroundColor: '#c9a68a' }}>
      <Typography variant="h5" gutterBottom color="primary">
        Control de servo
      </Typography>
      <Stack direction="column" spacing={2} alignItems="center">
        <TextField
          label="Duración del recorrido en minutos"
          variant="outlined"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          type="number"
          sx={{ input: { color: 'black' }, width: '80%' }}
        />
        <TextField
          label="Intervalo de repetición en minutos"
          variant="outlined"
          value={repeatInterval}
          onChange={(e) => setRepeatInterval(Number(e.target.value))}
          type="number"
          sx={{ input: { color: 'black' }, width: '80%' }}
        />
        <Button variant="contained" color="secondary" onClick={handleSetMovement}>
          Establecer movimiento
        </Button>
      </Stack>
    </Paper>
  );
}

export default ServoControl;

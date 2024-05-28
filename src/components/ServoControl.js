import React, { useState } from 'react';
import axios from 'axios';
import { Button, Paper, Typography, Stack, TextField } from '@mui/material';

function ServoControl() {
  const [duration, setDuration] = useState(1); // Duración del movimiento en minutos
  const [repeatInterval, setRepeatInterval] = useState(1);


  const handleSetMovement = () => {
    console.log('Movimiento del servo',duration);

    axios.defaults.baseURL = 'http://192.168.85.175:80';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    axios.post('/controlar-servo', {duration,repeatInterval})
    .then(response => {
      // Manejar respuesta
    })
    .catch(error => {
      console.log('Error al enviar movimiento del servo', error)
    });
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
          sx={{ input: { color: 'white' }, width: '80%' }}
        />
        <TextField
          label="Intervalo de repeticion en minutos"
          variant="outlined"
          value={repeatInterval}
          onChange={(e) => setRepeatInterval(Number(e.target.value))}
          type="number"
          sx={{ input: { color: 'white' }, width: '80%' }}
        />
        <Button variant="contained" color="secondary" onClick={handleSetMovement}>
          Establecer movimiento
        </Button>
      </Stack>
    </Paper>
  );
}

export default ServoControl;
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Slider, Paper, Typography, Stack, TextField } from '@mui/material';

function ServoControl() {
  const [initialPosition, setInitalPosition] = useState(0);
  const [finalPosition, setFinalPosition] = useState(180); // Array con posición inicial y final
  // Array con posición inicial y final
  const [duration, setDuration] = useState(100); // Duración del movimiento en minutos

  const handleChangePosition = (event, newValue) => {
    console.log('Posición del servo', newValue);
    setInitalPosition(newValue[0]);
    setFinalPosition(newValue[1]);
  };

  const handleSetMovement = () => {
    console.log('Movimiento del servo', initialPosition, finalPosition, duration);

    axios.defaults.baseURL = 'http://192.168.0.133:80';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    axios.post('/controlar-servo', { initialPosition,finalPosition,duration })
    .then(response => {
      // Manejar respuesta
    })
    .catch(error => {
      console.log('Error al enviar movimiento del servo', error)
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: '20px', margin: '20px', backgroundColor: '#424242' }}>
      <Typography variant="h5" gutterBottom color="primary">
        Control de servo
      </Typography>
      <Stack direction="column" spacing={2} alignItems="center">
        <Typography gutterBottom>
          Ajustar recorrido del servo
        </Typography>
        <Slider
          value={[initialPosition, finalPosition]}
          onChange={handleChangePosition}
          valueLabelDisplay="auto"
          min={0}
          max={180}
          sx={{ width: '80%', color: 'secondary.main' }}
        />
        <TextField
          label="Duración del recorrido en minutos"
          variant="outlined"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
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
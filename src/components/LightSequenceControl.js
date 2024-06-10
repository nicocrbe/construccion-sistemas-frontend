import React, { useState } from 'react';
import { Button, TextField, InputAdornment, Paper, Typography, Stack, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import httpClient from '../httpClient';

function LightSequenceControl() {
  const [lights, setLights] = useState([
    { id: 'living', name: 'Living', duration: 1, order: 1 },
    { id: 'cocina', name: 'Cocina', duration: 1, order: 2 },
  ]);
  const [repeatInterval, setRepeatInterval] = useState(1);

  const handleDurationChange = (index) => (event) => {
    const newLights = [...lights];
    newLights[index].duration = Number(event.target.value);
    setLights(newLights);
  };

  const handleOrderChange = (index) => (event) => {
    const newOrder = Number(event.target.value);
    const newLights = lights.map((light, i) => {
      if (i === index) {
        return { ...light, order: newOrder };
      }
      if (light.order === newOrder) {
        return { ...light, order: light.order + 1 };
      }
      return light;
    });
    setLights(newLights.sort((a, b) => a.order - b.order));
  };

  const handleSubmit = async() => {
    const lightConfig = lights.map(({ id, duration, order }) => ({ id, duration, order }));
    try {
      await httpClient.post('/controlar-luces', { lightConfig, repeatInterval });
      // Manejar la respuesta
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper elevation={3} className="light-sequence-control" sx={{ padding: 2, backgroundColor: '#c9a68a',width: "auto" }}>
      <Typography variant="h5" color="primary" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Control de secuencia de luces
      </Typography>
      {lights.map((light, index) => (
        <Box key={light.id} sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
          <Typography variant="h6">{light.name}</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel id={`${light.id}-label`}>Orden</InputLabel>
              <Select
                labelId={`${light.id}-label`}
                id={`${light.id}-order`}
                value={light.order}
                onChange={handleOrderChange(index)}
                sx={{ color: 'black' }}
              >
                {lights.map((_, i) => (
                  <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              type="number"
              variant="outlined"
              value={light.duration}
              onChange={handleDurationChange(index)}
              InputProps={{
                endAdornment: <InputAdornment position="end">minutos</InputAdornment>,
                sx: { color: 'black', width: '120px', height: '55px'}
              }}
              sx={{ '& .MuiInputBase-input': { color: 'black' } }}
            />
          </Stack>
        </Box>
      ))}
      <TextField
        label="Intervalo de repetición en minutos"
        variant="outlined"
        value={repeatInterval}
        onChange={(e) => setRepeatInterval(Number(e.target.value))}
        type="number"
        sx={{ input: { color: 'black' }, width: '100%', marginBottom: 2 }}
      />
      <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ width: '100%' }}>
        Enviar Configuración
      </Button>
    </Paper>
  );
}

export default LightSequenceControl;

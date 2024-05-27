import React, { useState } from 'react';
import { Button, TextField, InputAdornment, Paper, Typography, Stack, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import axios from 'axios';

function LightSequenceControl() {
  // Inicializa los estados de las luces con un id, nombre, duración y orden
  const [lights, setLights] = useState([
    { id: 'living', name: 'Living', duration: 1, order: 1, isOn: false},
    { id: 'cocina', name: 'Cocina', duration: 1, order: 2, isOn: false },
  ]);
  const [repeatInterval, setRepeatInterval] = useState(1);

  const handleTurnOn = (id) => {
    console.log(`Encendiendo la luz ${id}`);
    // axios.post('/api/lights/on', { id }) ...
  };

  const handleTurnOff = (id) => {
    console.log(`Apagando la luz ${id}`);
    // axios.post('/api/lights/off', { id }) ...
  };

  const handleToggleLight = (index) => {
    const newLights = [...lights];
    newLights[index].isOn = !newLights[index].isOn;
    setLights(newLights);
    if (newLights[index].isOn) {
      handleTurnOn(newLights[index].id);
    } else {
      handleTurnOff(newLights[index].id);
    }
  };

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
    // Prepara la configuración de las luces para enviar al backend
    setRepeatInterval(10)
    const lightConfig = lights.map(({ id, duration, order }) => ({ id, duration, order }));
    //set url base axios
    axios.defaults.baseURL = 'http://192.168.85.175:80';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // Envía la configuración al backend
    await axios.post('/controlar-luces', {lightConfig,repeatInterval })
      .then(response => {
        // Manejar la respuesta
      })
      .catch(error => {
        console.log(error)
      });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#333' }}>
      <Typography variant="h5" color="primary" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Control de secuencia de luces
      </Typography>
      {lights.map((light, index) => (
        <Stack key={light.id} direction="row" alignItems="center" spacing={2} sx={{ marginBottom: 2 }}>
          <FormControl variant="filled" sx={{ minWidth: 120 }}>
            <InputLabel id={`${light.id}-label`}>Orden</InputLabel>
            <Select
              labelId={`${light.id}-label`}
              id={`${light.id}-order`}
              value={light.order}
              onChange={handleOrderChange(index)}
            >
              {lights.map((_, i) => (
                <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography sx={{ minWidth: '100px' }}>{light.name}:</Typography>
          <TextField
            size="small"
            type="number"
            variant="outlined"
            value={light.duration}
            onChange={handleDurationChange(index)}
            InputProps={{
              endAdornment: <InputAdornment position="end">minutos</InputAdornment>,
              sx: { color: 'white', width: '150px' }
            }}
          />
          <Button 
              variant="contained"
              startIcon={<PowerSettingsNewIcon />}
              onClick={() => handleToggleLight(index)}
              sx={{
                backgroundColor: light.isOn ? 'green' : 'red',
                color: 'white',
                '&:hover': {
                  backgroundColor: light.isOn ? 'lightgreen' : 'darkred',
                },
                width: 120 
              }}
            >
              {light.isOn ? 'Encendido' : 'Apagado'}
            </Button>
        </Stack>
      ))}
      <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ width: '100%', marginTop: 2 }}>
        Enviar Configuración
      </Button>
    </Paper>
  );
}

export default LightSequenceControl;

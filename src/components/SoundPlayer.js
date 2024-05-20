import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function SoundPlayer() {
  const [soundList, setSoundList] = useState([]);
  const [soundConfig, setSoundConfig] = useState({
    sound: '',
    interval: '',
    startTime: '',
    endTime: '',
  });
  
  const handleSoundConfigChange = (event) => {
    setSoundConfig({ ...soundConfig, [event.target.name]: event.target.value });
  };

  const handleAddSound = () => {
    if (soundConfig.sound && soundConfig.interval && soundConfig.startTime && soundConfig.endTime) {
      setSoundList([...soundList, { ...soundConfig }]);
      setSoundConfig({ sound: '', interval: '', startTime: '', endTime: '' }); // Reset form after adding
    }
  };

  const handleRemoveSound = (index) => {
    setSoundList(soundList.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('sounds', JSON.stringify(soundList));
    axios.post('/api/sounds/settings', formData)
      .then(response => {
        // Handle response
      })
      .catch(error => {
        // Handle error
      });
  };

  return (
    <Paper elevation={3} sx={{ padding: '2rem', backgroundColor: '#333' }}>
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
          <MenuItem value="dog-barks">Ladridos de perros</MenuItem>
          <MenuItem value="conversations">Conversaciones</MenuItem>
          {/* Add more sounds as needed */}
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
      <TextField
        type="time"
        label="Hora de Inicio"
        name="startTime"
        InputLabelProps={{ shrink: true }}
        value={soundConfig.startTime}
        onChange={handleSoundConfigChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        type="time"
        label="Hora de Fin"
        name="endTime"
        InputLabelProps={{ shrink: true }}
        value={soundConfig.endTime}
        onChange={handleSoundConfigChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleAddSound} sx={{ mb: 2 }}>
        Añadir a la lista
      </Button>
      <List>
        {soundList.map((sound, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" onClick={() => handleRemoveSound(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`${sound.value} cada ${sound.interval} minutos desde ${sound.startTime} hasta ${sound.endTime}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ mt: 2, width: '100%' }}>
        Enviar configuración
      </Button>
    </Paper>
  );
}

export default SoundPlayer;


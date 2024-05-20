import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TvIcon from '@mui/icons-material/Tv';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';

function Home() {
  const [moduleStatus, setModuleStatus] = useState({
    lights: { loading: true, data: null },
    tv: { loading: true, data: null },
    sounds: { loading: true, data: null },
    servo: { loading: true, data: null }
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const [lightsResponse, tvResponse, soundsResponse, servoResponse] = await Promise.all([
          axios.get('/api/lights/status'),
          axios.get('/api/tv/status'),
          axios.get('/api/sounds/status'),
          axios.get('/api/servo/status')
        ]);

        setModuleStatus({
          lights: { loading: false, data: lightsResponse.data, error: null },
          tv: { loading: false, data: tvResponse.data, error: null },
          sounds: { loading: false, data: soundsResponse.data, error: null },
          servo: { loading: false, data: servoResponse.data, error: null }
        });
      } catch (error) {
        console.error('Error fetching module status:', error);
        setModuleStatus(prevStatus => ({
          ...prevStatus,
          lights: { ...prevStatus.lights, loading: false, error },
          tv: { ...prevStatus.tv, loading: false, error },
          sounds: { ...prevStatus.sounds, loading: false, error },
          servo: { ...prevStatus.servo, loading: false, error }
        }));
      }
    };

    fetchStatus();
  }, []);

  const renderCardContent = (moduleKey, IconComponent, moduleName) => {
    const module = moduleStatus[moduleKey];
    
    return (
      <CardContent>
        <IconComponent sx={{ fontSize: 40 }} />
        <Typography variant="h5">{moduleName}</Typography>
        {module.loading ? <CircularProgress /> : <Typography variant="body2">{module.data}</Typography>}
      </CardContent>
    );
  };

  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card raised sx={{ backgroundColor: '#424242' }}>
          {renderCardContent('lights', LightbulbIcon, 'Luces')}
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card raised sx={{ backgroundColor: '#424242' }}>
          {renderCardContent('tv', TvIcon, 'Televisión')}
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card raised sx={{ backgroundColor: '#424242' }}>
          {renderCardContent('sounds', MusicNoteIcon, 'Sonidos')}
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card raised sx={{ backgroundColor: '#424242' }}>
          {renderCardContent('servo', SettingsInputAntennaIcon, 'Servo')}
        </Card>
      </Grid>
    </Grid>
  );
}

export default Home;

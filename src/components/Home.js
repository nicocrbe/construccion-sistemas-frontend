import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Button, Box } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import httpClient from '../httpClient';

function Home() {
  const [moduleStatus, setModuleStatus] = useState({
    lights: { loading: true, data: null },
    servo: { loading: true, data: null }
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const [lightsResponse,servoResponse] = await Promise.all([
          httpClient.get('/lights/status'),
          httpClient.get('/servo/status')
        ]);

        setModuleStatus({
          lights: { loading: false, data: lightsResponse?.data?.status },
          servo: { loading: false, data: servoResponse?.data?.status }
        });
      } catch (error) {
        console.error('Error fetching module status:', error);
        setModuleStatus(prevStatus => ({
          ...prevStatus,
          lights: { ...prevStatus.lights, loading: false, error },
          servo: { ...prevStatus.servo, loading: false, error }
        }));
      }
    };

    fetchStatus();
  }, []);

  const handleResetAllDevices = async () => {
    try {
      const response = await httpClient.post('/reset');
      console.log('Todos los dispositivos han sido apagados:', response.data);
    } catch (error) {
      console.error('Error al resetear dispositivos:', error);
    }
  };

  const renderCardContent = (moduleKey, IconComponent, moduleName) => {
    const module = moduleStatus[moduleKey];
    const statusText = module?.data === 'ENCENDIDO' ? 'Encendido' : 'Apagado';
    const statusColor = module?.data === 'ENCENDIDO' ? 'green' : 'red';

    return (
      <CardContent>
        <IconComponent sx={{ fontSize: 40 }} />
        <Typography variant="h5">{moduleName}</Typography>
        {module.loading ? <CircularProgress /> : (
          <Typography variant="body2" sx={{ color: statusColor }}>
            {statusText}
          </Typography>
        )}
      </CardContent>
    );
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
      <Grid container spacing={2} sx={{ maxWidth: 1200, justifyContent: 'center' }}>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card raised sx={{ backgroundColor: '#424242', width: '100%', maxWidth: 300 }}>
            {renderCardContent('lights', LightbulbIcon, 'Luces')}
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card raised sx={{ backgroundColor: '#424242', width: '100%', maxWidth: 300 }}>
            {renderCardContent('servo', SettingsInputAntennaIcon, 'Servo')}
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', maxWidth: 1200, marginTop: 2 }}>
        <Button
          onClick={handleResetAllDevices}
          variant="contained"
          color="error"
          size="large"
          sx={{ fontSize: '1.2rem', width: '100%' }}
        >
          Apagar todos los dispositivos
        </Button>
      </Box>
    </Box>
  );
}

export default Home;

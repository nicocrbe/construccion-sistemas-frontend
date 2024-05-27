import React, { useEffect, useState, useCallback } from 'react';
import emailjs from 'emailjs-com';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import axios from 'axios';

function ConnectionChecker() {
  const [open, setOpen] = useState(false);

  const checkBackendConnection = useCallback(async () => {
    try {
      axios.defaults.baseURL = 'http://192.168.85.175:80';
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      const response = await axios.get('/health'); 
      if (response.status !== 200) {
        throw new Error('Health check failed');
      }
    } catch (error) {
      console.error('Connection error:', error);
      setOpen(true);
      sendEmail();
    }
  }, []);  // Añade aquí las dependencias si alguna variable externa es usada dentro de la función

  useEffect(() => {
    const interval = setInterval(() => {
      checkBackendConnection();
    }, 99999999); // 300000 ms = 5 minutos

    return () => clearInterval(interval); // Limpiar el intervalo
  }, [checkBackendConnection]);  // Dependencia necesaria para evitar el warning de React

  const handleClose = () => {
    setOpen(false);
  };

  const sendEmail = () => {
    const templateParams = {
      to_email: 'nicolas.crbe@gmail.com',
    };

    emailjs.send('service_o7sq8a4', 'template_e0peuzr', templateParams, 'ZXx0GC359CFM3g09j')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.error('FAILED...', err);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Error de Conexión"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Se ha perdido la conexión con tu dispositivo controlador. Por favor, revisa la conexión.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConnectionChecker;

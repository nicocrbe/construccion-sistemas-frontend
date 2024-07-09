import React, { useEffect, useState, useCallback } from 'react';
import emailjs from 'emailjs-com';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import httpClient from '../httpClient';

function ConnectionChecker() {
  const [open, setOpen] = useState(false);

  const checkBackendConnection = useCallback(async () => {
    try {
      const response = await httpClient.get('/health');
      if (response.status !== 200) {
        throw new Error('Health check failed');
      }
    } catch (error) {
      console.error('Connection error:', error);
      setOpen(true);
      sendEmail();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkBackendConnection();
    }, process.env.TIME_TO_MAIL); // 300000 ms = 5 minutos

    return () => clearInterval(interval); // Limpiar el intervalo
  }, [checkBackendConnection]);

  const handleClose = () => {
    setOpen(false);
  };

  const sendEmail = () => {
    const templateParams = {
      to_email: process.env.REACT_APP_EMAIL_TO,
    };

    emailjs.send(
      process.env.REACT_APP_EMAIL_SERVICE_ID,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAIL_USER_ID
    ).then((response) => {
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

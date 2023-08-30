import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import { login } from '../actions/authActions';
import { useDispatch } from 'react-redux';
const ContainerStyled = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const PaperStyled = styled(Paper)({
  padding: 50,
  width: 300,
});

const FormStyled = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

const TypographyCentered = styled(Typography)({
  textAlign: 'center',
});

const ButtonStyled = styled(Button)({
  marginTop: (theme) => theme.spacing(4),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      dispatch(login())
      navigate('/todo-list');
    } else {
      setError('Credenciales inválidas'); 
    }
    
  };

  return (
    <ContainerStyled>
      <PaperStyled elevation={3}>
        <TypographyCentered variant="h5" gutterBottom>
          Login
        </TypographyCentered>
        <FormStyled>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ButtonStyled
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </ButtonStyled>
          {error? <p style={{color:'red'}}>Credenciales invalidas</p> : <></>}
        </FormStyled>
      </PaperStyled>
    </ContainerStyled>
  );
};

export default Login;

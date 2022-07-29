import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { login,clearErrorMessage } from "../redux/features/login";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import { FormControl, TextField, Button, Alert } from '@mui/material';
import '../styles/login.scss';

function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.login.errorMessage);
  const loading = useSelector((state) => state.login.loading);
  const authorizedStatus = useSelector((state) => state.login.authorizedStatus);

  useEffect(() => {
    //set application to logout state before login
    localStorage.setItem('loggedIn', 0);
    dispatch(clearErrorMessage);
  }, []);

  useEffect(() => {
    authorizedStatus == true && history('/todos');
  }, [authorizedStatus]);

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    //set input values to state
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: state.username,
      password: state.password,
    }

    dispatch(login(data));
  }

  return (
    <div>
      {/* start of login page header */}
      <Header navBartitle="Login" mainTitle="Marketing Campaign" isVisibleMenuIcon={false} />
      {/* end of login page header */}

      {/* start of login form */}
      <div className='container'>
        <div className='form-container' onSubmit={handleSubmit}>
          <form>
            <h2>Login</h2>
            <FormControl className='form-control'>
              <TextField
                required
                id="outlined-required"
                name="username"
                label="username"
                placeholder='username'
                value={state.username}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl className='form-control'>
              <TextField
                required
                type="password"
                id="outlined-required"
                name="password"
                label="password"
                placeholder='password'
                value={state.password}
                onChange={handleChange}
              />

            </FormControl>

            <FormControl className='form-control'>
              {errorMessage &&
                <Alert severity="error">{errorMessage}</Alert>}
            </FormControl>

            <Button type='submit' loading={loading} className='btn-submit' variant="contained">Login</Button>
          </form>
        </div>

      </div>
      {/* end of login form */}

    </div>

  );
}

export default Login;
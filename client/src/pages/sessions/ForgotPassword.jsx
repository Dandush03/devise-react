/* eslint-disable camelcase */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar, Button,
  Container, CssBaseline,
  TextField, Typography, Grid, Link,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { getSignInCredentials, resetPassword } from '../../actions/sessions/login';
import loginTheme from './loginTheme';

const ForgotPassword = ({ history }) => {
  const user = useSelector((state) => state.user);
  const csrfFields = useSelector((state) => state.csrfFields);
  const [redirect, setRedirect] = useState();
  const dispatch = useDispatch();

  const {
    handleSubmit, errors, control,
  } = useForm({
    defaultValues: {
      authenticity_token: csrfFields.authToken,
    },
  });

  const classes = loginTheme();
  const form = useRef(null);
  const [messages, setMessages] = useState();
  const errorsMsg = errors.api_auth_user ? errors
    : { api_auth_user: { email: null, password: null } };
  const { api_auth_user: { email: emailError } } = errorsMsg;

  const onSubmit = () => {
    setMessages(null);
    resetPassword(form, setMessages);
  };

  useEffect(() => {
    dispatch(getSignInCredentials());
  }, []);

  useEffect(() => {
    if (redirect && user.logged) {
      if (history.length > 1) history.goBack();
      if (history.length <= 1) history.replace('/');
    } else if (user.logged) {
      dispatch(getSignInCredentials());
      setRedirect(true);
    }
  }, [user.logged, redirect]);

  const { resource_name, authToken } = csrfFields;

  if (!resource_name || !authToken) return null;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot your password?
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} ref={form} className={classes.form}>
          { messages ? <Alert severity="error">{messages.message}</Alert> : null}

          <Controller
            name="authenticity_token"
            as={(
              <TextField
                type="hidden"
              />
          )}
            control={control}
            rules={
            {
              required: 'Field is Required',
            }
          }
          />

          <Controller
            name={`${csrfFields.resource_name}[email]`}
            as={(
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!emailError}
                helperText={emailError ? emailError.message : null}
              />
          )}
            control={control}
            defaultValue=""
            rules={
            {
              required: 'Field is Required',
            }
          }
          />

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/sign_in" variant="body2">
                Log In
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                Sign Up
              </Link>
            </Grid>
          </Grid>
          <Grid item>
            <Link href="/" variant="body2" className={classes.instruction}>
              Didn&apos;t receive unlock instructions?
            </Link>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

ForgotPassword.propTypes = {
  history: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
};

export default ForgotPassword;

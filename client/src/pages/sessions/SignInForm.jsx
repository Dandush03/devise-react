import React, { useRef, useState } from 'react';
import {
  Avatar,
  Button, Checkbox, Container, CssBaseline, FormControlLabel, TextField, Typography, Grid, Link,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import loginTheme from './loginTheme';

const SignInForm = ({
  postAction, tagName, authToken,
}) => {
  const {
    handleSubmit, errors, control,
  } = useForm({
    defaultValues: {
      authenticity_token: authToken,
    },
  });

  const dispatch = useDispatch();
  const classes = loginTheme();
  const form = useRef(null);
  const [errorMessage, setErrorMessage] = useState();
  const errorsMsg = errors.api_auth_user ? errors
    : { api_auth_user: { email: null, password: null } };
  const { api_auth_user: { email: emailError, password: passwordError } } = errorsMsg;

  const onSubmit = () => {
    setErrorMessage(null);
    dispatch(postAction(form, setErrorMessage));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} ref={form} className={classes.form}>
          { errorMessage ? <Alert severity="error">{errorMessage.message}</Alert> : null}

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
            name={`${tagName}[login]`}
            as={(
              <TextField
                label="Login"
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

          <Controller
            name={`${tagName}[password]`}
            as={(
              <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!passwordError}
                type="password"
                helperText={passwordError ? passwordError.message : null}
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

          <Controller
            name={`${tagName}[remember_me]`}
            as={(
              <FormControlLabel
                control={<Checkbox value color="primary" />}
                label="Remember me"
              />
          )}
            control={control}
            defaultValue
          />

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/auth/password/new" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2" className={classes.instruction}>
                Didn&apos;t receive unlock instructions?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

SignInForm.propTypes = {
  postAction: PropTypes.func.isRequired,
  tagName: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
};

export default SignInForm;

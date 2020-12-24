import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { postSignOut } from '../actions/sessions/login';

const SignOut = ({ loginPath }) => {
  const form = useRef(null);
  const csrfFields = useSelector((state) => state.csrfFields);
  const dispatch = useDispatch();

  const logOutHandler = (e) => {
    e.preventDefault();
    dispatch(postSignOut(form, loginPath));
  };

  return (
    <form onSubmit={logOutHandler} ref={form}>
      <input type="hidden" name="authenticity_token" defaultValue={csrfFields.authToken} />
      <input type="hidden" name="_method" defaultValue="delete" />
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
      >
        LogOut
      </Button>
    </form>
  );
};

SignOut.propTypes = {
  loginPath: PropTypes.func.isRequired,
};

export default SignOut;

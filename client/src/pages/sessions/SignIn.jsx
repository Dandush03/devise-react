/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getSignInCredentials, postSignInCredentials } from '../../actions/sessions/login';
import SignInForm from './SignInForm';

const SignIn = ({ history }) => {
  const user = useSelector((state) => state.user);
  const csrfFields = useSelector((state) => state.csrfFields);
  const [redirect, setRedirect] = useState();
  const dispatch = useDispatch();

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
    <>
      <SignInForm
        postAction={postSignInCredentials}
        tagName={resource_name}
        authToken={authToken}
      />
    </>
  );
};

SignIn.propTypes = {
  history: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
};

export default SignIn;

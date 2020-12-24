import { USER_LOGIN_SUCCESSFUL, USER_LOGIN_FIELDS, USER_LOGOUT_SUCCESSFUL } from '../actionsType';

const userLoggedSuccesfuly = (json) => (
  {
    type: USER_LOGIN_SUCCESSFUL,
    payload: json,
  }
);

const userLogOutSuccesfuly = (json) => (
  {
    type: USER_LOGOUT_SUCCESSFUL,
    payload: json,
  }
);

const userFilds = (json) => (
  {
    type: USER_LOGIN_FIELDS,
    payload: json,
  }
);

const getSignInCredentials = () => {
  const url = '/api/auth/users/sign_in';
  const config = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  };

  return (dispatch) => {
    fetch(url, config)
      .then(async (response) => {
        const json = await response.json();
        return { response, json };
      })
      .then(({ response, json }) => {
        if (response.status === 202) {
          dispatch(userFilds(json.csrf));
          return dispatch(userLoggedSuccesfuly(json.user));
        }
        return dispatch(userFilds(json));
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };
};

const postSignInCredentials = (params, errorMessage) => {
  const form = new FormData(params.current);
  const url = '/api/auth/users/sign_in';
  const config = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    body: form,
  };

  return (dispatch) => {
    fetch(url, config)
      .then(async (response) => {
        const json = await response.json();
        return { response, json };
      })
    // eslint-disable-next-line no-console
      .then(({ response, json }) => {
        const { status } = response;
        if (status > 203) return errorMessage(json[0] || json);
        return dispatch(userLoggedSuccesfuly(json));
      })
    // eslint-disable-next-line no-console
      .catch(() => console.log('test'));
  };
};

const postSignOut = (params, redirect) => {
  const form = new FormData(params.current);

  const url = '/api/auth/users/sign_out';

  const config = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
    body: form,
  };
  return ((dispatch) => {
    fetch(url, config)
      .then((response) => response)
      .then(async () => {
        await dispatch(userLogOutSuccesfuly());
        redirect('/auth/sign_in');
      })
    // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  });
};

export { getSignInCredentials, postSignInCredentials, postSignOut };

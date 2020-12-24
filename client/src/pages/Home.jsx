import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useSelector } from 'react-redux';
import SignOut from '../containers/SignOut';

const Home = ({ history }) => {
  const user = useSelector((state) => state.user);

  useEffect(async () => {
    if (!user.logged) history.push('/auth/sign_in');
  }, []);

  if (!user.logged) return null;

  const fields = Object.keys(user).map((f) => <h3 key={f}>{`${f}: ${user[f]}`}</h3>);

  return (
    <>
      <div>{fields}</div>
      <SignOut loginPath={history.push} />
    </>
  );
};

Home.propTypes = {
  history: PropTypes.objectOf(oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.func,
    PropTypes.string,
  ])).isRequired,
};

export default Home;

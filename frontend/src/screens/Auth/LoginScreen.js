import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../actions/authActions';

import classNames from 'classnames';
import { Loader, Message } from '../../components';
import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/login.jpg';
import styles from './Auth.module.css';

const LoginScreen = ({ login, isAuthenticated, disabled = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const auth = useSelector((state) => state.auth);
  const { error, loading } = auth;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  // Is the user authenticated?
  // Redirect them to the home page
  if (isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  return (
    <LayoutAuth bgImage={Background}>
      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Logowanie</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {!disabled && loading && <Loader />}
        <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
          <div className='form-group mb-3'>
            <label htmlFor='email' className='mx-2 my-2 text-muted'>
              Email
            </label>
            <input
              id='inputEmail'
              type='email'
              name='email'
              value={email}
              autoComplete='email'
              onChange={(e) => onChange(e)}
              required
              className='form-control rounded-pill border-2 shadow-sm px-4'
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='email' className='mx-2 my-2 text-muted'>
              Hasło
            </label>
            <input
              className='form-control rounded-pill border-2 shadow-sm px-4'
              id='inputPassword'
              type='password'
              name='password'
              value={password}
              autoComplete='current-password'
              onChange={(e) => onChange(e)}
              minLength={8}
              required
            />
          </div>
          <div className={styles.btnGroup}>
            <Link className={styles.link} to='/przypominanie-hasła'>
              Przypomnij hasło
            </Link>
            <button
              type='submit'
              className={classNames(
                'btnSquare btnPrimaryLight',
                styles.btnPrimaryLight
              )}
            >
              Zaloguj
            </button>
          </div>
        </form>
      </div>
      <p className={styles.p}>
        Nie masz konta?{' '}
        <Link className={styles.link} to='/rejestracja'>
          Zarejestruj się
        </Link>
      </p>
    </LayoutAuth>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(LoginScreen);

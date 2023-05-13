import { connect, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../actions/authActions';
import { object, string } from 'yup';
import { Form, Formik } from 'formik';
import classNames from 'classnames';
import { Loader, Message, TextField } from '../../components';
import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/login.jpg';
import styles from './Auth.module.css';

const LoginScreen = ({ login, isAuthenticated, disabled = false }) => {
  const validate = object({
    email: string()
      .email('To nie jest prawidłowy adres email')
      .required('Pole adres email jest obowiązkowe'),
    password: string().required('Hasło jest obowiązkowe'),
  });

  const auth = useSelector((state) => state.auth);
  let { error, loading, success } = auth;

  // Is the user authenticated?
  // Redirect them to the user panel page
  if (isAuthenticated) {
    return <Navigate replace to='/panel' />;
  }

  {
    success && <Navigate replace to='/panel' />;
  }

  return (
    <LayoutAuth bgImage={Background}>
      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Logowanie</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {!disabled && loading && <Loader />}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            const { email, password } = values;
            login(email, password);
          }}
        >
          {({ values }) => (
            <>
              <Form className={styles.form}>
                <TextField label='Email' name='email' type='email' />
                <TextField label='Hasło' name='password' type='password' />
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
              </Form>
            </>
          )}
        </Formik>
      </div>
      <p className={styles.p}>
        Nie masz konta?
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

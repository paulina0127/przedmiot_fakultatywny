import { Form, Formik } from 'formik';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { object, ref, string } from 'yup';

import classNames from 'classnames';
import { Modal } from 'react-bootstrap';
import { BsSendCheck } from 'react-icons/bs';
import { signup } from '../../actions/authActions';
import { Loader, Message, TextField } from '../../components';
import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/register.jpg';
import styles from './Auth.module.css';

const SignUpScreen = ({ signup, isAuthenticated }) => {
  const [modal, setModal] = useState(false);

  const validate = object({
    email: string()
      .email('To nie jest prawidłowy adres email')
      .required('Pole adres email jest obowiązkowe'),
    password: string()
      .min(8, 'Hasło musi zawierać co najmniej 8 znaków')
      .matches(/[0-9]/, 'Hasło musi zawierać co najmniej 1. cyfrę')
      .matches(/[A-Z]/, 'Hasło musi zawierać co najmniej 1. wielką literę ')
      .required('Hasło jest obowiązkowe'),
    re_password: string()
      .oneOf([ref('password'), null], 'Wprowadzone hasła różnią się od siebie.')
      .required('Powtórz wprowadzone hasło'),
  });

  const auth = useSelector((state) => state.auth);
  let { error, loading, success } = auth;

  if (error === 'Request failed with status code 400') {
    error = 'Istnieje już konto z podanym adresem e-mail';
  }

  if (isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  return (
    <LayoutAuth bgImage={Background}>
      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Utwórz konto</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Formik
          initialValues={{
            email: '',
            password: '',
            re_password: '',
            type: 'Pacjent',
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            const { type, email, password, re_password } = values;
            signup(type, email, password, re_password);
            setModal((prev) => !prev);
          }}
        >
          {({ values }) => (
            <>
              <Modal
                show={success && modal}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
              >
                <Modal.Header className='bg-blue text-light'>
                  <Modal.Title id='contained-modal-title-vcenter'>
                    Konto zostało utworzone <BsSendCheck />
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Sprawdź pocztę i aktywuj konto</h5>
                  <p>
                    Link aktywacyjny wysłaliśmy na adres:{' '}
                    <span className='highlight'>{values.email}</span>
                  </p>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                  <Link className='w-40' to='/logowanie'>
                    <button className='btnSquare btnPrimaryLight'>
                      Rozumiem
                    </button>
                  </Link>
                </Modal.Footer>
              </Modal>
              <Form className={styles.form}>
                <TextField label='Email' name='email' type='email' />
                <TextField label='Hasło' name='password' type='password' />
                <TextField
                  label='Potwierdź hasło'
                  name='re_password'
                  type='password'
                />
                <button
                  type='submit'
                  className={classNames(
                    'btnSquare btnPrimaryLight',
                    styles.btnPrimaryLight
                  )}
                >
                  Dalej
                </button>
              </Form>
            </>
          )}
        </Formik>
      </div>
      <p className={styles.p}>
        Masz już konto?{' '}
        <Link className={styles.link} to='/logowanie'>
          Zaloguj się
        </Link>
      </p>
    </LayoutAuth>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignUpScreen);

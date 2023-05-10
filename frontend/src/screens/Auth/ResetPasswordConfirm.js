import { Form, Formik } from 'formik';
import { connect, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { object, ref, string } from 'yup';
import { reset_password_confirm } from '../../actions/authActions';

import { Modal } from 'react-bootstrap';
import { BsPersonCheck } from 'react-icons/bs';
import { Loader, Message, TextField } from '../../components';
import LoginScreen from './LoginScreen';

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const uid = useParams().uid;
  const token = useParams().token;

  const validate = object({
    new_password: string()
      .min(8, 'Hasło musi zawierać co najmniej 8 znaków')
      .matches(/[0-9]/, 'Hasło musi zawierać co najmniej 1. cyfrę')
      .matches(/[A-Z]/, 'Hasło musi zawierać co najmniej 1. wielką literę ')
      .required('Hasło jest obowiązkowe'),
    re_new_password: string()
      .oneOf(
        [ref('new_password'), null],
        'Wprowadzone hasła różnią się od siebie.'
      )
      .required('Powtórz wprowadzone hasło'),
  });

  const auth = useSelector((state) => state.auth);
  const { error, loading, success } = auth;

  return (
    <>
      <LoginScreen disabled />
      <Modal
        show={true}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header className='bg-blue text-light'>
          <Modal.Title id='contained-modal-title-vcenter'>
            Resetuj hasło <BsPersonCheck />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Message variant='danger'>{error}</Message>}
          {success ? (
            <h5>Hasło zostało pomyślnie zmienione.</h5>
          ) : loading ? (
            <Loader />
          ) : (
            <>
              <h5>Podaj nowe hasło.</h5>
              <Formik
                initialValues={{
                  new_password: '',
                  re_new_password: '',
                }}
                validationSchema={validate}
                onSubmit={(values, { resetForm }) => {
                  const { new_password, re_new_password } = values;
                  reset_password_confirm(
                    uid,
                    token,
                    new_password,
                    re_new_password
                  );
                  resetForm({ values: '' });
                }}
              >
                {({ values }) => (
                  <Form id='form'>
                    <TextField
                      label='Hasło'
                      name='new_password'
                      type='password'
                    />
                    <TextField
                      label='Potwierdź hasło'
                      name='re_new_password'
                      type='password'
                    />
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          {success ? (
            <Link className='w-40' to='/logowanie'>
              <button className='btnSquare btnPrimaryLight'>
                Przejdź do logowania
              </button>
            </Link>
          ) : (
            <div className='btnGroup'>
              <button
                type='submit'
                form='form'
                className='btnSquare btnPrimaryLight'
              >
                Zmień hasło
              </button>
              <Link className='w-40' to='/logowanie'>
                <button className='btnSquare btnSecondary'>Anuluj</button>
              </Link>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);

import { Modal } from 'react-bootstrap';
import { BsPersonCheck } from 'react-icons/bs';
import { connect, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { verify } from '../../actions/authActions';
import { Loader, Message } from '../../components';
import LoginScreen from './LoginScreen';

const ActivateAccountScreen = ({ verify }) => {
  const uid = useParams().uid;
  const token = useParams().token;

  const auth = useSelector((state) => state.auth);
  let { error, loading, success } = auth;

  const verify_account = () => {
    verify(uid, token);
  };

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
            {success ? (
              <>
                Konto zostało aktywowane! <BsPersonCheck />
              </>
            ) : (
              <>
                Aktywacja konta <BsPersonCheck />
              </>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? (
            <h5>
              Zaloguj się na swoje konto i zacznij korzystać z naszego serwisu
            </h5>
          ) : (
            <>
              <h5>Potwierdź, aby aktywować założone konto</h5>
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />}
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
            <button
              className='btnSquare btnPrimaryLight'
              onClick={verify_account}
            >
              Aktywuję konto
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(null, { verify })(ActivateAccountScreen);
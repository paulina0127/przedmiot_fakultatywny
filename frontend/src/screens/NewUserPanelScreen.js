import { Modal } from 'react-bootstrap';
import { BsPersonCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NewUserPanelScreen = () => {
  return (
    <section className='up-section'>
      <Modal
        show={true}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header className='bg-blue text-light'>
          <Modal.Title id='contained-modal-title-vcenter'>
            Witamy na naszej stronie Healthy Care <BsPersonCheck />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Utwórz swoją kartę pacjenta by móc korzystać z naszych usług</p>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Link className='w-40' to='/profil'>
            <button className='btnSquare btnPrimary'>
              Przejdź do karty zdrowia
            </button>
          </Link>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default NewUserPanelScreen;

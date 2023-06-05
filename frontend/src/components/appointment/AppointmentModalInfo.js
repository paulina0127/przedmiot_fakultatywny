import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const AppointmentModalInfo = ({
  type,
  handleCloseModal,
  handleChangeStatus,
  userType
}) => {
  const variant = type === 'accept' ? 'success' : 'danger';
  const content = userType === "Pacjent" ? 
  'Prosimy o potwierdzenie odwołania Twojej wizyty' 
  : 'Prosimy o potwierdzenie zmiany statusu wizyty'
  return (
    <>
      <p>{content}</p>
      <hr className='text-secondary' />
      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-secondary rounded-pill fw-bold shadow-sm mx-2 px-5'
          onClick={handleCloseModal}
        >
          Wróć
        </button>
        <button
          type='button'
          className={`btn btn-${variant} rounded-pill fw-bold shadow-sm px-5`}
          onClick={() => handleChangeStatus(type)}
        >
          {type === 'accept' && userType === 'Recepcjonista' ? 'Akceptuj ' 
          : type === 'reject' && userType === 'Recepcjonista' ? 'Odrzuć ' : 'Odwołaj '}
          {type === 'accept' ? <AiOutlineCheck /> : <AiOutlineClose />}
        </button>
      </div>
    </>
  );
}

export default AppointmentModalInfo
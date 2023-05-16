import Patients from '../../components/patient/Patients';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { listPatients } from '../../actions/patientActions';
import { PATIENT_LIST_RESET } from '../../constants/patientConsts';
import { Loader, Message, Pagination } from '../../components/general';
import panel from '../../components/UserPanel.module.css';
import { useState } from 'react';

const PatientListScreen = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const patientList = useSelector((state) => state.patientList);
  const { patients, loading, count, error } = patientList;
  console.log(count);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listPatients({ page: page }));
    return () => {
      dispatch({ type: PATIENT_LIST_RESET });
    };
  }, [page]);

  const handleClickBack = () => {
    setPage(page - 1);
  };

  const handleClickForward = () => {
    setPage(page + 1);
  };

  return (
    <section className='up-section'>
      <div className='container container-bg'>
        <h2 className={panel.h2}>Pacjenci</h2>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : count === 0 ? (
          <Message variant='danger'>Brak wyników</Message>
        ) : (
          <>
            <button className='btnRound bg-blue clr-white align-self-end mx-4'>
              Filtry
            </button>
            <Patients patients={patients} />
            <Pagination
              page={page}
              pageSize={pageSize}
              count={count}
              clickBack={handleClickBack}
              clickForward={handleClickForward}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default PatientListScreen;
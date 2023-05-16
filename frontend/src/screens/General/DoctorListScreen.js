import Doctors from '../../components/doctor/Doctors';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { listDoctors } from '../../actions/doctorActions';
import { DOCTOR_LIST_RESET } from '../../constants/doctorConsts';
import { Loader, Message, Pagination } from '../../components/general';
import panel from '../../components/UserPanel.module.css';
import { useState } from 'react';

const DoctorListScreen = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading, count, error } = doctorList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDoctors({ page: page }));
    return () => {
      dispatch({ type: DOCTOR_LIST_RESET });
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
        <h2 className={panel.h2}>Lekarze</h2>
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
            <Doctors doctors={doctors} />
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

export default DoctorListScreen;

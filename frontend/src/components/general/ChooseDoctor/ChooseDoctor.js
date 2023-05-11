import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import panel from '../../UserPanel.module.css';
import DoctorInfo from '../DoctorInfo/DoctorInfo';
import { Loader, Message } from '../../../components';
import { DOCTOR_LIST_CLEAR } from '../../../constants/doctorConsts';
import { listDoctors } from '../../../actions/doctorActions';

const ChooseDoctor = () => {
  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading, length, error } = doctorList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDoctors());
    return () => {
      dispatch({ type: DOCTOR_LIST_CLEAR });
    };
  }, []);

  return (
    <div className='main-container-bg'>
      <h2 className={panel.h2}>Wybierz lekarza</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : length === 0 ? (
        <Message variant='danger'>Brak wyników</Message>
      ) : (
        <div className='d-flex flex-column align-items-normal w-100 gap-5'>
          <div className='twoColumnGrid'>
            {doctors.slice(0, 2).map((doctor) => (
              <div className='gridCenter gap-2'>
                <DoctorInfo key={doctor.id} doctor={doctor} />
                <button className='btnCircle btnPrimary'>Umów się</button>
              </div>
            ))}
          </div>
          <div className='threeColumnGrid'>
            {doctors.slice(2, 5).map((doctor) => (
              <div className='gridCenter gap-2'>
                <DoctorInfo key={doctor.id} doctor={doctor} />
                <button className='btnCircle btnPrimary'>Umów się</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseDoctor;

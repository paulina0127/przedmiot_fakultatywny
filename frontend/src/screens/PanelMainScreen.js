import { connect } from 'react-redux';
import {
  DoctorPanelScreen,
  PatientPanelScreen,
  ReceptionistPanelScreen,
  NewUserPanelScreen,
} from '.';
import { Navigate } from 'react-router-dom';

const PanelMainScreen = ({ user }) => {
  return (
    <>
      {user == null && <Navigate replace to='/' />}
      {user?.type === 'Nowy użytkownik' && <NewUserPanelScreen />}
      {user?.type === 'Pacjent' && <PatientPanelScreen />}
      {user?.type === 'Lekarz' && <DoctorPanelScreen />}
      {user?.type === 'Recepcjonista' && <ReceptionistPanelScreen />}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(PanelMainScreen);

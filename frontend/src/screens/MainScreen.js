import { connect } from "react-redux";

import {
  DoctorPanelScreen,
  HomeScreen,
  NewUserPanelScreen,
  PatientPanelScreen,
  ReceptionistPanelScreen,
} from ".";

const MainScreen = ({ user }) => {
  return (
    <>
      {user == null && <HomeScreen />}
      {user?.type === "Nowy użytkownik" && <NewUserPanelScreen />}
      {user?.type === "Pacjent" && <PatientPanelScreen />}
      {user?.type === "Lekarz" && <DoctorPanelScreen />}
      {user?.type === "Recepcjonista" && <ReceptionistPanelScreen />}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(MainScreen);

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./hocs/Layout";
import {
  ActivateAccountScreen,
  DoctorListScreen,
  DoctorScreen,
  LoginScreen,
  MainScreen,
  PatientListScreen,
  PatientScreen,
  ResetPassword,
  ResetPasswordConfirm,
  SignUpScreen,
} from "./screens";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MainScreen />} exact />
            <Route path="/logowanie" element={<LoginScreen />} />
            <Route path="/rejestracja" element={<SignUpScreen />} />
            <Route path="/przypominanie-hasła" element={<ResetPassword />} />
            <Route
              path="/resetowanie-hasła/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route
              path="/aktywacja-konta/:uid/:token"
              element={<ActivateAccountScreen />}
            />
            <Route path="/profil" element={<PatientScreen />} />
            <Route path="/rejestracja-pacjenta" element={<PatientScreen />} />
            <Route path="/lekarze" element={<DoctorListScreen />} />
            <Route path="/lekarze/:id" element={<DoctorScreen />} />
            <Route path="/pacjenci" element={<PatientListScreen />} />
            <Route path="/pacjenci/:id" element={<PatientScreen />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;

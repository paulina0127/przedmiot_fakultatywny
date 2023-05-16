import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./hocs/Layout";
import {
  ActivateAccountScreen,
  DoctorListScreen,
  LoginScreen,
  MainScreen,
  PatientListScreen,
  PatientProfileScreen,
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
            <Route path="/profil" element={<PatientProfileScreen />} />
            <Route path="/rejestracja-pacjenta" element={<PatientScreen />} />
            <Route path="/lekarze" element={<DoctorListScreen />} />
            <Route path="/pacjenci" element={<PatientListScreen />} />
            <Route path="/pacjenci/:id" element={<PatientScreen />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;

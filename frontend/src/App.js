import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./hocs/Layout";
import {
  AccountScreen,
  ActivateAccountScreen,
  AppointmentListScreen,
  AppointmentScreen,
  DoctorListScreen,
  DoctorScreen,
  LoginScreen,
  MainScreen,
  PatientListScreen,
  PatientScreen,
  ResetPassword,
  ResetPasswordConfirm,
  SignUpScreen,
  StatisticsScreen,
} from "./screens";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Auth */}
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

            {/* Profile & account */}
            <Route path="/profil" element={<PatientScreen />} />
            <Route path="/konto" element={<AccountScreen />} />

            {/* Doctors */}
            <Route path="/lekarze" element={<DoctorListScreen />} />
            <Route path="/lekarze/:id" element={<DoctorScreen />} />

            {/* Patients */}
            <Route path="/rejestracja-pacjenta" element={<PatientScreen />} />
            <Route path="/pacjenci" element={<PatientListScreen />} />
            <Route path="/pacjenci/:id" element={<PatientScreen />} />

            {/* Statistics */}
            <Route path="/statystyki" element={<StatisticsScreen />} />

            {/* Appointments */}
            <Route
              path="/nowa-wizyta"
              element={<AppointmentScreen type="create" />}
            />
            <Route
              path="/nowa-wizyta/:id"
              element={<AppointmentScreen type="create" />}
            />

            <Route
              path="/wizyty"
              element={<AppointmentListScreen name="Wizyty" />}
            />
            <Route
              path="/dzisiejsze-wizyty"
              element={
                <AppointmentListScreen name="Dzisiejsze wizyty" type="today" />
              }
            />
            <Route
              path="/zgloszone-wizyty"
              element={
                <AppointmentListScreen
                  name="Zgłoszone wizyty"
                  type="not_approved"
                />
              }
            />
            <Route
              path="/nadchodzace-wizyty"
              element={
                <AppointmentListScreen
                  name="Nadchodzące wizyty"
                  type="upcoming"
                />
              }
            />
            <Route
              path="/wizyty/:id"
              element={<AppointmentScreen type="update" />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;

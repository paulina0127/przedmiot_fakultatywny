import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './hocs/Layout';
import {
  ActivateAccountScreen,
  HomeScreen,
  LoginScreen,
  PanelMainScreen,
  // PatientFormScreen,
  ResetPassword,
  ResetPasswordConfirm,
  SignUpScreen,
  PatientProfileScreen,
} from './screens';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/logowanie' element={<LoginScreen />} />
            <Route path='/rejestracja' element={<SignUpScreen />} />
            {/* <Route
              path='/rejestracja-pacjenta'
              element={<PatientFormScreen />}
            /> */}
            <Route path='/przypominanie-hasła' element={<ResetPassword />} />
            <Route
              path='/resetowanie-hasła/:uid/:token'
              element={<ResetPasswordConfirm />}
            />
            <Route
              path='/aktywacja-konta/:uid/:token'
              element={<ActivateAccountScreen />}
            />
            <Route path='/panel' element={<PanelMainScreen />} />
            <Route path='/panel/profil' element={<PatientProfileScreen />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;

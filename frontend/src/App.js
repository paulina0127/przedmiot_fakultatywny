import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './hocs/Layout';
import {
  ActivateAccountScreen,
  LoginScreen,
  MainScreen,
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
            <Route path='/' element={<MainScreen />} exact />
            <Route path='/logowanie' element={<LoginScreen />} />
            <Route path='/rejestracja' element={<SignUpScreen />} />
            <Route path='/przypominanie-hasła' element={<ResetPassword />} />
            <Route
              path='/resetowanie-hasła/:uid/:token'
              element={<ResetPasswordConfirm />}
            />
            <Route
              path='/aktywacja-konta/:uid/:token'
              element={<ActivateAccountScreen />}
            />
            <Route path='/profil' element={<PatientProfileScreen />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;

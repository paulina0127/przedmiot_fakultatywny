import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../actions/authActions';
import { Footer, NavigationBar } from '../components';

const Layout = ({ checkAuthenticated, load_user, children }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  const location = useLocation();

  return (
    <>
      <NavigationBar />
      {children}
      {(location.pathname === '/' ||
        location.pathname === '/rejestracja-pacjenta' ||
        location.pathname.startsWith('/panel')) && <Footer />}
    </>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);

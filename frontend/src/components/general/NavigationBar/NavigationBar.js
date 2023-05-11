import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../actions/authActions';

import { IoIosArrowDropdown } from 'react-icons/io';
import avatar from '../../../images/avatar.png';
import logo from '../../../images/logo.png';
import styles from './NavigationBar.module.css';

const NavigationBar = ({ logout, user }) => {
  const guestLinks = () => {
    return (
      <>
        <Nav.Link as={Link} to='/rejestracja'>
          <button className='btnSquare btnPrimary'>Rejestracja</button>
        </Nav.Link>
        <Nav.Link as={Link} to='/logowanie'>
          <button className='btnSquare btnSecondary'>Zaloguj się</button>
        </Nav.Link>
      </>
    );
  };

  const authLinks = () => {
    return (
      <NavDropdown
        className={styles.navDropdown}
        title={
          <div className={styles.user}>
            <Image
              style={{
                height: '40px',
                width: '40px',
                marginRight: '10px',
                objectFit: 'cover',
              }}
              src={user.profile?.image ? user.profile?.image : avatar}
              alt='Avatar'
              roundedCircle
            />
            {user?.profile
              ? `${user.profile.first_name} ${user?.profile.last_name}`
              : user.email}
            <IoIosArrowDropdown />
          </div>
        }
        id='basic-nav-dropdown'
      >
        <NavDropdown.Item as={Link} to='/panel/profil'>
          Profil
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logout}>Wyloguj się</NavDropdown.Item>
      </NavDropdown>
    );
  };

  return (
    <Navbar collapseOnSelect sticky='top' expand='lg' className={styles.nav}>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <img alt='Logo' src={logo} height='64px' className='logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          className='justify-content-end gap-3'
        >
          <Nav>{user ? authLinks() : guestLinks()}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavigationBar);

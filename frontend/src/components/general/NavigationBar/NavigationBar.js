import {
  Container,
  Dropdown,
  Image,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { FaPowerOff } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../../actions/authActions";
import avatar from "../../../images/avatar.png";
import logo from "../../../images/logo.png";
import "./NavigationBar.css";

const NavigationBar = ({ logout, user }) => {
  const guestLinks = () => {
    return (
      <div className="guestNavLinksContainer">
        <Nav.Link as={Link} to="/rejestracja">
          <button className="btnSquare bg-dark-blue clr-white">
            Rejestracja
          </button>
        </Nav.Link>
        <Nav.Link as={Link} to="/logowanie">
          <button className="btnSquare bg-white clr-dark-blue">
            Zaloguj się
          </button>
        </Nav.Link>
      </div>
    );
  };

  const authLinks = () => {
    return (
      <>
        {(user?.type === "Recepcjonista" || user?.type === "Admin") && (
          <div className="navLinksContainer">
            <Dropdown bsPrefix="navLinksDropdown">
              <Dropdown.Toggle
                bsPrefix="navLinksToggle"
                className="btnSimple btnNav"
              >
                Pacjenci
              </Dropdown.Toggle>
              <Dropdown.Menu bsPrefix="navLinksMenu" className="dropdown-menu">
                <Dropdown.Item
                  href="/rejestracja-pacjenta"
                  bsPrefix="navLinksItem"
                  className="dropdown-item"
                >
                  Dodaj pacjenta
                </Dropdown.Item>
                <Dropdown.Item
                  href="/pacjenci"
                  bsPrefix="navLinksItem"
                  className="dropdown-item"
                >
                  Lista pacjentów
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown bsPrefix="navLinksDropdown">
              <Dropdown.Toggle
                bsPrefix="navLinksToggle"
                className="btnSimple btnNav"
              >
                Wizyty
              </Dropdown.Toggle>
              <Dropdown.Menu bsPrefix="navLinksMenu" className="dropdown-menu">
                <Dropdown.Item
                  href="/nowa-wizyta"
                  bsPrefix="navLinksItem"
                  className="dropdown-item"
                >
                  Dodaj wizytę
                </Dropdown.Item>
                <Dropdown.Item
                  href="/dzisiejsze-wizyty"
                  bsPrefix="navLinksItem"
                  className="dropdown-item"
                >
                  Dzisiejsze wizyty
                </Dropdown.Item>
                <Dropdown.Item
                  href="/zgloszone-wizyty"
                  bsPrefix="navLinksItem"
                  className="dropdown-item"
                >
                  Zgłoszone wizyty
                </Dropdown.Item>
                <Dropdown.Item
                  href="/wizyty"
                  bsPrefix="navLinksItem"
                  className="dropdown-item"
                >
                  Lista wizyt
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link as={Link} to="/lekarze">
              <button className="btnSimple btnNav">Lekarze</button>
            </Nav.Link>
            <Nav.Link as={Link} to="/statystyki">
              <button className="btnSimple btnNav">Statystyki</button>
            </Nav.Link>
          </div>
        )}

        <Dropdown bsPrefix="userNavDropdown">
          <Dropdown.Toggle bsPrefix="userNavToggle" className="userTitle">
            <Image
              style={{
                height: "40px",
                width: "40px",
                marginRight: "10px",
                objectFit: "cover",
              }}
              src={user.profile?.image ? user.profile?.image : avatar}
              alt="Avatar"
              roundedCircle
            />
            {user?.profile
              ? `${user.profile.first_name} ${user?.profile.last_name}`
              : user.email}
            <IoIosArrowDropdown />
          </Dropdown.Toggle>
          <Dropdown.Menu bsPrefix="userNavMenu" className="dropdown-menu">
            {(user?.type === "Pacjent" || user?.type === "Nowy użytkownik") && (
              <>
                <NavDropdown.Divider />
                <Dropdown.Item
                  as={Link}
                  to="/profil"
                  bsPrefix="userNavItem"
                  className="dropdown-item"
                >
                  Karta pacjenta
                </Dropdown.Item>
                <NavDropdown.Divider />
                <Dropdown.Item
                  as={Link}
                  to="/konto"
                  bsPrefix="userNavItem"
                  className="dropdown-item"
                >
                  Ustawienia konta
                </Dropdown.Item>
              </>
            )}
            <NavDropdown.Divider />
            <Dropdown.Item
              onClick={logout}
              bsPrefix="userNavItem"
              className="dropdown-item"
            >
              <span className="clr-red">
                Wyloguj się <FaPowerOff />
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  return (
    <Navbar collapseOnSelect sticky="top" expand="lg" className="navBar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img alt="Logo" src={logo} height="64px" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="navWrapper">{user ? authLinks() : guestLinks()}</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(NavigationBar);

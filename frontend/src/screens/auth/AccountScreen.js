import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  ChangeEmailForm,
  ChangePasswordForm,
  DeleteAccountForm,
} from "../../components/account";
import { Loader, Message } from "../../components/general";
import { RESET_MESSAGES } from "../../constants/authConst";

const AccountScreen = () => {
  const dispatch = useDispatch();
  const { loading, success_password, success_email, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_MESSAGES });
    };
  }, [dispatch]);

  return (
    <section className="up-section">
      <div className="container container-bg">
        <h2 className="clr-dark-blue mb-5">Ustawienia konta</h2>
        {loading && <Loader />}
        {success_password && (
          <Message variant="success">Pomyślnie zmieniono hasło</Message>
        )}
        {success_email && (
          <Message variant="success">Pomyślnie zmieniono adres e-mail</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        <Row className="align-items-center justify-content-center">
          <Col>
            <ChangeEmailForm />
          </Col>
          <Col>
            <ChangePasswordForm />
          </Col>
          <DeleteAccountForm />
        </Row>
      </div>
    </section>
  );
};

export default AccountScreen;

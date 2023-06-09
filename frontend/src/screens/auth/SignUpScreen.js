import { Modal } from "react-bootstrap";
import { BsSendCheck } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { Form, Formik } from "formik";

import { signup } from "../../actions/authActions";
import { TextField } from "../../components/formHelpers";
import { Loader, Message } from "../../components/general";
import LayoutAuth from "../../hocs/LayoutAuth";
import Background from "../../images/register.jpg";
import { validateSignUp } from "../../validators";
import styles from "./Auth.module.css";

const SignUpScreen = ({ signup, isAuthenticated, onClick }) => {
  let { error, loading, success } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <LayoutAuth bgImage={Background}>
      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Utwórz konto</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Formik
          initialValues={{
            email: "",
            password: "",
            re_password: "",
          }}
          validationSchema={validateSignUp}
          onSubmit={(values) => {
            const { email, password, re_password } = values;
            signup(email, password, re_password);
          }}
        >
          {({ values, isValid }) => (
            <>
              <Modal
                show={success}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header className="bg-blue text-light">
                  <Modal.Title id="contained-modal-title-vcenter">
                    Konto zostało utworzone <BsSendCheck />
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>
                    Sprawdź pocztę i aktywuj konto lub utwórz kartę pacjenta
                  </h5>
                  <p>
                    Link aktywacyjny wysłaliśmy na adres:{" "}
                    <span className="highlight">{values.email}</span>
                  </p>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                  <Link className="w-40" to="/logowanie">
                    <button className="btnSquare bg-blue clr-white">
                      Rozumiem
                    </button>
                  </Link>
                </Modal.Footer>
              </Modal>
              <Form className={styles.form}>
                <TextField label="Email" name="email" type="email" />
                <TextField label="Hasło" name="password" type="password" />
                <TextField
                  label="Potwierdź hasło"
                  name="re_password"
                  type="password"
                />
                <button
                  type="submit"
                  className="btnSquare bg-blue clr-white"
                  style={{ justifySelf: "center" }}
                  disabled={loading || !isValid}
                >
                  Zarejestruj
                </button>
              </Form>
            </>
          )}
        </Formik>
      </div>
      <p className={styles.p}>
        Masz już konto?{" "}
        <Link className={styles.link} to="/logowanie">
          Zaloguj się
        </Link>
      </p>
    </LayoutAuth>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignUpScreen);

import { connect, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { Form, Formik } from "formik";

import { login } from "../../actions/authActions";
import { TextField } from "../../components/formHelpers";
import { Loader, Message } from "../../components/general";
import LayoutAuth from "../../hocs/LayoutAuth";
import Background from "../../images/login.jpg";
import { validateLogin } from "../../validators";
import styles from "./Auth.module.css";

const LoginScreen = ({ login, isAuthenticated, disabled = false }) => {
  let { error, loading, success } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <LayoutAuth bgImage={Background}>
      <div className={styles.formContainer}>
        <h1 className={styles.h1}>Logowanie</h1>
        {error && <Message variant="danger">{error}</Message>}
        {!disabled && loading && <Loader />}
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validateLogin}
          onSubmit={(values) => {
            const { email, password } = values;
            login(email, password);
          }}
        >
          {({ values, isValid }) => (
            <>
              <Form className={styles.form}>
                <TextField label="Email" name="email" type="email" />
                <TextField label="Hasło" name="password" type="password" />
                <div className={styles.btnGroup}>
                  <Link className={styles.link} to="/przypominanie-hasła">
                    Przypomnij hasło
                  </Link>
                  <button
                    type="submit"
                    className="btnSquare bg-blue clr-white"
                    disabled={loading || !isValid}
                  >
                    Zaloguj
                  </button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
      <p className={styles.p}>
        Nie masz konta?{" "}
        <Link className={styles.link} to="/rejestracja">
          Zarejestruj się
        </Link>
      </p>
    </LayoutAuth>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(LoginScreen);

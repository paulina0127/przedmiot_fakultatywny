import { Modal } from "react-bootstrap";
import { BsPersonCheck, BsSendCheck } from "react-icons/bs";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Form, Formik } from "formik";

import { reset_password } from "../../actions/authActions";
import { TextField } from "../../components/formHelpers";
import { Loader, Message } from "../../components/general";
import { validateResetPassword } from "../../validators";
import LoginScreen from "./LoginScreen";

const ResetPassword = ({ reset_password }) => {
  const auth = useSelector((state) => state.auth);
  const { error, loading, success } = auth;

  return (
    <>
      <LoginScreen disabled />
      <Modal
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="bg-blue text-light">
          <Modal.Title id="contained-modal-title-vcenter">
            Przypomnij hasło {success ? <BsSendCheck /> : <BsPersonCheck />}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Message variant="danger">{error}</Message>}
          {success ? (
            <h5>Email z linkiem do zmiany hasła został wysłany.</h5>
          ) : loading ? (
            <Loader />
          ) : (
            <>
              <h5>Podaj nam swój e-mail. Wyślemy Ci link do zmiany hasła.</h5>
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={validateResetPassword}
                onSubmit={(values, { resetForm }) => {
                  const { email } = values;
                  reset_password(email);

                  success && resetForm({ values: "" });
                }}
              >
                {({ values }) => (
                  <Form id="form">
                    <TextField label="" name="email" type="email" />
                  </Form>
                )}
              </Formik>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          {success ? (
            <Link className="w-40" to="/logowanie">
              <button className="btnSquare bg-blue clr-white">
                Przejdź do logowania
              </button>
            </Link>
          ) : (
            <div className="btnGroup">
              <button
                type="submit"
                form="form"
                className="btnSquare bg-blue clr-white"
                disabled={loading}
              >
                Wyślij
              </button>
              <Link className="w-40" to="/logowanie">
                <button className="btnSquare bg-white clr-black">Anuluj</button>
              </Link>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(null, { reset_password })(ResetPassword);

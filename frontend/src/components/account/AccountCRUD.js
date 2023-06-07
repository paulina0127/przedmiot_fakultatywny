import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { Form, Formik } from "formik";

import {
  change_email,
  change_password,
  delete_account,
} from "../../actions/authActions";
import {
  validateChangeEmail,
  validateChangePassword,
  validateDeleteAccount,
} from "../../validators";
import { TextField } from "../formHelpers";
import panel from "../UserPanel.module.css";

export const ChangeEmailForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    new_email: "",
    re_new_email: "",
    current_password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateChangeEmail}
      onSubmit={(values, { resetForm }) => {
        const { new_email, re_new_email, current_password } = values;
        dispatch(change_email(new_email, re_new_email, current_password));
        resetForm({ values: "" });
      }}
    >
      {({ values }) => (
        <Form>
          <h3 className={`${panel.h3} text-center`}>Zmień email</h3>
          <div className="p-5 pt-2">
            <Row className="align-items-center justify-content-evenly">
              <TextField
                label="Nowy adres e-mail"
                name="new_email"
                type="email"
              />
            </Row>
            <Row className="align-items-center justify-content-evenly">
              <TextField
                label="Powtórz nowy adres e-mail"
                name="re_new_email"
                type="email"
              />
            </Row>
            <Row className="align-items-center justify-content-evenly">
              <TextField
                label="Twoje aktualne hasło"
                name="current_password"
                type="password"
              />
            </Row>
            <Row className="align-items-center justify-content-center">
              <button
                type="submit"
                className="btnSquare bg-dark-blue clr-white"
              >
                Zapisz
              </button>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const ChangePasswordForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    current_password: "",
    new_password: "",
    re_new_password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateChangePassword}
      onSubmit={(values, { resetForm }) => {
        const { new_password, re_new_password, current_password } = values;
        dispatch(
          change_password(new_password, re_new_password, current_password)
        );
        resetForm({ values: "" });
      }}
    >
      {({ values }) => (
        <Form>
          <h3 className={`${panel.h3} text-center`}>Zmień hasło</h3>
          <div className="p-5 pt-2">
            <Row className="align-items-center justify-content-evenly">
              <TextField
                label="Aktualne hasło"
                name="current_password"
                type="password"
              />
            </Row>
            <Row className="align-items-center justify-content-evenly">
              <TextField
                label="Nowe hasło"
                name="new_password"
                type="password"
              />
            </Row>
            <Row className="align-items-center justify-content-evenly">
              <TextField
                label="Powtórz nowe hasło"
                name="re_new_password"
                type="password"
              />
            </Row>
            <Row className="align-items-center justify-content-center">
              <button
                type="submit"
                className="btnSquare bg-dark-blue clr-white"
              >
                Zapisz
              </button>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const DeleteAccountForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ current_password: "" }}
      validationSchema={validateDeleteAccount}
      onSubmit={(values, { resetForm }) => {
        dispatch(delete_account(values.current_password));
        resetForm({ values: "" });
      }}
    >
      {({ values }) => (
        <Form>
          <h3 className={`${panel.h3} px-5`}>Usuń konto</h3>
          <div className="p-5 pt-2 w-100">
            <Row className="align-items-center justify-content-evenly">
              <p className="mb-4">
                Usunięcie konta nie spowoduje usunięcia karty pacjenta i
                historii leczenia.
              </p>
            </Row>
            <Row className="align-items-center justify-content-between">
              <Col md={4}>
                <TextField
                  label="Wprowadź aktualne hasło"
                  name="current_password"
                  type="password"
                />
              </Col>

              <Col md={7}>
                <button
                  type="submit"
                  className="btnSquare bg-dark-blue clr-white"
                >
                  Usuń
                </button>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </Formik>
  );
};

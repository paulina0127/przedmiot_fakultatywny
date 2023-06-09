import { useState } from "react";
import { Modal } from "react-bootstrap";
import { BsPersonCheck } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Field, FieldArray, Form, Formik } from "formik";

import {
  createPatient,
  linkPatient,
  updatePatient,
} from "../../actions/patientActions";
import avatar from "../../images/avatar.png";
import { validatePatientLink } from "../../validators";
import { FileField, TextField } from "../formHelpers";
import { Loader, Message } from "../general";
import panel from "../UserPanel.module.css";

const PatientForm = ({
  initialValues,
  validate,
  label,
  patientExists,
  patientId,
  user,
  children,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { errorPatientCreate, successPatientCreate, loadingPatientCreate } =
    useSelector((state) => state.patientCreate);
  const { errorPatientUpdate, successPatientUpdate, loadingPatientUpdate } =
    useSelector((state) => state.patientUpdate);
  const { errorPatientLink, successPatientLink, loadingPatientLink } =
    useSelector((state) => state.patientLink);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {loadingPatientUpdate && <Loader />}
      {loadingPatientCreate && <Loader />}
      {successPatientUpdate && (
        <Message variant="success">Pomyślnie zapisano zmiany.</Message>
      )}
      {successPatientCreate && (
        <Message variant="success">Pomyślnie utworzono kartę pacjenta.</Message>
      )}
      {errorPatientUpdate && (
        <Message variant="danger">{errorPatientUpdate}</Message>
      )}
      {errorPatientCreate && (
        <Message variant="danger">{errorPatientCreate}</Message>
      )}

      <div className="container-bg-content">
        {children}
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => {
            if (patientExists) {
              const updatedValues = {};
              for (const key in values) {
                if (values[key] !== initialValues[key]) {
                  updatedValues[key] = values[key];
                }
              }
              dispatch(updatePatient(patientId, updatedValues));
            } else {
              dispatch(createPatient(values));
            }
          }}
        >
          {({ values, isValid }) => (
            <>
              <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header className="bg-blue text-light">
                  <Modal.Title id="contained-modal-title-vcenter">
                    Połącz konto z kartą pacjenta <BsPersonCheck />
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Uzupełnij poniższe dane</h5>
                  {loadingPatientLink && <Loader />}
                  {successPatientLink && (
                    <Message variant="success">
                      Pomyślnie połączono konto z kartą pacjenta.
                    </Message>
                  )}
                  {errorPatientLink && (
                    <Message variant="danger">{errorPatientLink}</Message>
                  )}
                  <Formik
                    initialValues={{
                      pesel: "",
                      link_key: "",
                    }}
                    validationSchema={validatePatientLink}
                    onSubmit={(values, { resetForm }) => {
                      const { pesel, link_key } = values;
                      dispatch(linkPatient(values));

                      successPatientLink && resetForm({ values: "" });
                    }}
                  >
                    {({ values, isValid }) => (
                      <Form id="modal-form">
                        <TextField label="Pesel" name="pesel" type="text" />
                        <TextField
                          label="Klucz połączenia profilu"
                          name="link_key"
                          type="text"
                        />
                      </Form>
                    )}
                  </Formik>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                  <div className="btnGroup">
                    <button
                      className="btnSquare bg-dark-blue clr-white"
                      onClick={handleClick}
                    >
                      Anuluj
                    </button>
                    <button
                      type="submit"
                      form="modal-form"
                      className="btnSquare bg-blue clr-white"
                      disabled={loadingPatientLink}
                    >
                      Połącz
                    </button>
                  </div>
                </Modal.Footer>
              </Modal>
              <Form id="form" encType="multipart/form-data">
                <div className={panel.patientForm}>
                  <div className={panel.imgArea}>
                    <div className={panel.avatarContainer}>
                      <img
                        src={
                          values?.image !== initialValues?.image &&
                          values?.image instanceof File
                            ? URL.createObjectURL(values?.image)
                            : values?.image
                            ? values?.image
                            : avatar
                        }
                        alt=""
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                      />
                      <label htmlFor="image">
                        <div className={panel.avatarBtn}>
                          <FaPlus color="#fff" className={panel.avatarIcon} />
                        </div>
                      </label>
                      <FileField
                        name="image"
                        type="file"
                        accept="image/png, image/jpeg"
                      />
                    </div>
                    {patientExists && user?.type !== "Pacjent" ? (
                      <>
                        <div className="formGroup">
                          <h4 className={panel.h4}>Klucz połączenia profilu</h4>
                          <TextField
                            name="link_key"
                            type="text"
                            disabled={true}
                          />
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div className={panel.personalArea}>
                    <h3 className={panel.h3}>Dane osobowe</h3>
                    <div className="twoColumnGrid">
                      <div className="formGroup">
                        <h4 className={panel.h4}>
                          Imię <span className="form-required">*</span>
                        </h4>
                        <TextField name="first_name" type="text" />
                      </div>

                      <div className="formGroup">
                        <h4 className={panel.h4}>
                          Nazwisko <span className="form-required">*</span>
                        </h4>
                        <TextField name="last_name" type="text" />
                      </div>

                      <div className="formGroup">
                        <h4 className={panel.h4}>
                          PESEL <span className="form-required">*</span>
                        </h4>
                        <TextField
                          name="pesel"
                          type="text"
                          maxLength="11"
                          disabled={patientExists}
                        />
                      </div>

                      <div className="formGroup">
                        <h4 className={panel.h4}>
                          Data urodzenia{" "}
                          <span className="form-required">*</span>
                        </h4>
                        <TextField
                          name="birthdate"
                          type="date"
                          disabled={patientExists}
                        />
                      </div>

                      <div className="formGroup">
                        <h4 className={panel.h4}>Email</h4>
                        <TextField name="email" type="email" />
                      </div>

                      <div className="formGroup">
                        <h4 className={panel.h4}>Telefon</h4>
                        <TextField name="phone_number" type="text" />
                      </div>
                    </div>
                  </div>

                  <div className={panel.addressArea}>
                    <h3 className={panel.h3}>Adres zamieszkania</h3>
                    <div className="formGroup">
                      <h4 className={panel.h4}>
                        Ulica <span className="form-required">*</span>
                      </h4>
                      <TextField name="street" type="text" />
                    </div>

                    <div className="formGroup">
                      <h4 className={panel.h4}>
                        Kod pocztowy <span className="form-required">*</span>
                      </h4>
                      <TextField name="postal_code" type="text" maxLength="6" />
                    </div>

                    <div className="formGroup">
                      <h4 className={panel.h4}>
                        Miejscowość <span className="form-required">*</span>
                      </h4>
                      <TextField name="city" type="text" />
                    </div>
                  </div>

                  <div className={panel.medicalArea}>
                    <h3 className={panel.h3}>Informacje medyczne</h3>
                    <div className={panel.medicalGrid}>
                      <div className="formGroup">
                        <FieldArray name="medicine">
                          {({ push, remove, form }) => {
                            const { values } = form;
                            const { medicine } = values ? values : {};
                            return (
                              <>
                                <div className="d-flex align-items-baseline gap-2">
                                  <h4 className={panel.h4}>Przyjmowane leki</h4>
                                  <button
                                    type="button"
                                    className="btn btn-success btnCircle"
                                    onClick={() => push("")}
                                  >
                                    <MdOutlineAdd />
                                  </button>
                                </div>

                                {medicine?.map((med, index) => (
                                  <div
                                    key={index}
                                    className="d-flex align-items-baseline gap-2"
                                  >
                                    <Field
                                      name={`medicine[${index}]`}
                                      className="form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1"
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger btnCircle"
                                      onClick={() => remove(index)}
                                    >
                                      <HiOutlineTrash />
                                    </button>
                                  </div>
                                ))}
                              </>
                            );
                          }}
                        </FieldArray>
                      </div>

                      <div className="formGroup">
                        <FieldArray name="allergies">
                          {({ push, remove, form }) => {
                            const { values } = form;
                            const { allergies } = values ? values : {};
                            return (
                              <>
                                <div className="d-flex align-items-baseline gap-2">
                                  <h4 className={panel.h4}>Alergie</h4>
                                  <button
                                    type="button"
                                    className="btn btn-success btnCircle"
                                    onClick={() => push("")}
                                  >
                                    <MdOutlineAdd />
                                  </button>
                                </div>

                                {allergies?.map((allergy, index) => (
                                  <div
                                    key={index}
                                    className="d-flex align-items-baseline gap-2"
                                  >
                                    <Field
                                      name={`allergies[${index}]`}
                                      className="form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1"
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger btnCircle"
                                      onClick={() => remove(index)}
                                    >
                                      <HiOutlineTrash />
                                    </button>
                                  </div>
                                ))}
                              </>
                            );
                          }}
                        </FieldArray>
                      </div>

                      <div className="formGroup">
                        <FieldArray name="diseases">
                          {({ push, remove, form }) => {
                            const { values } = form;
                            const { diseases } = values ? values : {};
                            return (
                              <>
                                <div className="d-flex align-items-baseline gap-2">
                                  <h4 className={panel.h4}>Choroby</h4>
                                  <button
                                    type="button"
                                    className="btn btn-success btnCircle"
                                    onClick={() => push("")}
                                  >
                                    <MdOutlineAdd />
                                  </button>
                                </div>

                                {diseases?.map((disease, index) => (
                                  <div
                                    key={index}
                                    className="d-flex align-items-baseline gap-2"
                                  >
                                    <Field
                                      name={`diseases[${index}]`}
                                      className="form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1"
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-danger btnCircle"
                                      onClick={() => remove(index)}
                                    >
                                      <HiOutlineTrash />
                                    </button>
                                  </div>
                                ))}
                              </>
                            );
                          }}
                        </FieldArray>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </>
          )}
        </Formik>

        {!patientExists && user?.type === "Pacjent" ? (
          <div className="btnGroup" style={{ justifySelf: "end" }}>
            <button className="btnSimple mx-4 mt-3" onClick={handleClick}>
              Mam już kartę pacjenta
            </button>
            <button
              type="submit"
              className="btnSquare bg-blue clr-white mx-4 mt-3"
              style={{ justifySelf: "end" }}
              form="form"
              disabled={loadingPatientCreate}
            >
              {label}
            </button>
          </div>
        ) : (
          <button
            type="submit"
            className="btnSquare bg-dark-blue clr-white mx-4 mt-3"
            style={{ justifySelf: "end" }}
            form="form"
            disabled={loadingPatientUpdate}
          >
            {label}
          </button>
        )}
      </div>
    </>
  );
};

export default PatientForm;

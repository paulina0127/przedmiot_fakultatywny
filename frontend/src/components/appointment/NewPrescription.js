import { Modal } from "react-bootstrap";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Field, FieldArray, Form, Formik } from "formik";

import { createPrescription } from "../../actions/prescriptionActions";
import { Loader, Message } from "../general";
import styles from "./AppointmentForm.module.css";

const NewPrescription = ({ showModal, handleCloseModal, id }) => {
  const dispatch = useDispatch();

  const {
    errorPrescriptionCreate,
    successPrescriptionCreate,
    loadingPrescriptionCreate,
  } = useSelector((state) => state.prescriptionCreate);
  return (
    <Modal
      show={showModal}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={"bg-primary text-light"}>
        <Modal.Title>Dodawanie Recepty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successPrescriptionCreate && (
          <Message variant="success">Recepta została dodana</Message>
        )}
        {errorPrescriptionCreate && (
          <Message variant="danger">{errorPrescriptionCreate}</Message>
        )}
        {loadingPrescriptionCreate ? (
          <Loader />
        ) : (
          <Formik
            initialValues={{ medicine: [] }}
            onSubmit={(values, { resetForm }) => {
              dispatch(createPrescription(id, { medicine: values.medicine }));
              resetForm();
            }}
          >
            {({ values }) => (
              <Form id="form" encType="multipart/form-data">
                <div className="formGroup">
                  <FieldArray name="medicine">
                    {({ push, remove, form }) => {
                      const { values } = form;
                      const { medicine } = values ? values : {};
                      return (
                        <>
                          <div className="d-flex align-items-baseline gap-2">
                            <h3 className={styles.h3}>Dodaj leki</h3>
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
                <hr className="text-secondary" />
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill fw-bold shadow-sm mx-2 px-5"
                    onClick={handleCloseModal}
                  >
                    Wróć
                  </button>
                  <button
                    type="submit"
                    className={`btn btn-primary rounded-pill fw-bold shadow-sm px-5`}
                    disabled={
                      values.medicine.filter((med) => med !== "").length === 0
                    }
                  >
                    Dodaj receptę
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default NewPrescription;

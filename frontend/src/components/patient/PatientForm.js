import { Formik, Form, Field, FieldArray } from 'formik';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUserProfile,
  updateUserProfile,
  linkUserProfile,
} from '../../actions/userActions';
import { Loader, Message } from '../general';
import { TextField, FileField } from '../form helpers';
import avatar from '../../images/avatar.png';
import panel from '../UserPanel.module.css';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';
import { useState } from 'react';
import { BsPersonCheck } from 'react-icons/bs';
import { object, string } from 'yup';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PatientForm = ({
  initialValues,
  validate,
  label,
  profileExist,
  userProfile,
  user,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const createProfile = useSelector((state) => state.userCreateProfile);
  const { errorCreate, successCreate, loadingCreate } = createProfile;

  const linkProfile = useSelector((state) => state.userLinkProfile);
  const { errorLink, successLink, loadingLink } = linkProfile;

  const updateProfile = useSelector((state) => state.userUpdateProfile);
  const { error, success, loading } = updateProfile;

  const validateModal = object({
    pesel: string().required('Pole adres email jest obowiązkowe'),
    link_key: string().required('Pole adres email jest obowiązkowe'),
  });

  const handleClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='container container-bg'>
      {loading && <Loader />}
      {loadingCreate && <Loader />}
      {success && (
        <Message variant='success'>Pomyślnie zapisano zmiany</Message>
      )}
      {successCreate && (
        <Message variant='success'>Pomyślnie utworzono kartę pacjenta</Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      <h2 className={panel.h2}>Karta pacjenta</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values) => {
          if (profileExist) {
            const updatedValues = {};
            for (const key in values) {
              if (values[key] !== initialValues[key]) {
                updatedValues[key] = values[key];
              }
            }
            dispatch(updateUserProfile(userProfile, updatedValues, values));
          } else {
            dispatch(createUserProfile(values));
          }
        }}
      >
        {({ values }) => (
          <>
            <Modal
              show={showModal}
              size='lg'
              aria-labelledby='contained-modal-title-vcenter'
              centered
            >
              <Modal.Header className='bg-blue text-light'>
                <Modal.Title id='contained-modal-title-vcenter'>
                  Połącz konto z kartą pacjenta <BsPersonCheck />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5>Uzupełnij poniższe dane</h5>
                {loadingLink && <Loader />}
                {successLink && (
                  <Message variant='success'>
                    Pomyślnie połączono konto z kartą pacjenta
                  </Message>
                )}
                {errorLink && <Message variant='danger'>{errorLink}</Message>}
                <Formik
                  initialValues={{
                    pesel: '',
                    link_key: '',
                  }}
                  validationSchema={validateModal}
                  onSubmit={(values, { resetForm }) => {
                    const { pesel, link_key } = values;
                    dispatch(linkUserProfile(values));
                    {
                      successLink && resetForm({ values: '' });
                    }
                  }}
                >
                  {({ values }) => (
                    <Form id='modal-form'>
                      <TextField label='Pesel' name='pesel' type='text' />
                      <TextField
                        label='Klucz połączenia konta'
                        name='link_key'
                        type='text'
                      />
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
              <Modal.Footer className='justify-content-center'>
                <div className='btnGroup'>
                  <button
                    className='btnSquare bg-dark-blue clr-white'
                    onClick={handleClick}
                  >
                    Anuluj
                  </button>
                  <button
                    type='submit'
                    form='modal-form'
                    className='btnSquare bg-blue clr-white'
                  >
                    Połącz
                  </button>
                </div>
              </Modal.Footer>
            </Modal>
            <Form id='form' encType='multipart/form-data'>
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
                      style={{ objectFit: 'cover', borderRadius: '50%' }}
                    />
                    <label htmlFor='image'>
                      <div className={panel.avatarBtn}>
                        <FaPlus color='#fff' className={panel.avatarIcon} />
                      </div>
                    </label>
                    <FileField
                      name='image'
                      type='file'
                      accept='image/png, image/jpeg'
                    />
                  </div>
                  {profileExist &&
                  (user?.type === 'Recepcjonista' ||
                    user?.type === 'Lekarz') ? (
                    <Link to='' className='align-self-center'>
                      <button className='btnRound bg-dark-blue clr-white'>
                        Historia leczenia
                      </button>
                    </Link>
                  ) : null}
                </div>

                <div className={panel.personalArea}>
                  <h3 className={panel.h3}>Dane osobowe</h3>
                  <div className='twoColumnGrid'>
                    <div className='formGroup'>
                      <h4 className={panel.h4}>
                        Imię <span className='form-required'>*</span>
                      </h4>
                      <TextField name='first_name' type='text' />
                    </div>

                    <div className='formGroup'>
                      <h4 className={panel.h4}>
                        Nazwisko <span className='form-required'>*</span>
                      </h4>
                      <TextField name='last_name' type='text' />
                    </div>

                    <div className='formGroup'>
                      <h4 className={panel.h4}>
                        PESEL <span className='form-required'>*</span>
                      </h4>
                      <TextField
                        name='pesel'
                        type='text'
                        disabled={profileExist}
                      />
                    </div>

                    <div className='formGroup'>
                      <h4 className={panel.h4}>
                        Data urodzenia <span className='form-required'>*</span>
                      </h4>
                      <TextField
                        name='birthdate'
                        type='date'
                        disabled={profileExist}
                      />
                    </div>

                    <div className='formGroup'>
                      <h4 className={panel.h4}>Email</h4>
                      <TextField name='email' type='email' />
                    </div>

                    <div className='formGroup'>
                      <h4 className={panel.h4}>Telefon</h4>
                      <TextField name='phone_number' type='text' />
                    </div>
                  </div>
                </div>

                <div className={panel.addressArea}>
                  <h3 className={panel.h3}>Adres zamieszkania</h3>
                  <div className='formGroup'>
                    <h4 className={panel.h4}>
                      Ulica <span className='form-required'>*</span>
                    </h4>
                    <TextField name='street' type='text' />
                  </div>

                  <div className='formGroup'>
                    <h4 className={panel.h4}>
                      Kod pocztowy <span className='form-required'>*</span>
                    </h4>
                    <TextField name='postal_code' type='text' />
                  </div>

                  <div className='formGroup'>
                    <h4 className={panel.h4}>
                      Miejscowość <span className='form-required'>*</span>
                    </h4>
                    <TextField name='city' type='text' />
                  </div>
                </div>

                <div className={panel.medicalArea}>
                  <h3 className={panel.h3}>Informacje medyczne</h3>
                  <div className={panel.medicalGrid}>
                    <div className='formGroup'>
                      <FieldArray name='medicine'>
                        {({ push, remove, form }) => {
                          const { values } = form;
                          const { medicine } = values ? values : {};
                          return (
                            <>
                              <div className='d-flex align-items-baseline gap-2'>
                                <h4 className={panel.h4}>Przyjmowane leki</h4>
                                <button
                                  type='button'
                                  className='btn btn-success btnCircle'
                                  onClick={() => push('')}
                                >
                                  <MdOutlineAdd />
                                </button>
                              </div>

                              {medicine?.map((med, index) => (
                                <div
                                  key={index}
                                  className='d-flex align-items-baseline gap-2'
                                >
                                  <Field
                                    name={`medicine[${index}]`}
                                    className='form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1'
                                  />
                                  <button
                                    type='button'
                                    className='btn btn-danger btnCircle'
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

                    <div className='formGroup'>
                      <FieldArray name='allergies'>
                        {({ push, remove, form }) => {
                          const { values } = form;
                          const { allergies } = values ? values : {};
                          return (
                            <>
                              <div className='d-flex align-items-baseline gap-2'>
                                <h4 className={panel.h4}>Alergie</h4>
                                <button
                                  type='button'
                                  className='btn btn-success btnCircle'
                                  onClick={() => push('')}
                                >
                                  <MdOutlineAdd />
                                </button>
                              </div>

                              {allergies?.map((allergy, index) => (
                                <div
                                  key={index}
                                  className='d-flex align-items-baseline gap-2'
                                >
                                  <Field
                                    name={`allergies[${index}]`}
                                    className='form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1'
                                  />
                                  <button
                                    type='button'
                                    className='btn btn-danger btnCircle'
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

                    <div className='formGroup'>
                      <FieldArray name='diseases'>
                        {({ push, remove, form }) => {
                          const { values } = form;
                          const { diseases } = values ? values : {};
                          return (
                            <>
                              <div className='d-flex align-items-baseline gap-2'>
                                <h4 className={panel.h4}>Choroby</h4>
                                <button
                                  type='button'
                                  className='btn btn-success btnCircle'
                                  onClick={() => push('')}
                                >
                                  <MdOutlineAdd />
                                </button>
                              </div>

                              {diseases?.map((disease, index) => (
                                <div
                                  key={index}
                                  className='d-flex align-items-baseline gap-2'
                                >
                                  <Field
                                    name={`diseases[${index}]`}
                                    className='form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1'
                                  />
                                  <button
                                    type='button'
                                    className='btn btn-danger btnCircle'
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

      {!profileExist && user?.type === 'Pacjent' ? (
        <div className='btnGroup align-self-end '>
          <button className='btnSimple mx-4 mt-3' onClick={handleClick}>
            Mam już kartę pacjenta
          </button>
          <button
            type='submit'
            className='btnSquare bg-blue clr-white align-self-end mx-4 mt-3'
            form='form'
          >
            {label}
          </button>
        </div>
      ) : (
        <button
          type='submit'
          className='btnSquare bg-dark-blue clr-white align-self-end mx-4 mt-3'
          form='form'
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default PatientForm;

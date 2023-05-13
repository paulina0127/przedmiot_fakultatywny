import { Formik, Form, Field, FieldArray } from 'formik';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  createUserProfile,
  updateUserProfile,
  clearUserProfileFeedback,
} from '../../../actions/userActions';
import { TextField, FileField, Loader, Message } from '../../../components';
import avatar from '../../../images/avatar.png';
import panel from '../../UserPanel.module.css';
import styles from './PatientForm.module.css';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

const PatientForm = ({
  initialValues,
  validate,
  label,
  profileExist,
  userProfile,
  userId,
  goBack,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const createProfile = useSelector((state) => state.userCreateProfile);
  const { errorCreate, successCreate, loadingCreate } = createProfile;

  const updateProfile = useSelector((state) => state.userUpdateProfile);
  const { error, success, loading } = updateProfile;

  const handleClick = () => {
    goBack();
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
      {location.pathname === '/rejestracja' ? (
        <div className='d-grid' style={{ gridTemplateColumns: '1fr 1fr' }}>
          <button
            className='btnSquare btnPrimary align-self-start'
            onClick={handleClick}
          >
            Wstecz
          </button>
          <h2
            className={classNames(
              panel.h2,
              'text-align-center align-self-start'
            )}
          >
            Karta pacjenta
          </h2>
        </div>
      ) : (
        <h2 className={panel.h2}>Karta pacjenta</h2>
      )}
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
            console.log('Initial', initialValues);
            console.log('Update', updatedValues);
            console.log('Values', values);
            dispatch(updateUserProfile(userProfile, updatedValues, values));
          } else {
            dispatch(createUserProfile(values, userId));
          }
        }}
      >
        {({ values }) => (
          <Form id='form' encType='multipart/form-data'>
            <div className={styles.form}>
              <div className={styles.imgArea}>
                <div className={panel.avatarContainer}>
                  <img
                    id='avatar'
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
                      <FaPlus color='#fff' className={styles.avatarIcon} />
                    </div>
                  </label>
                  <FileField name='image' type='file' />
                </div>
              </div>

              <div className={styles.personalArea}>
                <h3 className={panel.h3}>Dane osobowe</h3>
                <div className='twoColumnGrid'>
                  <div className={styles.formGroup}>
                    <h4 className={panel.h4}>Imię</h4>
                    <TextField name='first_name' type='text' />
                  </div>

                  <div className={styles.formGroup}>
                    <h4 className={panel.h4}>Nazwisko</h4>
                    <TextField name='last_name' type='text' />
                  </div>

                  <div className={styles.formGroup}>
                    <h4 className={panel.h4}>PESEL</h4>
                    <TextField
                      name='pesel'
                      type='text'
                      disabled={profileExist}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <h4 className={panel.h4}>Data urodzenia</h4>
                    <TextField
                      name='birthdate'
                      type='date'
                      disabled={profileExist}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <h4 className={panel.h4}>Email</h4>
                    <TextField name='email' type='email' />
                  </div>

                  <div className={styles.formGroup}>
                    <h4 className={panel.h4}>Telefon</h4>
                    <TextField name='phone_number' type='text' />
                  </div>
                </div>
              </div>

              <div className={styles.addressArea}>
                <h3 className={panel.h3}>Adres zamieszkania</h3>
                <div className={styles.formGroup}>
                  <h4 className={panel.h4}>Ulica</h4>
                  <TextField name='street' type='text' />
                </div>

                <div className={styles.formGroup}>
                  <h4 className={panel.h4}>Kod pocztowy</h4>
                  <TextField name='postal_code' type='text' />
                </div>

                <div className={styles.formGroup}>
                  <h4 className={panel.h4}>Miejscowość</h4>
                  <TextField name='city' type='text' />
                </div>
              </div>

              <div className={styles.medicalArea}>
                <h3 className={panel.h3}>Informacje medyczne</h3>
                <div className={styles.medicalGrid}>
                  <div className={styles.formGroup}>
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

                  <div className={styles.formGroup}>
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

                  <div className={styles.formGroup}>
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
        )}
      </Formik>
      {location.pathname === '/rejestracja' ? (
        <div className='btnGroup align-self-end '>
          <button className='btnSimple mx-4 mt-3' onClick={handleClick}>
            Mam już kartę pacjenta
          </button>
          <button
            type='submit'
            className='btnSquare btnPrimaryLight align-self-end mx-4 mt-3'
            form='form'
          >
            {label}
          </button>
        </div>
      ) : (
        <button
          type='submit'
          className='btnSquare btnPrimary align-self-end mx-4 mt-3'
          form='form'
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default PatientForm;

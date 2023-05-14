import React from 'react';
import { BsTelephone } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const location = useLocation();

  return (
    <div className={styles.footer}>
      <div className='container'>
        <div className='row justify-content-between gy-4'>
          <div className='col-lg-6 col-12 d-flex flex-row gap-3 align-self-center'>
            <p>
              <BsTelephone size={'56px'} />
            </p>
            <p>
              Zadzwoń do nas lub zarejestruj sie i umów na wizytę korzystając z
              naszego serwisu
            </p>
          </div>
          <div className='col-lg-4 col-12'>
            <div className={'row gy-4'}>
              <div className='col-12'>
                <h4 className={styles.h4}>Kontakt</h4>
                <p className={styles.p}>+48 000 000 000 23</p>
                <p className={styles.p}>contact@healthycare.com</p>
                <p className={styles.p}>Olsztyn, ul. Armii Krajowej</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

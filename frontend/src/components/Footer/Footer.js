import React from 'react';
import { BsTelephone } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import scrollTo from '../../functions/scrollTo';
import styles from './Footer.module.css';

const Footer = () => {
  const location = useLocation();
  const home = location.pathname === '/';

  const handleClick = (anchor) => {
    scrollTo(anchor)();
  };

  return (
    <div className={styles.footer}>
      <div className='container'>
        <div className='row justify-content-between gy-4'>
          <div className='col-lg-4 col-12 d-flex flex-row gap-3 align-self-center'>
            <p>
              <BsTelephone size={'56px'} />
            </p>
            <p>
              Zadzwoń do nas lub zarejestruj sie i umów na wizytę korzystając z
              naszego serwisu
            </p>
          </div>
          <div className='col-lg-6 col-12'>
            <div className={home ? 'row gy-4' : 'row gy-4 justify-content-end'}>
              {home && (
                <div className='col-md-6 col-12'>
                  <h4 className={styles.h4}>Skróty</h4>
                  <Link
                    to='#about'
                    onClick={() => handleClick('about')}
                    className={styles.link}
                  >
                    O przychodni
                  </Link>
                  <Link
                    to='#internists'
                    onClick={() => handleClick('internists')}
                    className={styles.link}
                  >
                    Lekarze interniści
                  </Link>
                  <Link
                    to='#specialists'
                    onClick={() => handleClick('specialists')}
                    className={styles.link}
                  >
                    Lekarze specjaliści
                  </Link>
                </div>
              )}
              <div className='col-md-6 col-12'>
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

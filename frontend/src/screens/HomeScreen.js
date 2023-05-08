import styles from './HomeScreen.module.css'
import doctorone from '../images/homescreen-doctor.png'
import { Image } from 'react-bootstrap'
import { FaGraduationCap, FaRegUser, FaRegClock } from 'react-icons/fa'

const HomeScreen = () => {
  return (
    <>
      <section>
        <div className={styles['description-container']}>
          <h2 className={styles['description-title']}>O przychodni</h2>

          <div className={styles['description-image']}>
            <Image style={{ width: '450px' }} src={doctorone} />
          </div>
          <p className={styles['description-text']}>
            Przychodnia HealthyCare to nowoczesny i profesjonalny ośrodek
            medyczny, który oferuje kompleksowe usługi z zakresu opieki
            zdrowotnej. W przychodni pracują wysoko wykwalifikowani lekarze
            różnych specjalizacji. Przychodnia umożliwia rezerwację wizyt
            online. Healthycare stawia na indywidualne podejście do pacjenta
            oraz wysoką jakość świadczonych usług, co przekłada się na
            zadowolenie i zaufanie pacjentów.
          </p>
          <div className='container-fluid text-center'>
            <div className='row col-6 align-items-center  my-5'>
              <div className='col'>
                <FaRegUser size='2.5em' color='var(--light-blue)' />
                <h2 className={styles['description-h2']}>5</h2>
                <h3 className={styles['description-h3']}>Lekarzy</h3>
              </div>
              <div className='col'>
                <FaGraduationCap size='2.5em' color='var(--light-blue)' />
                <h2 className={styles['description-h2']}>4</h2>
                <h3 className={styles['description-h3']}>Specjalizacje</h3>
              </div>
              <div className='col'>
                <FaRegClock size='2.5em' color='var(--light-blue)' />
                <h2 className={styles['description-h2']}>10</h2>
                <h3 className={styles['description-h3']}>Lat doświadczenia</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className={styles['internist-container']}>
          <h2 className={styles['internist-title']}>Lekarze interniści</h2>
        </div>
      </section>
    </>
  )
}

export default HomeScreen

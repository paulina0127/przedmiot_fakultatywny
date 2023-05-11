import { Image } from 'react-bootstrap';
import styles from './DoctorInfo.module.css';

const DoctorInfo = ({ doctor }) => {
  return (
    <div className={styles.container}>
      <div style={{ height: '125px', width: '125px' }}>
        <Image
          className={styles.img}
          src={doctor?.image}
          alt='Doctor Image'
          roundedCircle
        />
      </div>
      <h4 className={styles.h4}>
        {doctor?.specializations
          .map((spec) =>
            doctor?.gender === 'Kobieta' ? spec.fem_name : spec.name
          )
          .join(', ')}
      </h4>
      <h3 className={styles.h3}>
        dr {doctor?.first_name} {doctor?.last_name}
      </h3>
    </div>
  );
};

export default DoctorInfo;

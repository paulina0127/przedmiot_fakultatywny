import styles from './DoctorInfo.module.css';
import { Image } from 'react-bootstrap';

const DoctorInfo = (props) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.img}
        src={props.img}
        alt='Doctor Image'
        roundedCircle
      />
      <h4 className={styles.h4}>{props.spec}</h4>
      <h3 className={styles.h3}>dr {props.name}</h3>
    </div>
  );
};

export default DoctorInfo;

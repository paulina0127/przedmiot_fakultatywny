import React from 'react';
import styles from './Table.module.css';

const Row = ({ number, object, values, children }) => {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{number + 1}</td>
      {values.map((value) => (
        <>
          <td className={styles.td} key={value?.id}>
            {value === 'location'
              ? `${object.street}, ${object.postal_code} ${object.city}`
              : value.includes('date')
              ? object[value].split('-').reverse().join('-')
              : object[value]}
          </td>
        </>
      ))}
      {React.Children.map(children, (child, index) => (
        <td className={styles.td} key={index}>
          {child}
        </td>
      ))}
    </tr>
  );
};

export default Row;

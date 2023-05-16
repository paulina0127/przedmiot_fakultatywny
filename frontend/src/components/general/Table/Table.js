import styles from './Table.module.css';

const Table = ({ headers, children }) => {
  return (
    <table className={styles.table}>
      <tr className={styles.tr}>
        <th className={styles.th}>#</th>
        {headers.map((header) => (
          <th
            className={styles.th}
            style={{ width: `${100 / headers.count}%` }}
          >
            {header}
          </th>
        ))}
      </tr>
      {children}
    </table>
  );
};

export default Table;

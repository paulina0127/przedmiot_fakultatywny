import styles from "./Table.module.css";

const Table = ({ headers, children }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.th}>#</th>
          {headers.map((header, index) => (
            <th
              key={index}
              className={styles.th}
              style={{ width: `${100 / headers.length}%` }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Table;

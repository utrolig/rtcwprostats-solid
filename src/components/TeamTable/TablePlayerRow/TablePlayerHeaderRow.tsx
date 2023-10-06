import styles from "./TablePlayerRow.module.css";

export const TablePlayerHeaderRow = () => {
  return (
    <div classList={{ [styles.row]: true, [styles.header]: true }}>
      <div classList={{ [styles.cell]: true, [styles.name]: true }} />
      <div classList={{ [styles.cell]: true, [styles.kdr]: true }}>KDR</div>
      <div classList={{ [styles.cell]: true, [styles.kills]: true }}>Kills</div>
      <div classList={{ [styles.cell]: true, [styles.deaths]: true }}>
        Deaths
      </div>
    </div>
  );
};

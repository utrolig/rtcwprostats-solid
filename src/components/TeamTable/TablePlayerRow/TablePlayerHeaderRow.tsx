import { SortDir, TableRowSortKey } from "~/utils/utils";
import styles from "./TablePlayerRow.module.css";
import { SortIcon } from "~/components/SortIcon/SortIcon";

type TablePlayerRowProps = {
  sortDir: SortDir;
  sortKey: TableRowSortKey;
  onSortClicked: (key: TableRowSortKey) => void;
};

export const TablePlayerHeaderRow = (props: TablePlayerRowProps) => {
  return (
    <div classList={{ [styles.row]: true, [styles.header]: true }}>
      <div
        onClick={() => props.onSortClicked(TableRowSortKey.Name)}
        classList={{ [styles.cell]: true, [styles.name]: true }}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.Name}
        />
        <span>Name</span>
      </div>
      <div
        onClick={() => props.onSortClicked(TableRowSortKey.KDR)}
        classList={{ [styles.cell]: true, [styles.kdr]: true }}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.KDR}
        />
        <span>KDR</span>
      </div>
      <div
        onClick={() => props.onSortClicked(TableRowSortKey.Kills)}
        classList={{ [styles.cell]: true, [styles.kills]: true }}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.Kills}
        />
        <span>Kills</span>
      </div>
      <div
        onClick={() => props.onSortClicked(TableRowSortKey.Deaths)}
        classList={{ [styles.cell]: true, [styles.deaths]: true }}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.Deaths}
        />
        <span>Deaths</span>
      </div>
      <div
        onClick={() => props.onSortClicked(TableRowSortKey.Add)}
        classList={{
          [styles.cell]: true,
          [styles.deaths]: true,
          [styles.add]: true,
        }}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.Add}
        />
        <span>ADD</span>
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.damageDone]: true,
        }}
      >
        <span>Damage done</span>
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.damageReceived]: true,
        }}
      >
        <span>Damage received</span>
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.revives]: true,
        }}
      >
        <span>Revives</span>
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.gibs]: true,
        }}
      >
        <span>Gibs</span>
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.headshots]: true,
        }}
      >
        <span>Headshots</span>
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.accuracy]: true,
        }}
      >
        <span>Accuracy</span>
      </div>
    </div>
  );
};

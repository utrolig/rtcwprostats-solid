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
        onClick={() => props.onSortClicked(TableRowSortKey.Kdr)}
        classList={{ [styles.cell]: true, [styles.kdr]: true }}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.Kdr}
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
        onClick={() => props.onSortClicked(TableRowSortKey.DamageDone)}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.DamageDone}
        />
        <span>Damage done</span>
      </div>

      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.damageReceived]: true,
        }}
        onClick={() => props.onSortClicked(TableRowSortKey.DamageReceived)}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.DamageReceived}
        />
        <span>Damage received</span>
      </div>

      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.revives]: true,
        }}
        onClick={() => props.onSortClicked(TableRowSortKey.Revives)}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.Revives}
        />
        <span>Revives</span>
      </div>

      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.gibs]: true,
        }}
        onClick={() => props.onSortClicked(TableRowSortKey.Gibs)}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.Gibs}
        />
        <span>Gibs</span>
      </div>

      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.headshots]: true,
        }}
        onClick={() => props.onSortClicked(TableRowSortKey.Headshots)}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.Headshots}
        />
        <span>Headshots</span>
      </div>

      <div
        classList={{
          [styles.cell]: true,
          [styles.number]: true,
          [styles.accuracy]: true,
        }}
        onClick={() => props.onSortClicked(TableRowSortKey.Accuracy)}
      >
        <SortIcon
          activeSortKey={props.sortKey}
          sortDir={props.sortDir}
          sortKey={TableRowSortKey.Accuracy}
        />
        <span>Accuracy</span>
      </div>
    </div>
  );
};

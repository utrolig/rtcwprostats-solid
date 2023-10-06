import { Faction, GroupsResponse } from "~/api/types";
import styles from "./TeamTable.module.css";
import { factionImages } from "~/assets/factionImages";
import { toReadableFaction } from "~/utils/faction";
import { TablePlayerRow } from "./TablePlayerRow/TablePlayerRow";
import { PlayerStatsWithClass } from "~/utils/teams";
import { For } from "solid-js";
import { TablePlayerHeaderRow } from "./TablePlayerRow/TablePlayerHeaderRow";
import { SortDir, TableRowSortKey } from "~/utils/utils";

type TeamTableProps = {
  groupsData: GroupsResponse;
  faction: Faction;
  sortDir: SortDir;
  sortKey: TableRowSortKey;
  onSortClicked: (key: TableRowSortKey) => void;
  players: PlayerStatsWithClass[];
};

export const TeamTable = (props: TeamTableProps) => {
  return (
    <div class={styles.container}>
      <div class={styles.header}>
        <img src={factionImages[props.faction]} class={styles.factionImage} />
        <p>{toReadableFaction(props.faction)}</p>
      </div>
      <div class={styles.body}>
        <TablePlayerHeaderRow
          sortKey={props.sortKey}
          sortDir={props.sortDir}
          onSortClicked={props.onSortClicked}
        />
        <For each={props.players}>
          {(player) => (
            <TablePlayerRow
              playerElos={props.groupsData.elos}
              player={player}
            />
          )}
        </For>
      </div>
    </div>
  );
};

import { Elos, Faction, GroupsResponse } from "~/api/types";
import styles from "./TeamTable.module.css";
import { factionImages } from "~/assets/factionImages";
import { TablePlayerRow } from "./TablePlayerRow/TablePlayerRow";
import { MatchStatPlayerStat, PlayerStatsFull } from "~/utils/teams";
import { For, Show } from "solid-js";
import { TablePlayerHeaderRow } from "./TablePlayerRow/TablePlayerHeaderRow";
import { SortDir, TableRowSortKey } from "~/utils/utils";
import { useTranslation } from "~/i18n/context";

type TeamTableProps = {
  elos?: Elos;
  faction?: Faction;
  sortDir: SortDir;
  sortKey: TableRowSortKey;
  onSortClicked: (key: TableRowSortKey) => void;
  players: MatchStatPlayerStat[] | PlayerStatsFull[];
};

export const TeamTable = (props: TeamTableProps) => {
  const t = useTranslation();

  const factionName = (faction: Faction) => {
    switch (faction) {
      case "Allied":
        return t("allies");
      case "Axis":
        return t("axis");
    }
  };

  return (
    <div class={styles.container}>
      <div class={styles.header}>
        <Show when={props.faction} keyed>
          {(faction) => (
            <>
              <img src={factionImages[faction]} class={styles.factionImage} />
              <p>{factionName(faction)}</p>
            </>
          )}
        </Show>
      </div>
      <div class={styles.body}>
        <TablePlayerHeaderRow
          sortKey={props.sortKey}
          sortDir={props.sortDir}
          onSortClicked={props.onSortClicked}
        />
        <For each={props.players}>
          {(player, idx) => (
            <TablePlayerRow
              isOdd={idx() % 2 === 0}
              playerElos={props.elos}
              player={player}
              playerClass={(player as PlayerStatsFull).class}
            />
          )}
        </For>
      </div>
    </div>
  );
};

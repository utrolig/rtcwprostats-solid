import { Faction, GroupsResponse, PlayerStats } from "~/api/types";
import styles from "./TeamTable.module.css";
import { factionImages } from "~/assets/factionImages";
import { toReadableFaction } from "~/utils/faction";
import { TablePlayerRow } from "./TablePlayerRow/TablePlayerRow";
import { getTeamFromFaction, groupsResponseToTeams } from "~/utils/teams";
import { getPlayersFromTeam } from "~/utils/players";
import { For, createSignal } from "solid-js";
import { TablePlayerHeaderRow } from "./TablePlayerRow/TablePlayerHeaderRow";
import {
  SortDir,
  TableRowSortKey,
  getAccuracy,
  getAdd,
  getKdr,
} from "~/utils/utils";

type TeamTableProps = {
  groupsData: GroupsResponse;
  faction: Faction;
};

export const TeamTable = (props: TeamTableProps) => {
  const [sortKey, setSortKey] = createSignal<TableRowSortKey>(
    TableRowSortKey.KDR
  );
  const [sortDir, setSortDir] = createSignal<SortDir>("desc");

  const getTeam = () => {
    const teams = groupsResponseToTeams(props.groupsData);
    return getTeamFromFaction(teams.factions, props.faction);
  };

  const getPlayers = () => {
    const team = getTeam();
    const players = getPlayersFromTeam(team, props.groupsData);
    return [...players].sort((a, b) => {
      switch (sortKey()) {
        case "accuracy": {
          return (
            getAccuracy(a) - getAccuracy(b) * (sortDir() === "asc" ? 1 : -1)
          );
        }

        case "add": {
          return getAdd(a) - getAdd(b) * (sortDir() === "asc" ? 1 : -1);
        }

        case "damageDone": {
          return (
            a.categories.damagegiven -
            b.categories.damagegiven * (sortDir() === "asc" ? 1 : -1)
          );
        }

        case "damageReceived": {
          return (
            a.categories.damagereceived -
            b.categories.damagereceived * (sortDir() === "asc" ? 1 : -1)
          );
        }

        case "deaths": {
          return (
            a.categories.deaths -
            b.categories.deaths * (sortDir() === "asc" ? 1 : -1)
          );
        }

        case "gibs": {
          return (
            a.categories.gibs -
            b.categories.gibs * (sortDir() === "asc" ? 1 : -1)
          );
        }

        case "headshots": {
          return (
            a.categories.headshots -
            b.categories.headshots * (sortDir() === "asc" ? 1 : -1)
          );
        }

        case "kills": {
          return (
            (a.categories.kills - b.categories.kills) *
            (sortDir() === "asc" ? 1 : -1)
          );
        }

        case "kdr": {
          return (getKdr(a) - getKdr(b)) * (sortDir() === "asc" ? 1 : -1);
        }

        case "revives": {
          return (
            a.categories.revives -
            b.categories.revives * (sortDir() === "asc" ? 1 : -1)
          );
        }

        case "name": {
          return (
            a.alias.localeCompare(b.alias) * (sortDir() === "asc" ? 1 : -1)
          );
        }
      }
    });
  };

  const onSortClicked = (key: TableRowSortKey) => {
    if (sortKey() === key) {
      if (sortDir() === "asc") {
        setSortDir("desc");
      } else {
        setSortDir("asc");
      }

      return;
    }

    setSortKey(key);
  };

  return (
    <div class={styles.container}>
      <div class={styles.header}>
        <img src={factionImages[props.faction]} class={styles.factionImage} />
        <p>{toReadableFaction(props.faction)}</p>
      </div>
      <div class={styles.body}>
        <TablePlayerHeaderRow
          sortKey={sortKey()}
          sortDir={sortDir()}
          onSortClicked={onSortClicked}
        />
        <For each={getPlayers()}>
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

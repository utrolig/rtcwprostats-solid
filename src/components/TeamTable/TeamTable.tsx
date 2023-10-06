import { Faction, GroupsResponse, PlayerStats } from "~/api/types";
import styles from "./TeamTable.module.css";
import { factionImages } from "~/assets/factionImages";
import { toReadableFaction } from "~/utils/faction";
import { TablePlayerRow } from "./TablePlayerRow/TablePlayerRow";
import { getTeamFromFaction, groupsResponseToTeams } from "~/utils/teams";
import { getPlayersFromTeam } from "~/utils/players";
import { For, createSignal } from "solid-js";

type TeamTableProps = {
  groupsData: GroupsResponse;
  faction: Faction;
};

type SortKeys = keyof PlayerStats["categories"];
type SortDir = "asc" | "desc";

export const TeamTable = (props: TeamTableProps) => {
  const [sortKey, setSortKey] = createSignal<SortKeys>("kills");
  const [sortDir, setSortDir] = createSignal<SortDir>("desc");

  const getTeam = () => {
    const teams = groupsResponseToTeams(props.groupsData);
    return getTeamFromFaction(teams.factions, props.faction);
  };

  const getPlayers = () => {
    const team = getTeam();
    const players = getPlayersFromTeam(team, props.groupsData.statsall);
    return [...players].sort((a, b) => {
      if (sortDir() === "asc") {
        return a.categories[sortKey()] - b.categories[sortKey()];
      } else {
        return b.categories[sortKey()] - a.categories[sortKey()];
      }
    });
  };

  return (
    <div class={styles.container}>
      <div class={styles.header}>
        <img src={factionImages[props.faction]} class={styles.factionImage} />
        <p>{toReadableFaction(props.faction)}</p>
      </div>
      <div class={styles.body}>
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

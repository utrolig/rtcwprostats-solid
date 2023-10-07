import { Faction, GroupsResponse } from "~/api/types";
import styles from "./Body.module.css";
import { For, Show, createSignal } from "solid-js";
import { TeamTable } from "~/components/TeamTable/TeamTable";
import { SortDir, TableRowSortKey } from "~/utils/utils";
import { getTeamFromFaction, groupsResponseToTeams } from "~/utils/teams";
import { getPlayersFromTeam, playersByKeyAndDir } from "~/utils/players";
import { Toggle } from "~/components/Toggle/Toggle";

export type BodyProps = {
  data: GroupsResponse;
};

export default function Body(props: BodyProps) {
  const [combineStats, setCombineStats] = createSignal(false);
  const [sortKey, setSortKey] = createSignal<TableRowSortKey>(
    TableRowSortKey.Kdr
  );
  const [sortDir, setSortDir] = createSignal<SortDir>("desc");

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

  const getTeam = (faction: Faction) => {
    const teams = groupsResponseToTeams(props.data);
    return getTeamFromFaction(teams.factions, faction);
  };

  const getPlayers = (faction: Faction | "both") => {
    const byKeyAndDir = playersByKeyAndDir(sortKey(), sortDir());
    if (faction === "both") {
      const players = getPlayersFromTeam("both", props.data);
      return [...players].sort(byKeyAndDir);
    }

    const team = getTeam(faction);
    const players = getPlayersFromTeam(team, props.data);
    return [...players].sort(byKeyAndDir);
  };

  return (
    <div class={styles.body}>
      <ul class={styles.tabs}>
        <li class={styles.active}>
          <h6>Match</h6>
        </li>

        <For each={Object.entries(props.data.match_summary.results)}>
          {([_matchId, result], idx) => (
            <li>
              <h6>Round {idx() + 1}</h6>
              <p>{result.map}</p>
            </li>
          )}
        </For>
      </ul>
      <div
        classList={{
          [styles.statsWrapper]: true,
          [styles.combined]: combineStats(),
        }}
      >
        <Toggle
          class={styles.combineStats}
          label="Combine stats"
          onToggle={setCombineStats}
          isToggled={combineStats()}
        />
        <Show when={combineStats()}>
          <TeamTable
            players={getPlayers("both")}
            groupsData={props.data}
            onSortClicked={onSortClicked}
            sortDir={sortDir()}
            sortKey={sortKey()}
          />
        </Show>
        <Show when={!combineStats()}>
          <TeamTable
            players={getPlayers("Allied")}
            sortKey={sortKey()}
            sortDir={sortDir()}
            onSortClicked={onSortClicked}
            groupsData={props.data}
            faction={"Allied"}
          />
          <TeamTable
            players={getPlayers("Axis")}
            sortKey={sortKey()}
            sortDir={sortDir()}
            onSortClicked={onSortClicked}
            groupsData={props.data}
            faction={"Axis"}
          />
        </Show>
      </div>
    </div>
  );
}

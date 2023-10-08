import { Show, createSignal, createEffect } from "solid-js";
import styles from "./MatchBody.module.css";
import { Toggle } from "~/components/Toggle/Toggle";
import { TeamTable } from "~/components/TeamTable/TeamTable";
import {
  getPlayersFromTeamForMatch,
  playersByKeyAndDir,
} from "~/utils/players";
import { SortDir, TableRowSortKey } from "~/utils/utils";
import { Faction, MatchStatsResponse } from "~/api/types";
import { getTeamFromFaction, matchStatResponseToTeams } from "~/utils/teams";
import { Awards } from "~/components/Awards/Awards";

export type MatchBodyProps = {
  data: MatchStatsResponse;
};

export const MatchBody = (props: MatchBodyProps) => {
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
    const teams = matchStatResponseToTeams(props.data);
    return getTeamFromFaction(teams.factions, faction);
  };

  const getPlayers = (faction: Faction | "both") => {
    const byKeyAndDir = playersByKeyAndDir(sortKey(), sortDir());
    if (faction === "both") {
      const players = getPlayersFromTeamForMatch("both", props.data);
      return [...players].sort(byKeyAndDir);
    }

    const players = getPlayersFromTeamForMatch(faction, props.data);
    return [...players].sort(byKeyAndDir);
  };

  return (
    <>
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
            faction={"Allied"}
          />
          <TeamTable
            players={getPlayers("Axis")}
            sortKey={sortKey()}
            sortDir={sortDir()}
            onSortClicked={onSortClicked}
            faction={"Axis"}
          />
        </Show>
      </div>
      <Awards data={props.data} />
    </>
  );
};

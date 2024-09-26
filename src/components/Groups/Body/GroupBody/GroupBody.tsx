import { Show, createSignal, createMemo } from "solid-js";
import styles from "./GroupBody.module.css";
import { Toggle } from "~/components/Toggle/Toggle";
import { TeamTable } from "~/components/TeamTable/TeamTable";
import {
  getPlayersFromTeamForGroups,
  playersByKeyAndDir,
} from "~/utils/players";
import { SortDir, TableRowSortKey } from "~/utils/utils";
import { Faction, GroupsResponse } from "~/api/types";
import { getTeamFromFaction, groupsResponseToTeams } from "~/utils/teams";
import { Awards } from "~/components/Awards/Awards";
import { useTranslation } from "~/i18n/context";

export type GroupBodyProps = {
  data: GroupsResponse;
};

export const GroupBody = (props: GroupBodyProps) => {
  const t = useTranslation();
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
      const players = getPlayersFromTeamForGroups("both", props.data);
      return [...players].sort(byKeyAndDir);
    }

    const team = getTeam(faction);
    const players = getPlayersFromTeamForGroups(team, props.data);
    return [...players].sort(byKeyAndDir);
  };

  const axisPlayers = createMemo(() => getPlayers("Axis"));
  const alliedPlayers = createMemo(() => getPlayers("Allied"));
  const combinedPlayers = createMemo(() => getPlayers("both"));

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
          label={t("combineStats")}
          onToggle={setCombineStats}
          isToggled={combineStats()}
        />
        <Show when={combineStats()}>
          <TeamTable
            players={combinedPlayers()}
            elos={props.data.elos}
            onSortClicked={onSortClicked}
            sortDir={sortDir()}
            sortKey={sortKey()}
          />
        </Show>
        <Show when={!combineStats()}>
          <TeamTable
            players={alliedPlayers()}
            sortKey={sortKey()}
            sortDir={sortDir()}
            onSortClicked={onSortClicked}
            elos={props.data.elos}
            faction={"Allied"}
          />
          <TeamTable
            players={axisPlayers()}
            sortKey={sortKey()}
            sortDir={sortDir()}
            onSortClicked={onSortClicked}
            elos={props.data.elos}
            faction={"Axis"}
          />
        </Show>
      </div>
      <Awards data={props.data} />
    </>
  );
};

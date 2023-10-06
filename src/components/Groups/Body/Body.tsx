import { Faction, GroupsResponse } from "~/api/types";
import styles from "./Body.module.css";
import { For, createSignal } from "solid-js";
import { TeamTable } from "~/components/TeamTable/TeamTable";
import {
  SortDir,
  TableRowSortKey,
  getAccuracy,
  getAdd,
  getKdr,
} from "~/utils/utils";
import { getTeamFromFaction, groupsResponseToTeams } from "~/utils/teams";
import { getPlayersFromTeam } from "~/utils/players";

export type BodyProps = {
  data: GroupsResponse;
};

export default function Body(props: BodyProps) {
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

  const getPlayers = (faction: Faction) => {
    const team = getTeam(faction);
    const players = getPlayersFromTeam(team, props.data);
    console.log("sortKey", sortKey());
    return [...players].sort((a, b) => {
      switch (sortKey()) {
        case TableRowSortKey.Accuracy: {
          return (
            (getAccuracy(a) - getAccuracy(b)) * (sortDir() === "asc" ? 1 : -1)
          );
        }

        case TableRowSortKey.Add: {
          return (getAdd(a) - getAdd(b)) * (sortDir() === "asc" ? 1 : -1);
        }

        case TableRowSortKey.DamageDone: {
          return (
            (a.categories.damagegiven - b.categories.damagegiven) *
            (sortDir() === "asc" ? 1 : -1)
          );
        }

        case TableRowSortKey.DamageReceived: {
          return (
            (a.categories.damagereceived - b.categories.damagereceived) *
            (sortDir() === "asc" ? 1 : -1)
          );
        }

        case TableRowSortKey.Deaths: {
          return (
            (a.categories.deaths - b.categories.deaths) *
            (sortDir() === "asc" ? 1 : -1)
          );
        }

        case TableRowSortKey.Gibs: {
          return (
            (a.categories.gibs - b.categories.gibs) *
            (sortDir() === "asc" ? 1 : -1)
          );
        }

        case TableRowSortKey.Headshots: {
          return (
            (a.categories.headshots - b.categories.headshots) *
            (sortDir() === "asc" ? 1 : -1)
          );
        }

        case TableRowSortKey.Kills: {
          return (
            (a.categories.kills - b.categories.kills) *
            (sortDir() === "asc" ? 1 : -1)
          );
        }

        case TableRowSortKey.Kdr: {
          return (getKdr(a) - getKdr(b)) * (sortDir() === "asc" ? 1 : -1);
        }

        case TableRowSortKey.Revives: {
          return (
            (a.categories.revives - b.categories.revives) *
            (sortDir() === "asc" ? 1 : -1)
          );
        }

        case TableRowSortKey.Name: {
          return (
            a.alias.localeCompare(b.alias) * (sortDir() === "asc" ? 1 : -1)
          );
        }
      }
    });
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
    </div>
  );
}

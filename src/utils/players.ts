import {
  Classes,
  Faction,
  GroupsResponse,
  MatchStatsResponse,
  Team,
  WStatsAll,
} from "~/api/types";
import {
  MatchStatPlayerStat,
  PlayerStatsFull,
  PlayerStatsWithClass,
  PlayerStatsWithId,
} from "./teams";
import { SortDir, TableRowSortKey, getAccuracy, getAdd, getKdr } from "./utils";

export const getWstatsForPlayer = (playerId: string, wstats: WStatsAll) => {
  for (const element of wstats) {
    const [statsPlayerId] = Object.keys(element);
    if (statsPlayerId === playerId) {
      return element[statsPlayerId];
    }
  }
};

export const getPlayersFromTeamForMatch = (
  faction: Faction | "both",
  matchStatResponse: MatchStatsResponse,
  classes?: Classes
): PlayerStatsFull[] => {
  const players = matchStatResponse.statsall.reduce((acc, stats) => {
    const [playerId] = Object.keys(stats);

    const playerStats = stats[playerId];
    const wstats = getWstatsForPlayer(playerId, matchStatResponse.wstatsall);

    if (wstats) {
      (playerStats as PlayerStatsFull).weaponStats = wstats;
    }

    (playerStats as PlayerStatsFull).id = playerId;
    (playerStats as PlayerStatsFull).class = classes?.[playerId] ?? "Mixed";

    if (faction === "both") {
      acc.push(playerStats as PlayerStatsFull);
      return acc;
    }

    if ((playerStats.team as Faction) === faction) {
      acc.push(playerStats as PlayerStatsFull);
    }

    return acc;
  }, [] as PlayerStatsFull[]);

  return players;
};

export const getPlayersFromTeamForGroups = (
  team: Team | "both",
  groupsResponse: GroupsResponse
): PlayerStatsFull[] => {
  const players = groupsResponse.statsall.reduce((acc, stats) => {
    const [playerId] = Object.keys(stats);

    const playerStats = stats[playerId];
    const wstats = getWstatsForPlayer(playerId, groupsResponse.wstatsall);

    if (wstats) {
      (playerStats as PlayerStatsFull).weaponStats = wstats;
    }

    (playerStats as PlayerStatsFull).id = playerId;
    (playerStats as PlayerStatsFull).class = groupsResponse.classes[playerId];

    if (team === "both") {
      acc.push(playerStats as PlayerStatsFull);
      return acc;
    }

    if (playerStats.team === team) {
      acc.push(playerStats as PlayerStatsFull);
    }

    return acc;
  }, [] as PlayerStatsFull[]);

  return players;
};

export const playersByKeyAndDir =
  (sortKey: TableRowSortKey, dir: SortDir) =>
  (a: PlayerStatsWithId, b: PlayerStatsWithId) => {
    switch (sortKey) {
      case TableRowSortKey.Accuracy: {
        return (getAccuracy(a) - getAccuracy(b)) * (dir === "asc" ? 1 : -1);
      }

      case TableRowSortKey.Add: {
        return (getAdd(a) - getAdd(b)) * (dir === "asc" ? 1 : -1);
      }

      case TableRowSortKey.DamageDone: {
        return (
          (a.categories.damagegiven - b.categories.damagegiven) *
          (dir === "asc" ? 1 : -1)
        );
      }

      case TableRowSortKey.DamageReceived: {
        return (
          (a.categories.damagereceived - b.categories.damagereceived) *
          (dir === "asc" ? 1 : -1)
        );
      }

      case TableRowSortKey.Deaths: {
        return (
          (a.categories.deaths - b.categories.deaths) * (dir === "asc" ? 1 : -1)
        );
      }

      case TableRowSortKey.Gibs: {
        return (
          (a.categories.gibs - b.categories.gibs) * (dir === "asc" ? 1 : -1)
        );
      }

      case TableRowSortKey.Headshots: {
        return (
          (a.categories.headshots - b.categories.headshots) *
          (dir === "asc" ? 1 : -1)
        );
      }

      case TableRowSortKey.Kills: {
        return (
          (a.categories.kills - b.categories.kills) * (dir === "asc" ? 1 : -1)
        );
      }

      case TableRowSortKey.Kdr: {
        return (getKdr(a) - getKdr(b)) * (dir === "asc" ? 1 : -1);
      }

      case TableRowSortKey.Revives: {
        return (
          (a.categories.revives - b.categories.revives) *
          (dir === "asc" ? 1 : -1)
        );
      }

      case TableRowSortKey.Name: {
        return a.alias.localeCompare(b.alias) * (dir === "asc" ? 1 : -1);
      }
    }
  };

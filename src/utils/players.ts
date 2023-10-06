import { GroupsResponse, Team } from "~/api/types";
import { PlayerStatsWithClass } from "./teams";
import { SortDir, TableRowSortKey, getAccuracy, getAdd, getKdr } from "./utils";

export const getPlayersFromTeam = (
  team: Team | "both",
  groupsResponse: GroupsResponse
): PlayerStatsWithClass[] => {
  const players = groupsResponse.statsall.reduce((acc, stats) => {
    const [playerId] = Object.keys(stats);

    const playerStats = stats[playerId];

    if (team === "both") {
      (playerStats as PlayerStatsWithClass).id = playerId;
      (playerStats as PlayerStatsWithClass).class =
        groupsResponse.classes[playerId];
      acc.push(playerStats as PlayerStatsWithClass);
      return acc;
    }

    if (playerStats.team === team) {
      (playerStats as PlayerStatsWithClass).id = playerId;
      (playerStats as PlayerStatsWithClass).class =
        groupsResponse.classes[playerId];
      acc.push(playerStats as PlayerStatsWithClass);
    }

    return acc;
  }, [] as PlayerStatsWithClass[]);

  return players;
};

export const playersByKeyAndDir =
  (sortKey: TableRowSortKey, dir: SortDir) =>
  (a: PlayerStatsWithClass, b: PlayerStatsWithClass) => {
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

import { PlayerStatsObject, Team } from "~/api/types";
import { PlayerStatsWithId } from "./teams";

export const getPlayersFromTeam = (
  team: Team,
  statsAll: PlayerStatsObject[]
): PlayerStatsWithId[] => {
  const players = statsAll.reduce((acc, stats) => {
    const [playerId] = Object.keys(stats);

    const playerStats = stats[playerId];

    if (playerStats.team === team) {
      (playerStats as PlayerStatsWithId).id = playerId;
      acc.push(playerStats as PlayerStatsWithId);
    }

    return acc;
  }, [] as PlayerStatsWithId[]);

  return players;
};

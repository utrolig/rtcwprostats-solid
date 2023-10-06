import { GroupsResponse, Team } from "~/api/types";
import { PlayerStatsWithClass } from "./teams";

export const getPlayersFromTeam = (
  team: Team,
  groupsResponse: GroupsResponse
): PlayerStatsWithClass[] => {
  const players = groupsResponse.statsall.reduce((acc, stats) => {
    const [playerId] = Object.keys(stats);

    const playerStats = stats[playerId];

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

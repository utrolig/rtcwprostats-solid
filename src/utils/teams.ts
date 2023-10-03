import {
  Faction,
  GroupsResponse,
  Guid,
  MatchSummary,
  PlayerStats,
  Team,
} from "~/api/types";

export type PlayerStatsWithId = PlayerStats & {
  id: Guid;
};

export const getMatchResult = (
  matchSummary: MatchSummary
): Record<Team, number> => {
  const TeamA = Object.values(matchSummary.results).reduce((acc, result) => {
    if (result.winnerAB === "TeamA") {
      return acc + 1;
    }

    return acc;
  }, 0);

  const TeamB = Object.values(matchSummary.results).reduce((acc, result) => {
    if (result.winnerAB === "TeamB") {
      return acc + 1;
    }

    return acc;
  }, 0);

  return {
    TeamA,
    TeamB,
  };
};

const matchSummaryToFactions = (
  matchSummary: MatchSummary
): Record<Team, Faction> => {
  const [firstGameKey] = Object.keys(matchSummary.results).sort();
  const firstGame = matchSummary.results[firstGameKey];

  const { winner, winnerAB } = firstGame;

  if (winner === "Allied" && winnerAB === "TeamA") {
    return {
      TeamA: "Axis",
      TeamB: "Allied",
    };
  }

  if (winner === "Allied" && winnerAB === "TeamB") {
    return {
      TeamA: "Allied",
      TeamB: "Axis",
    };
  }

  if (winner === "Axis" && winnerAB === "TeamA") {
    return {
      TeamA: "Allied",
      TeamB: "Axis",
    };
  }

  if (winner === "Axis" && winnerAB === "TeamB") {
    return {
      TeamA: "Axis",
      TeamB: "Allied",
    };
  }

  return {
    TeamA: "Allied",
    TeamB: "Axis",
  };
};

export const groupsResponseToTeams = (
  groupsResponse: GroupsResponse
): {
  teamA: PlayerStatsWithId[];
  teamB: PlayerStatsWithId[];
  factions: ReturnType<typeof matchSummaryToFactions>;
} => {
  const teamA = [];
  const teamB = [];

  const statsAll = groupsResponse.statsall;
  const factions = matchSummaryToFactions(groupsResponse.match_summary);

  for (const player of statsAll) {
    const [playerId] = Object.keys(player);
    const playerStats = player[playerId] as PlayerStatsWithId;
    playerStats.id = playerId;

    if (playerStats.team === "TeamA") {
      teamA.push(playerStats);
    } else {
      teamB.push(playerStats);
    }
  }

  return {
    teamA,
    teamB,
    factions,
  };
};

export const getMaps = (matchSummary: MatchSummary) => {
  const maps = Object.values(matchSummary.results).map((s) => s.map);
  return maps.filter((value, index, array) => array.indexOf(value) === index);
};

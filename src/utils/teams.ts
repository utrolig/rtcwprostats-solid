import {
  Faction,
  GameClass,
  GroupsResponse,
  Guid,
  MatchResult,
  MatchStatsResponse,
  MatchSummary,
  PlayerStats,
  Team,
  WStats,
} from "~/api/types";

export type PlayerStatsWithId = PlayerStats & {
  id: Guid;
};

export type PlayerStatsWithClass = PlayerStatsWithId & {
  class: GameClass;
};

export type MatchStatPlayerStat = PlayerStats & {
  id: Guid;
  weaponStats: WStats[];
};

export type PlayerStatsFull = PlayerStats & {
  id: Guid;
  class: GameClass;
  weaponStats: WStats[];
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
  const getWinner = (result: MatchResult) => {
    const { winner, winnerAB } = result;
    if (winner === "Allied" && winnerAB === "TeamA") {
      return {
        TeamA: "Allied",
        TeamB: "Axis",
      } as const;
    }

    if (winner === "Allied" && winnerAB === "TeamB") {
      return {
        TeamA: "Axis",
        TeamB: "Allied",
      } as const;
    }

    if (winner === "Axis" && winnerAB === "TeamA") {
      return {
        TeamA: "Axis",
        TeamB: "Allied",
      } as const;
    }

    if (winner === "Axis" && winnerAB === "TeamB") {
      return {
        TeamA: "Allied",
        TeamB: "Axis",
      } as const;
    }
  };

  const gameKeys = Object.keys(matchSummary.results).sort();

  let keyIdx = 0;
  let teams;

  while (!teams) {
    teams = getWinner(matchSummary.results[gameKeys[keyIdx]]);
    keyIdx += 1;
  }

  return teams;
};

export const groupsResponseToPlayers = (
  matchStatResponse: MatchStatsResponse
) => {
  const players = [];

  const statsAll = matchStatResponse.statsall;

  for (const player of statsAll) {
    const [playerId] = Object.keys(player);
    const playerStats = player[playerId] as MatchStatPlayerStat;
    playerStats.id = playerId;

    for (const element of matchStatResponse.wstatsall) {
      const [statsPlayerId] = Object.keys(element);
      if (statsPlayerId === playerId) {
        playerStats.weaponStats = element[statsPlayerId];
        break;
      }
    }
    players.push(playerStats);
  }

  return players;
};

export const matchStatResponseToTeams = (
  matchStatResponse: MatchStatsResponse
): {
  teamA: MatchStatPlayerStat[];
  teamB: MatchStatPlayerStat[];
  factions: ReturnType<typeof matchSummaryToFactions>;
} => {
  const teamA = [];
  const teamB = [];

  const statsAll = matchStatResponse.statsall;
  const factions = matchSummaryToFactions(matchStatResponse.match_summary);

  for (const player of statsAll) {
    const [playerId] = Object.keys(player);
    const playerStats = player[playerId] as MatchStatPlayerStat;
    playerStats.id = playerId;

    for (const element of matchStatResponse.wstatsall) {
      const [statsPlayerId] = Object.keys(element);
      if (statsPlayerId === playerId) {
        playerStats.weaponStats = element[statsPlayerId];
        break;
      }
    }

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

export const groupsResponseToTeams = (
  groupsResponse: GroupsResponse
): {
  teamA: PlayerStatsFull[];
  teamB: PlayerStatsFull[];
  factions: ReturnType<typeof matchSummaryToFactions>;
} => {
  const teamA = [];
  const teamB = [];

  const statsAll = groupsResponse.statsall;
  const factions = matchSummaryToFactions(groupsResponse.match_summary);

  for (const player of statsAll) {
    const [playerId] = Object.keys(player);
    const playerStats = player[playerId] as PlayerStatsFull;
    playerStats.id = playerId;
    playerStats.class = groupsResponse.classes[playerId];

    for (const element of groupsResponse.wstatsall) {
      const [statsPlayerId] = Object.keys(element);
      if (statsPlayerId === playerId) {
        playerStats.weaponStats = element[statsPlayerId];
        break;
      }
    }

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

export const getTeamFromFaction = (
  input: Record<Team, Faction>,
  faction: Faction
) => {
  if (input.TeamA === faction) {
    return "TeamA";
  }

  return "TeamB";
};

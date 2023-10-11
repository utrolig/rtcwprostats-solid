export type Guid = string;
export type MatchId = string;
export type Timestamp = string;
export type PlayerStatsObject = Record<string, PlayerStats>;
export type Faction = "Axis" | "Allied";
export type Team = "TeamA" | "TeamB";
export type GameClass =
  | "Medic"
  | "LT"
  | "Panzer"
  | "Sniper"
  | "Engineer"
  | "Mixed";

export type Weapon =
  | "Knife"
  | "Luger"
  | "Colt"
  | "MP-40"
  | "Thompson"
  | "Panzer"
  | "Grenade"
  | "Syringe"
  | "Dynamite"
  | "Airstrike"
  | "Artillery"
  | "Sten"
  | "Mauser";

export type PlayerStats = {
  alias: string;
  team: Team;
  start_time: number;
  num_rounds: number;
  categories: {
    kills: number;
    deaths: number;
    gibs: number;
    suicides: number;
    teamkills: number;
    headshots: number;
    damagegiven: number;
    damagereceived: number;
    damageteam: number;
    hits: number;
    shots: number;
    revives: number;
    ammogiven: number;
    healthgiven: number;
    knifekills: number;
    score: number;
    dyn_planted: number;
    dyn_defused: number;
    obj_captured: number;
    obj_destroyed: number;
    obj_returned: number;
    obj_taken: number;
    obj_checkpoint: number;
    obj_killcarrier: number;
    obj_protectflag: number;
    accuracy: number;
    efficiency: number;
    killpeak: number;
    games: number;
  };
  jsonGameStatVersion: string;
};

export type EloEntry = [string, number];
export type MatchResult = {
  round1: {
    duration: number;
    duration_nice: string;
  };
  map: string;
  round2: {
    duration: number;
    duration_nice: string;
  };
  winner: Faction;
  winnerAB: Team;
};

export type Results = Record<MatchId, MatchResult>;
export type Classes = Record<Guid, GameClass>;

export type WStats = {
  kills: number;
  deaths: number;
  headshots: number;
  hits: number;
  shots: number;
  games: number;
  weapon: Weapon;
};

export type PlayerWStats = Record<Guid, WStats[]>;

export type WStatsAll = PlayerWStats[];

export type MatchSummary = {
  duration: number;
  duration_nice: string;
  finish_human: Timestamp;
  games: number;
  results: Results;
};

export type Elos = Record<Guid, EloEntry>;

export type GroupsResponse = {
  statsall: PlayerStatsObject[];
  elos: Elos;
  match_id: string;
  type: string;
  match_summary: MatchSummary;
  classes: Classes;
  wstatsall: WStatsAll;
};

export type MatchStatsResponse = Omit<GroupsResponse, "classes" | "elos">;

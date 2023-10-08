import { Elos, PlayerStats, WStats } from "~/api/types";
import { PlayerStatsWithClass, PlayerStatsWithId } from "./teams";

export const TableRowSortKey = {
  Accuracy: "accuracy",
  Add: "add",
  DamageDone: "damageDone",
  DamageReceived: "damageReceived",
  Deaths: "deaths",
  Gibs: "gibs",
  Headshots: "headshots",
  Kdr: "kdr",
  Kills: "kills",
  Name: "name",
  Revives: "revives",
} as const;

export type TableRowSortKey =
  (typeof TableRowSortKey)[keyof typeof TableRowSortKey];
export type SortDir = "asc" | "desc";

export const getElo = (playerId: string, playerElos: Elos) => {
  return playerElos[playerId]?.[1];
};

export const getKdr = (player: PlayerStatsWithId) => {
  return player.categories.kills / player.categories.deaths;
};

export const getAdd = (player: PlayerStatsWithId) => {
  return player.categories.damagegiven / player.categories.deaths;
};

export const getAccuracy = (player: PlayerStatsWithId) => {
  return (player.categories.hits / player.categories.shots) * 100;
};

export const getWeaponAccuracy = (wstats: WStats) => {
  return (wstats.hits / wstats.shots) * 100;
};

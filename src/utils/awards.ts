import { MatchStatsResponse, Weapon } from "~/api/types";
import { isBaiter } from "./baiters";
import {
  groupsResponseToPlayers as matchResponseToPlayers,
  MatchStatPlayerStat,
} from "./teams";
import { getAccuracy, getKdr } from "./utils";

export const GameAwards = {
  Terminator: "Terminator",
  Slaugtherhouse: "Slaughterhouse",
  SlaugtherhouseLama: "Slaughterhouse Lama",
  SlyFox: "Sly Fox",
  Harakiri: "Harakiri",
  DesecratorOfCorpses: "Desecrator of corpses",
  Aimbot: "Aimbot",
  CrosshairConnoisseur: "Crosshair Connoisseur",
  Baiter: "Baiter",
  MP40: "Master of MP-40",
  Thompson: "King of Thompson",
  Panzer: "Panzer-Lama",
  SilentKiller: "Silent killer",
  Sniper: "Sharp-Shooter",
  Grenade: "Master of grenade",
  Smoker: "Best smoker",
  GodofWar: "God of war",
  Pistol: "John Wayne is Lama",
} as const;

export type Award = {
  name: (typeof GameAwards)[keyof typeof GameAwards];
  winner: {
    coloredName: string;
    name: string;
    value: number | string;
  };

  all: {
    coloredName: string;
    name: string;
    value: number | string;
  }[];
};

export type WeaponAward = Award & {
  weapon: Weapon;
};

const getPlayerNameById = (playerId: string, match: MatchStatsResponse) => {
  for (const statRow of match.statsall) {
    const [currentPlayerId] = Object.keys(statRow);
    if (playerId === currentPlayerId) {
      return statRow[playerId].alias;
    }
  }

  return "";
};

const getColoredPlayerNameById = (
  playerId: string,
  match: MatchStatsResponse,
) => {
  for (const statRow of match.statsall) {
    const [currentPlayerId] = Object.keys(statRow);
    if (playerId === currentPlayerId) {
      return statRow[playerId].alias_colored;
    }
  }

  return "";
};

const getWeaponAward = (
  name: (typeof GameAwards)[keyof typeof GameAwards],
  weapon: Weapon | Weapon[],
  groups: MatchStatsResponse,
) => {
  const award = groups.wstatsall.reduce(
    (acc, player, idx, arr) => {
      const [playerId] = Object.keys(player);
      const wstats = player[playerId];

      const getCountForWeapon = (weapon: Weapon) => {
        return wstats.find((w) => w.weapon === weapon)?.kills || 0;
      };

      const value = Array.isArray(weapon)
        ? weapon.reduce((acc, w) => acc + getCountForWeapon(w), 0)
        : getCountForWeapon(weapon);

      const playerName = getPlayerNameById(playerId, groups);
      const coloredPlayerName = getColoredPlayerNameById(playerId, groups);

      if (value && playerName) {
        acc.all.push({
          value,
          name: playerName,
          coloredName: coloredPlayerName,
        });
      }

      if (idx === arr.length - 1) {
        acc.all.sort((a, b) => (b.value as number) - (a.value as number));
        acc.winner = acc.all[0];
      }

      return acc;
    },
    {
      name,
      all: [],
      winner: { value: 0, name: "", coloredName: "" },
      weapon,
    } as WeaponAward,
  );

  if (!award.winner) {
    return;
  }

  return award;
};

export const getWeaponAwards = (match: MatchStatsResponse) => {
  const masterOfMp40 = getWeaponAward(GameAwards.MP40, "MP-40", match);
  const kingOfThompson = getWeaponAward(GameAwards.Thompson, "Thompson", match);
  const panzerLama = getWeaponAward("Panzer-Lama", "Panzer", match);
  const sharpShooter = getWeaponAward(GameAwards.Sniper, "Mauser", match);
  const masterOfGrenade = getWeaponAward(GameAwards.Grenade, "Grenade", match);
  const indianSmokeMessenger = getWeaponAward(
    GameAwards.Smoker,
    "Airstrike",
    match,
  );
  const godOfWar = getWeaponAward("God of war", "Artillery", match);
  const silentKiller = getWeaponAward("Silent killer", "Knife", match);
  const johnWayne = getWeaponAward(GameAwards.Pistol, ["Luger", "Colt"], match);

  return [
    masterOfMp40,
    kingOfThompson,
    panzerLama,
    sharpShooter,
    masterOfGrenade,
    indianSmokeMessenger,
    godOfWar,
    silentKiller,
    johnWayne,
  ].filter(Boolean) as WeaponAward[];
};

const getTerminatorAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse,
): Award => {
  const all = players
    .map((player) => ({
      count: getKdr(player),
      name: getPlayerNameById(player.id, match),
      coloredName: getColoredPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.count - a.count)
    .map((player) => ({ ...player, value: player.count.toFixed(2) }));

  return {
    name: GameAwards.Terminator,
    all,
    winner: all[0],
  };
};

const getSlaughterhouseAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse,
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.kills,
      name: getPlayerNameById(player.id, match),
      coloredName: getColoredPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);

  const winner = all[0];

  return {
    name: GameAwards.Slaugtherhouse,
    all,
    winner,
  };
};

const getSlaughterhouseLamaAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse,
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.deaths,
      name: getPlayerNameById(player.id, match),
      coloredName: getColoredPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);

  const winner = all[0];

  return {
    name: GameAwards.SlaugtherhouseLama,
    all,
    winner,
  };
};

const getSlyFoxAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse,
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.deaths,
      name: getPlayerNameById(player.id, match),
      coloredName: getColoredPlayerNameById(player.id, match),
    }))
    .sort((a, b) => a.value - b.value);
  const winner = all[0];

  return {
    name: GameAwards.SlyFox,
    all,
    winner,
  };
};

const getHarakiriAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse,
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.suicides,
      name: getPlayerNameById(player.id, match),
      coloredName: getColoredPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);
  const winner = all[0];
  return {
    name: GameAwards.Harakiri,
    all,
    winner,
  };
};

const getDesecratorAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse,
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.gibs,
      name: getPlayerNameById(player.id, match),
      coloredName: getColoredPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);
  const winner = all[0];

  return {
    name: GameAwards.DesecratorOfCorpses,
    winner,
    all,
  };
};

const getAimbotAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse,
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.headshots,
      name: getPlayerNameById(player.id, match),
      coloredName: getColoredPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);
  const winner = all[0];

  return {
    name: GameAwards.Aimbot,
    winner,
    all,
  };
};

const getCrosshairConnoisseur = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse,
): Award => {
  const isNotPanzerPlayer = (player: MatchStatPlayerStat) => {
    const panz = player.weaponStats.find((w) => w.weapon === "Panzer");
    if (panz && panz.shots > 4) {
      return false;
    }

    return true;
  };

  const all = players
    .filter(isNotPanzerPlayer)
    .map((player) => ({
      value: getAccuracy(player),
      name: getPlayerNameById(player.id, match),
      coloredName: getColoredPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value)
    .map((player) => ({ ...player, value: `${player.value.toFixed(1)}%` }));
  const winner = all[0];

  return {
    name: GameAwards.CrosshairConnoisseur,
    winner,
    all,
  };
};

const getBaiter = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse,
): Award | undefined => {
  const all = players.filter(isBaiter).map((player) => ({
    value: ``,
    name: getPlayerNameById(player.id, match),
    coloredName: getColoredPlayerNameById(player.id, match),
  }));
  const winner = all[0];

  if (!winner) {
    return;
  }

  return {
    name: GameAwards.Baiter,
    winner,
    all,
  };
};

const getMainAwards = (match: MatchStatsResponse) => {
  const players = matchResponseToPlayers(match);

  const terminator = getTerminatorAward(players, match);
  const slaughterhouse = getSlaughterhouseAward(players, match);
  const slaughterhouseLama = getSlaughterhouseLamaAward(players, match);
  const slyFox = getSlyFoxAward(players, match);
  const harakiri = getHarakiriAward(players, match);
  const desecrator = getDesecratorAward(players, match);
  const aimbot = getAimbotAward(players, match);
  const crosshairConnoiseur = getCrosshairConnoisseur(players, match);
  const baiter = getBaiter(players, match);

  const awards = [
    terminator,
    slaughterhouse,
    slaughterhouseLama,
    slyFox,
    harakiri,
    desecrator,
    aimbot,
    crosshairConnoiseur,
    baiter,
  ].filter(Boolean);

  return awards as Award[];
};

export const getAwards = (match: MatchStatsResponse) => {
  const weaponAwards = getWeaponAwards(match);
  const mainAwards = getMainAwards(match);

  return { mainAwards, weaponAwards };
};

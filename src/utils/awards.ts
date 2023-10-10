import { MatchStatsResponse, Weapon } from "~/api/types";
import {
  groupsResponseToPlayers as matchResponseToPlayers,
  MatchStatPlayerStat,
} from "./teams";
import { getKdr } from "./utils";

export type Award = {
  name: string;
  description: string;
  winner: {
    name: string;
    value: number | string;
  };

  all: {
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

const getWeaponAward = (
  name: string,
  description: string,
  weapon: Weapon | Weapon[],
  groups: MatchStatsResponse
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

      if (value && playerName) {
        acc.all.push({ value, name: playerName });
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
      description,
      winner: { value: 0, name: "" },
      weapon,
    } as WeaponAward
  );

  if (!award.winner) {
    return;
  }

  return award;
};

export const getWeaponAwards = (match: MatchStatsResponse) => {
  const masterOfMp40 = getWeaponAward(
    "Master of MP-40",
    "frags",
    "MP-40",
    match
  );
  const kingOfThompson = getWeaponAward(
    "King of Thompson",
    "frags",
    "Thompson",
    match
  );
  const panzerLama = getWeaponAward("Panzer-Lama", "frags", "Panzer", match);
  const sharpShooter = getWeaponAward(
    "Sharp-Shooter",
    "frags",
    "Mauser",
    match
  );
  const masterOfGrenade = getWeaponAward(
    "Master of grenade",
    "frags",
    "Grenade",
    match
  );
  const indianSmokeMessenger = getWeaponAward(
    "Best smoker",
    "frags",
    "Airstrike",
    match
  );
  const godOfWar = getWeaponAward("God of war", "frags", "Artillery", match);
  const silentKiller = getWeaponAward("Silent killer", "frags", "Knife", match);
  const johnWayne = getWeaponAward(
    "John Wayne is Lama",
    "frags",
    ["Luger", "Colt"],
    match
  );

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
  match: MatchStatsResponse
): Award => {
  const all = players
    .map((player) => ({
      count: getKdr(player),
      name: getPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.count - a.count)
    .map((player) => ({ ...player, value: player.count.toFixed(2) }));

  return {
    name: "Terminator",
    description: "highest KDR",
    all,
    winner: all[0],
  };
};

const getSlaughterhouseAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.kills,
      name: getPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);

  const winner = all[0];

  return {
    name: "Slaughterhouse",
    description: "most kills",
    all,
    winner,
  };
};

const getSlaughterhouseLamaAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.deaths,
      name: getPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);

  const winner = all[0];

  return {
    name: "Slaughterhouse Lama",
    description: "most deaths",
    all,
    winner,
  };
};

const getSlyFoxAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.deaths,
      name: getPlayerNameById(player.id, match),
    }))
    .sort((a, b) => a.value - b.value);
  const winner = all[0];

  return {
    name: "Sly Fox",
    description: "least deaths",
    all,
    winner,
  };
};

const getHarakiriAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.suicides,
      name: getPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);
  const winner = all[0];
  return {
    name: "Harakiri",
    description: "most suicides",
    all,
    winner,
  };
};

const getDesecratorAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.gibs,
      name: getPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);
  const winner = all[0];

  return {
    name: "Desecrator of corpses",
    description: "most gibs",
    winner,
    all,
  };
};

const getAimbotAward = (
  players: MatchStatPlayerStat[],
  match: MatchStatsResponse
): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.headshots,
      name: getPlayerNameById(player.id, match),
    }))
    .sort((a, b) => b.value - a.value);
  const winner = all[0];

  return {
    name: "Aimbot",
    description: "most headshots",
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

  return [
    terminator,
    slaughterhouse,
    slaughterhouseLama,
    slyFox,
    harakiri,
    desecrator,
    aimbot,
  ];
};

export const getAwards = (match: MatchStatsResponse) => {
  const weaponAwards = getWeaponAwards(match);
  const mainAwards = getMainAwards(match);

  return { mainAwards, weaponAwards };
};

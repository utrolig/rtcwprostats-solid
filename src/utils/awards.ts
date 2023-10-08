import { GroupsResponse, Weapon } from "~/api/types";
import { PlayerStatsFull, groupsResponseToPlayers } from "./teams";
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

const getWeaponAward = (
  name: string,
  description: string,
  weapon: Weapon | Weapon[],
  groups: GroupsResponse
) => {
  return groups.wstatsall.reduce(
    (acc, player, idx, arr) => {
      const [playerId] = Object.keys(player);
      const wstats = player[playerId];

      const getCountForWeapon = (weapon: Weapon) => {
        return wstats.find((w) => w.weapon === weapon)?.kills || 0;
      };

      const value = Array.isArray(weapon)
        ? weapon.reduce((acc, w) => acc + getCountForWeapon(w), 0)
        : getCountForWeapon(weapon);

      const [playerName] = groups.elos[playerId];

      if (value && playerName) {
        acc.all.push({ value, name: playerName });
      }

      if (idx === arr.length - 1) {
        acc.all.sort((a, b) => (b.value as number) - (a.value as number));
        acc.winner = acc.all[0];
      }

      return acc;
    },
    { name, all: [], description, winner: { value: 0, name: "" } } as Award
  );
};

export const getWeaponAwards = (groups: GroupsResponse) => {
  const masterOfMp40 = getWeaponAward(
    "Master of MP-40",
    "frags",
    "MP-40",
    groups
  );
  const kingOfThompson = getWeaponAward(
    "King of Thompson",
    "frags",
    "Thompson",
    groups
  );
  const panzerLama = getWeaponAward("Panzer-Lama", "frags", "Panzer", groups);
  const sharpShooter = getWeaponAward(
    "Sharp-Shooter",
    "frags",
    "Mauser",
    groups
  );
  const masterOfGrenade = getWeaponAward(
    "Master of grenade",
    "frags",
    "Grenade",
    groups
  );
  const indianSmokeMessenger = getWeaponAward(
    "Best Indian smoke-messenger",
    "frags",
    "Airstrike",
    groups
  );
  const godOfWar = getWeaponAward("God of war", "frags", "Artillery", groups);
  const silentKiller = getWeaponAward(
    "Silent killer",
    "frags",
    "Knife",
    groups
  );
  const johnWayne = getWeaponAward(
    "John Wayne is Lama",
    "frags",
    ["Luger", "Colt"],
    groups
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
  ];
};

const getTerminatorAward = (players: PlayerStatsFull[]): Award => {
  const all = players
    .map((player) => ({
      count: getKdr(player),
      name: player.alias,
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

const getSlaughterhouseAward = (players: PlayerStatsFull[]): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.kills,
      name: player.alias,
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

const getSlaughterhouseLamaAward = (players: PlayerStatsFull[]): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.deaths,
      name: player.alias,
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

const getSlyFoxAward = (players: PlayerStatsFull[]): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.deaths,
      name: player.alias,
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

const getHarakiriAward = (players: PlayerStatsFull[]): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.suicides,
      name: player.alias,
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

const getDesecratorAward = (players: PlayerStatsFull[]): Award => {
  const all = players
    .map((player) => ({
      value: player.categories.gibs,
      name: player.alias,
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

const getMainAwards = (groups: GroupsResponse) => {
  const players = groupsResponseToPlayers(groups);

  const terminator = getTerminatorAward(players);
  const slaughterhouse = getSlaughterhouseAward(players);
  const slaughterhouseLama = getSlaughterhouseLamaAward(players);
  const slyFox = getSlyFoxAward(players);
  const harakiri = getHarakiriAward(players);
  const desecrator = getDesecratorAward(players);

  return [
    terminator,
    slaughterhouse,
    slaughterhouseLama,
    slyFox,
    harakiri,
    desecrator,
  ];
};

export const getAwards = (groups: GroupsResponse) => {
  const weaponAwards = getWeaponAwards(groups);
  const mainAwards = getMainAwards(groups);

  return { mainAwards, weaponAwards };
};

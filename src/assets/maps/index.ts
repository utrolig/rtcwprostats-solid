import mp_beach from "./mp_beach.png";
import mp_ice from "./mp_ice.png";
import mp_sub from "./mp_sub.png";
import te_frostbite from "./te_frostbite.png";
import te_ufo from "./te_ufo.png";

const mapRecord: Record<string, string> = {
  mp_beach,
  mp_ice,
  mp_sub,
  te_frostbite,
  te_ufo,
};

const mapArray = Object.values(mapRecord);

export const getMapImage = (mapName: string) => {
  if (mapRecord[mapName]) {
    return mapRecord[mapName];
  }

  return mapArray[Math.floor(Math.random() * 100) % mapArray.length];
};

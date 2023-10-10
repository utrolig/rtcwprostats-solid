import adlernest from "./adlernest.jpg";
import assault from "./assault.jpg";
import base from "./base.jpg";
import beach from "./beach.jpg";
import bremen from "./bremen.jpg";
import bunker from "./brewdog.jpg";
import chateau from "./chateau.jpg";
import escape from "./escape.jpg";
import frostafari from "./frostafari.jpg";
import frostbite from "./frostbite.jpg";
import goldrush from "./goldrush.jpg";
import ice from "./ice.jpg";
import nordic from "./nordic.jpg";
import operation from "./operation.jpg";
import radar from "./radar.jpg";
import sub from "./sub.jpg";
import tram2 from "./tram2.jpg";
import village from "./village.jpg";

const mapRecord: Record<string, string> = {
  adlernest,
  assault,
  base,
  beach,
  bremen,
  bunker,
  chateau,
  escape,
  frostafari,
  frostbite,
  goldrush,
  ice,
  nordic,
  operation,
  radar,
  sub,
  tram2,
  village,
};

const mapArray = Object.values(mapRecord);

export const getMapImage = (mapName?: string) => {
  if (!mapName) {
    return;
  }

  const mapKeys = Object.keys(mapRecord);

  for (const key of mapKeys) {
    if (mapName?.includes(key)) {
      return mapRecord[key];
    }
  }

  return mapArray[Math.floor(Math.random() * 100) % mapArray.length];
};

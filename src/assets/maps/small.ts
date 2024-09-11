import adlernest from "./adlernest.jpg?w=285&h=160&format=png&imagetools";
import assault from "./assault.jpg?w=285&h=160&format=png&imagetools";
import base from "./base.jpg?w=285&h=160&format=png&imagetools";
import beach from "./beach.jpg?w=285&h=160&format=png&imagetools";
import bremen from "./bremen.jpg?w=285&h=160&format=png&imagetools";
import bunker from "./brewdog.jpg?w=285&h=160&format=png&imagetools";
import chateau from "./chateau.jpg?w=285&h=160&format=png&imagetools";
import escape from "./escape.jpg?w=285&h=160&format=png&imagetools";
import frostafari from "./frostafari.jpg?w=285&h=160&format=png&imagetools";
import frostbite from "./frostbite.jpg?w=285&h=160&format=png&imagetools";
import goldrush from "./goldrush.jpg?w=285&h=160&format=png&imagetools";
import ice from "./ice.jpg?w=285&h=160&format=png&imagetools";
import nordic from "./nordic.jpg?w=285&h=160&format=png&imagetools";
import operation from "./operation.jpg?w=285&h=160&format=png&imagetools";
import radar from "./radar.jpg?w=285&h=160&format=png&imagetools";
import sub from "./sub.jpg?w=285&h=160&format=png&imagetools";
import tram2 from "./tram2.jpg?w=285&h=160&format=png&imagetools";
import village from "./village.jpg?w=285&h=160&format=png&imagetools";
import cipher from "./cipher.jpg?w=285&h=160&format=png&imagetools";

const mapRecord: Record<string, string> = {
  adlernest,
  assault,
  base,
  beach,
  bremen,
  bunker,
  chateau,
  cipher,
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

export const getSmallMapImage = (mapName?: string) => {
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

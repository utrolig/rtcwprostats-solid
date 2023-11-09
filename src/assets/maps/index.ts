import adlernest from "./adlernest.jpg?w=854&h=480&format=avif&imagetools";
import assault from "./assault.jpg?w=854&h=480&format=avif&imagetools";
import base from "./base.jpg?w=854&h=480&format=avif&imagetools";
import beach from "./beach.jpg?w=854&h=480&format=avif&imagetools";
import bremen from "./bremen.jpg?w=854&h=480&format=avif&imagetools";
import bunker from "./brewdog.jpg?w=854&h=480&format=avif&imagetools";
import chateau from "./chateau.jpg?w=854&h=480&format=avif&imagetools";
import escape from "./escape.jpg?w=854&h=480&format=avif&imagetools";
import frostafari from "./frostafari.jpg?w=854&h=480&format=avif&imagetools";
import frostbite from "./frostbite.jpg?w=854&h=480&format=avif&imagetools";
import goldrush from "./goldrush.jpg?w=854&h=480&format=avif&imagetools";
import ice from "./ice.jpg?w=854&h=480&format=avif&imagetools";
import nordic from "./nordic.jpg?w=854&h=480&format=avif&imagetools";
import operation from "./operation.jpg?w=854&h=480&format=avif&imagetools";
import radar from "./radar.jpg?w=854&h=480&format=avif&imagetools";
import sub from "./sub.jpg?w=854&h=480&format=avif&imagetools";
import tram2 from "./tram2.jpg?w=854&h=480&format=avif&imagetools";
import village from "./village.jpg?w=854&h=480&format=avif&imagetools";

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

import { GameClass } from "~/api/types";
import Engineer from "./ic_engineer.png?w=64&h=64&format=avif&imagetools";
import Sniper from "./ic_covertops.png?w=64&h=64&format=avif&imagetools";
import Medic from "./ic_medic.png?w=64&h=64&format=avif&imagetools";
import LT from "./ic_fieldops.png?w=64&h=64&format=avif&imagetools";
import Panzer from "./ic_soldier.png?w=64&h=64&format=avif&imagetools";

export const classIcons: Record<GameClass, string> = {
  Engineer,
  Sniper,
  Medic,
  LT,
  Panzer,
  Mixed: Medic,
};

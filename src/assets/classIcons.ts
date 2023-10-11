import { GameClass } from "~/api/types";
import Engineer from "./ic_engineer.png";
import Sniper from "./ic_covertops.png";
import Medic from "./ic_medic.png";
import LT from "./ic_fieldops.png";
import Panzer from "./ic_soldier.png";

export const classIcons: Record<GameClass, string> = {
  Engineer,
  Sniper,
  Medic,
  LT,
  Panzer,
  Mixed: Medic,
};

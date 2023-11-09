import { Weapon } from "~/api/types";
import Luger from "./iconw_luger.svg";
import MP40 from "./iconw_MP40.svg";
import Knife from "./iconw_knife.svg";
import Panzer from "./iconw_panzerfaust.svg";
import Thompson from "./iconw_thompson.svg";
import Grenade from "./iconw_pineapple.svg";
import Airstrike from "./iconw_smokegrenade.svg";
import Artillery from "./iconw_binoculars.svg";
import Colt from "./iconw_colt.svg";
import Dynamite from "./iconw_dynamite.svg";
import Syringe from "./iconw_syringe.svg";
import Sten from "./iconw_sten.svg";
import Mauser from "./iconw_mauser.svg";

export const WeaponImagesSvg: Record<Weapon, string> = {
  Luger,
  "MP-40": MP40,
  Knife,
  Panzer,
  Thompson,
  Grenade,
  Airstrike,
  Artillery,
  Colt,
  Dynamite,
  Syringe,
  Sten,
  Mauser,
};

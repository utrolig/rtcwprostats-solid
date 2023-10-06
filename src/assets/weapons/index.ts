import { Weapon } from "~/api/types";
import Luger from "./iconw_luger.png";
import MP40 from "./iconw_MP40.png";
import Knife from "./iconw_knife.png";
import Panzer from "./iconw_panzerfaust.png";
import Thompson from "./iconw_thompson.png";
import Grenade from "./iconw_pineapple.png";
import Airstrike from "./iconw_smokegrenade.png";
import Artillery from "./iconw_binoculars.png";
import Colt from "./iconw_colt.png";
import Dynamite from "./iconw_dynamite.png";
import Syringe from "./iconw_syringe.png";

export const WeaponImages: Record<Weapon, string> = {
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
};

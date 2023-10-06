import { Faction } from "~/api/types";
import alliesFlag from "./allies_flag.jpg";
import axisFlag from "./axis_flag.jpg";

export const factionImages: Record<Faction, string> = {
  Allied: alliesFlag,
  Axis: axisFlag,
};

import { Faction } from "~/api/types";
import alliesFlag from "./allies_flag.jpg?w=256&h=196&format=avif&imagetools";
import axisFlag from "./axis_flag.jpg?w=256&h=196&format=avif&imagetools";

export const factionImages: Record<Faction, string> = {
  Allied: alliesFlag,
  Axis: axisFlag,
};

import { Faction } from "~/api/types";

export const toReadableFaction = (faction: Faction) => {
  switch (faction) {
    case "Allied": {
      return "Allies";
    }

    case "Axis": {
      return "Axis";
    }
  }
};

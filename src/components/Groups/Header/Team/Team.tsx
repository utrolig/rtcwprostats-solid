import { PlayerStatsWithId } from "~/utils/teams";
import styles from "./Team.module.css";
import { Component, For } from "solid-js";
import { PlayerRow } from "../PlayerRow/PlayerRow";
import { Faction } from "~/api/types";
import alliesFlag from "../../../../assets/allies_flag.jpg";
import axisFlag from "../../../../assets/axis_flag.jpg";

const factionImages: Record<Faction, string> = {
  Allied: alliesFlag,
  Axis: axisFlag,
};

export type TeamProps = {
  players: PlayerStatsWithId[];
  faction: Faction;
};

export const Team: Component<TeamProps> = (props) => {
  const toReadableFaction = (faction: Faction) => {
    switch (faction) {
      case "Allied": {
        return "Allies";
      }

      case "Axis": {
        return "Axis";
      }
    }
  };

  return (
    <div class={styles.container}>
      <div class={styles.factionContainer}>
        <img src={factionImages[props.faction]} class={styles.factionImage} />
        <h3 class={styles.faction}>{toReadableFaction(props.faction)}</h3>
      </div>
      <For each={props.players}>
        {(player) => <PlayerRow player={player} />}
      </For>
    </div>
  );
};

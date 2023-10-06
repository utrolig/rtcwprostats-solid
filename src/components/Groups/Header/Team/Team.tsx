import { PlayerStatsWithId } from "~/utils/teams";
import styles from "./Team.module.css";
import { Component, For } from "solid-js";
import { PlayerRow } from "../PlayerRow/PlayerRow";
import { Faction } from "~/api/types";
import { factionImages } from "~/assets/factionImages";
import { toReadableFaction } from "~/utils/faction";

export type TeamProps = {
  players: PlayerStatsWithId[];
  faction: Faction;
};

export const Team: Component<TeamProps> = (props) => {
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

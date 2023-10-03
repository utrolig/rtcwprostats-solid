import { PlayerStatsWithId, getMatchResult } from "~/utils/teams";
import styles from "./Team.module.css";
import { Component, For, createMemo } from "solid-js";
import { PlayerRow } from "../PlayerRow/PlayerRow";
import { Faction } from "~/api/types";

export type TeamProps = {
  players: PlayerStatsWithId[];
  faction: Faction;
};

export const Team: Component<TeamProps> = (props) => {
  return (
    <div class={styles.container}>
      <h3 class={styles.faction}>{props.faction}</h3>
      <For each={props.players}>
        {(player) => <PlayerRow player={player} />}
      </For>
    </div>
  );
};

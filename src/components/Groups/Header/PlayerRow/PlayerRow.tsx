import { Component } from "solid-js";
import styles from "./PlayerRow.module.css";
import { PlayerStatsWithId } from "~/utils/teams";

type PlayerRowProps = {
  player: PlayerStatsWithId;
};

export const PlayerRow: Component<PlayerRowProps> = (props) => {
  return <div class={styles.player}>{props.player.alias}</div>;
};

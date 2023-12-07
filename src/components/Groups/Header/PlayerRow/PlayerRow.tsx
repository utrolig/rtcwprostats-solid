import { Component, For, Show } from "solid-js";
import styles from "./PlayerRow.module.css";
import { PlayerStatsWithId } from "~/utils/teams";
import { getColoredNameParts } from "~/utils/colors";

type PlayerRowProps = {
  player: PlayerStatsWithId;
};

export const PlayerRow: Component<PlayerRowProps> = (props) => {
  return (
    <Show
      keyed
      fallback={<div class={styles.player}>{props.player.alias}</div>}
      when={props.player.alias_colored}
    >
      {(coloredName) => (
        <div class={styles.player}>
          <For each={getColoredNameParts(coloredName)}>
            {(part) => <span style={{ color: part.color }}>{part.text}</span>}
          </For>
        </div>
      )}
    </Show>
  );
};

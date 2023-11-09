import { Component, Show, For } from "solid-js";
import { Faction, Team } from "~/api/types";
import logoSrc from "~/assets/rtcw-pro-logo.svg";
import styles from "./MatchResult.module.css";

type MatchResultProps = {
  factions: Record<Team, Faction>;
  result: Record<Team, number>;
  maps: string[];
};

export const MatchResult: Component<MatchResultProps> = (props) => {
  const isWinner = (team: Team) => {
    if (team === "TeamA") {
      return props.result.TeamA > props.result.TeamB;
    }

    return props.result.TeamB > props.result.TeamA;
  };

  const isDraw = () => {
    return props.result.TeamA === props.result.TeamB;
  };

  const getAllMaps = () => props.maps.filter(Boolean);

  return (
    <div class={styles.container}>
      <img class={styles.logo} src={logoSrc} />
      <div class={styles.result}>
        <p
          classList={{
            [styles.winner]: isWinner("TeamA"),
            [styles.draw]: isDraw(),
          }}
        >
          {props.result.TeamA}
        </p>
        <span>:</span>
        <p
          classList={{
            [styles.winner]: isWinner("TeamB"),
            [styles.draw]: isDraw(),
          }}
        >
          {props.result.TeamB}
        </p>
      </div>
      <div
        classList={{
          [styles.maps]: true,
          [styles.manyMaps]: getAllMaps().length > 2,
        }}
      >
        <span>{getAllMaps()[0]}</span>
        <Show when={getAllMaps().length > 2}>
          <For each={getAllMaps().slice(1)}>{(map) => <span>{map}</span>}</For>
        </Show>
        <Show when={getAllMaps().length === 2}>
          <span>/</span>
          <span>{getAllMaps()[1]}</span>
        </Show>
      </div>
    </div>
  );
};

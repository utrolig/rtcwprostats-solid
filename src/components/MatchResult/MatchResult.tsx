import { Component, createMemo } from "solid-js";
import { Faction, Team } from "~/api/types";
import styles from "./MatchResult.module.css";

type MatchResultProps = {
  factions: Record<Team, Faction>;
  result: Record<Team, number>;
  maps: string[];
};

export const MatchResult: Component<MatchResultProps> = (props) => {
  const actualResult = createMemo(() => {
    const maps = [props.maps[0], props.maps[1]];
    if (props.factions.TeamA === "Allied") {
      return {
        Allied: props.result.TeamA,
        Axis: props.result.TeamB,
        maps,
      };
    }

    return {
      Allied: props.result.TeamB,
      Axis: props.result.TeamA,
      maps,
    };
  });
  return (
    <div class={styles.container}>
      <div class={styles.result}>
        <p>{actualResult().Allied}</p>
        <span>:</span>
        <p>{actualResult().Axis}</p>
      </div>
      <div class={styles.maps}>
        {actualResult().maps[0]} / {actualResult().maps[1]}
      </div>
    </div>
  );
};

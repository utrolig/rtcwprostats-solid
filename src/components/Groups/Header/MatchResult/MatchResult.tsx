import { Component, createMemo } from "solid-js";
import { Faction, Team } from "~/api/types";
import logoSrc from "~/assets/rtcw-pro-logo.svg";
import styles from "./MatchResult.module.css";

type MatchResultProps = {
  factions: Record<Team, Faction>;
  result: Record<Team, number>;
  maps: string[];
};

export const MatchResult: Component<MatchResultProps> = (props) => {
  const isWinner = (faction: Faction) => {
    if (props.factions.TeamA === faction) {
      return props.result.TeamA > props.result.TeamB;
    }

    return props.result.TeamB > props.result.TeamA;
  };

  const isDraw = () => {
    return props.result.TeamA === props.result.TeamB;
  };

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
      <img class={styles.logo} src={logoSrc} />
      <div class={styles.result}>
        <p
          classList={{
            [styles.winner]: isWinner("Allied"),
            [styles.draw]: isDraw(),
          }}
        >
          {actualResult().Allied}
        </p>
        <span>:</span>
        <p
          classList={{
            [styles.winner]: isWinner("Axis"),
            [styles.draw]: isDraw(),
          }}
        >
          {actualResult().Axis}
        </p>
      </div>
      <div class={styles.maps}>
        {actualResult().maps[0]} / {actualResult().maps[1]}
      </div>
    </div>
  );
};

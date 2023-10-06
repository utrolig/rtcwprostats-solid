import { Elos, PlayerStats } from "~/api/types";
import styles from "./TablePlayerRow.module.css";
import { PlayerStatsWithId } from "~/utils/teams";
import { eloToRank, rankColors } from "~/utils/elo";

type TablePlayerRowProps = {
  player: PlayerStatsWithId;
  playerElos: Elos;
};

export const TablePlayerRow = (props: TablePlayerRowProps) => {
  const getElo = () => {
    return props.playerElos[props.player.id]?.[1];
  };

  const getKdr = () => {
    return (
      props.player.categories.kills / props.player.categories.deaths
    ).toFixed(2);
  };

  return (
    <div class={styles.row}>
      <div classList={{ [styles.cell]: true, [styles.name]: true }}>
        <h4>{props.player.alias}</h4>
        <div class={styles.rank}>
          <span style={{ color: rankColors[eloToRank(getElo())] }}>
            {getElo()}
          </span>
          <span>{eloToRank(getElo())}</span>
        </div>
      </div>
      <div classList={{ [styles.cell]: true, [styles.kdr]: true }}>
        {getKdr()}
      </div>
      <div classList={{ [styles.cell]: true, [styles.deaths]: true }}>
        {props.player.categories.kills}
      </div>
      <div classList={{ [styles.cell]: true, [styles.deaths]: true }}>
        {props.player.categories.deaths}
      </div>
    </div>
  );
};

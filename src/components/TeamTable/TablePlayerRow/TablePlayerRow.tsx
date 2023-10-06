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

  return (
    <div class={styles.row}>
      <div classList={{ [styles.cell]: true, [styles.name]: true }}>
        <h4>{props.player.alias}</h4>
        <div class={styles.rank}>
          <span>{getElo()}</span>
          <span style={{ color: rankColors[eloToRank(getElo())] }}>
            {eloToRank(getElo())}
          </span>
        </div>
      </div>
      <div class={styles.cell}>{props.player.categories.kills}</div>
      <div class={styles.cell}>{props.player.categories.deaths}</div>
    </div>
  );
};

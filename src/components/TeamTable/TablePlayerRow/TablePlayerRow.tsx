import { Elos } from "~/api/types";
import styles from "./TablePlayerRow.module.css";
import { PlayerStatsWithClass } from "~/utils/teams";
import { eloToRank, rankColors } from "~/utils/elo";
import { Show } from "solid-js";
import { classIcons } from "~/assets/classIcons";
import { getAccuracy, getAdd, getElo, getKdr } from "~/utils/utils";

type TablePlayerRowProps = {
  player: PlayerStatsWithClass;
  playerElos: Elos;
};

export const TablePlayerRow = (props: TablePlayerRowProps) => {
  return (
    <div class={styles.row}>
      <div classList={{ [styles.cell]: true, [styles.name]: true }}>
        <img src={classIcons[props.player.class]} class={styles.classIcon} />
        <div class={styles.nameContainer}>
          <h4>{props.player.alias}</h4>
          <div class={styles.rank}>
            <Show when={getElo(props.player.id, props.playerElos) > 0}>
              <span
                style={{
                  color:
                    rankColors[
                      eloToRank(getElo(props.player.id, props.playerElos))
                    ],
                }}
              >
                {getElo(props.player.id, props.playerElos)}
              </span>
              <span>
                {eloToRank(getElo(props.player.id, props.playerElos))}
              </span>
            </Show>
            <Show when={getElo(props.player.id, props.playerElos) <= 0}>
              <span>Unranked</span>
            </Show>
          </div>
        </div>
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.kdr]: true,
          [styles.number]: true,
          [styles.green]: getKdr(props.player) >= 1,
          [styles.red]: getKdr(props.player) < 1,
        }}
      >
        {getKdr(props.player).toFixed(2)}
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.kills]: true,
          [styles.number]: true,
        }}
      >
        {props.player.categories.kills}
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.deaths]: true,
          [styles.number]: true,
        }}
      >
        {props.player.categories.deaths}
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.add]: true,
          [styles.number]: true,
        }}
      >
        {getAdd(props.player).toFixed(0)}
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.damageDone]: true,
          [styles.number]: true,
        }}
      >
        {props.player.categories.damagegiven.toFixed(0)}
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.damageReceived]: true,
          [styles.number]: true,
        }}
      >
        {props.player.categories.damagereceived.toFixed(0)}
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.revives]: true,
          [styles.number]: true,
        }}
      >
        {props.player.categories.revives.toFixed(0)}
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.gibs]: true,
          [styles.number]: true,
        }}
      >
        {props.player.categories.gibs.toFixed(0)}
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.headshots]: true,
          [styles.number]: true,
        }}
      >
        {props.player.categories.headshots.toFixed(0)}
      </div>
      <div
        classList={{
          [styles.cell]: true,
          [styles.accuracy]: true,
          [styles.number]: true,
        }}
      >
        <span>{getAccuracy(props.player).toFixed(1)}</span>
        <span class={styles.percentSign}>%</span>
      </div>
    </div>
  );
};

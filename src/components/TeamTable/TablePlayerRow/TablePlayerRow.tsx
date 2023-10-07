import { Elos, Faction } from "~/api/types";
import styles from "./TablePlayerRow.module.css";
import { PlayerStatsFull, PlayerStatsWithClass } from "~/utils/teams";
import { eloToRank, rankColors } from "~/utils/elo";
import { Show, createSignal } from "solid-js";
import { classIcons } from "~/assets/classIcons";
import { getAccuracy, getAdd, getElo, getKdr } from "~/utils/utils";
import { TablePlayerWeaponStats } from "./TablePlayerWeaponStats";
import { Collapsible } from "@kobalte/core";
import { factionImages } from "~/assets/factionImages";

type TablePlayerRowProps = {
  player: PlayerStatsFull;
  playerElos: Elos;
  isOdd: boolean;
  faction?: Faction;
};

export const TablePlayerRow = (props: TablePlayerRowProps) => {
  const [isExpanded, setIsExpanded] = createSignal(false);

  return (
    <Collapsible.Root class={styles.collapsibleRoot}>
      <Collapsible.Trigger class={styles.collapsible}>
        <div
          onClick={() => setIsExpanded(!isExpanded())}
          classList={{ [styles.row]: true, [styles.odd]: props.isOdd }}
        >
          <div classList={{ [styles.cell]: true, [styles.name]: true }}>
            <img
              src={classIcons[props.player.class]}
              class={styles.classIcon}
            />
            <div class={styles.nameContainer}>
              <h4>
                <span>{props.player.alias}</span>
                <Show when={props.faction} keyed>
                  {(faction) => (
                    <img
                      src={factionImages[faction]}
                      class={styles.factionImage}
                    />
                  )}
                </Show>
              </h4>
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
      </Collapsible.Trigger>
      <Collapsible.Content class={styles.collapsibleContent}>
        <TablePlayerWeaponStats
          weaponStats={props.player.weaponStats}
          isOdd={props.isOdd}
        />
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

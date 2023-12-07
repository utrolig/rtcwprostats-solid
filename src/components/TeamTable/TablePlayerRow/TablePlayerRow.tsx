import { Elos, Faction, GameClass } from "~/api/types";
import styles from "./TablePlayerRow.module.css";
import { MatchStatPlayerStat } from "~/utils/teams";
import { eloToRank, rankColors } from "~/utils/elo";
import { For, Show, createSignal } from "solid-js";
import { classIcons } from "~/assets/classIcons";
import { getAccuracy, getAdd, getElo, getKdr } from "~/utils/utils";
import { TablePlayerWeaponStats } from "./TablePlayerWeaponStats";
import { Collapsible } from "@kobalte/core";
import { factionImages } from "~/assets/factionImages";
import { getColoredNameParts } from "~/utils/colors";

type TablePlayerRowProps = {
  player: MatchStatPlayerStat;
  playerClass?: GameClass;
  playerElos?: Elos;
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
            <Show
              when={props.playerClass}
              keyed
              fallback={<div class={styles.classIcon} />}
            >
              {(playerClass) => (
                <img src={classIcons[playerClass]} class={styles.classIcon} />
              )}
            </Show>
            <div class={styles.nameContainer}>
              <h4>
                <Show
                  keyed
                  when={props.player.alias_colored}
                  fallback={<span>{props.player.alias}</span>}
                >
                  {(coloredAlias) => (
                    <For each={getColoredNameParts(coloredAlias)}>
                      {(part) => (
                        <span style={{ color: part.color }}>{part.text}</span>
                      )}
                    </For>
                  )}
                </Show>

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
                <Show when={props.playerElos} keyed>
                  {(playerElos) => (
                    <>
                      <Show when={getElo(props.player.id, playerElos) > 0}>
                        <span
                          style={{
                            color:
                              rankColors[
                                eloToRank(getElo(props.player.id, playerElos))
                              ],
                          }}
                        >
                          {getElo(props.player.id, playerElos)}
                        </span>
                        <span>
                          {eloToRank(getElo(props.player.id, playerElos))}
                        </span>
                      </Show>
                      <Show when={getElo(props.player.id, playerElos) <= 0}>
                        <span>Unranked</span>
                      </Show>
                    </>
                  )}
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
              [styles.green]: true,
            }}
          >
            {props.player.categories.damagegiven.toFixed(0)}
          </div>
          <div
            classList={{
              [styles.cell]: true,
              [styles.damageReceived]: true,
              [styles.number]: true,
              [styles.red]: true,
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

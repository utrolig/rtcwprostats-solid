import { WStats } from "~/api/types";
import styles from "./TablePlayerWeaponStats.module.css";
import { For } from "solid-js";
import { WeaponImages } from "~/assets/weapons";
import { getAccuracy, getWeaponAccuracy } from "~/utils/utils";
import { WeaponImagesSvg } from "~/assets/weapons/svg";

export type TablePlayerWeaponStatsProps = {
  isOdd: boolean;
  weaponStats: WStats[];
};

export const TablePlayerWeaponStats = (props: TablePlayerWeaponStatsProps) => {
  const sortedWstatsByKills = () => {
    return [...props.weaponStats]
      .filter((wstat) => wstat.kills > 0)
      .sort((a, b) => {
        if (a.kills > b.kills) {
          return -1;
        }

        if (a.kills < b.kills) {
          return 1;
        }

        return 0;
      });
  };

  const getAccuracy = (shots: number, hits: number) => {
    return (hits / shots) * 100;
  };

  return (
    <div classList={{ [styles.container]: true, [styles.odd]: props.isOdd }}>
      <div classList={{ [styles.weaponStat]: true, [styles.header]: true }}>
        <div classList={{ [styles.cell]: true, [styles.weapon]: true }}>
          Weapon
        </div>
        <div classList={{ [styles.cell]: true, [styles.accuracy]: true }}>
          Accuracy
        </div>
        <div classList={{ [styles.cell]: true, [styles.hits]: true }}>
          Hits/Shots
        </div>
        <div classList={{ [styles.cell]: true, [styles.kills]: true }}>
          Kills
        </div>
        <div classList={{ [styles.cell]: true, [styles.deaths]: true }}>
          Deaths
        </div>
        <div classList={{ [styles.cell]: true, [styles.headshots]: true }}>
          HS
        </div>
      </div>
      <For each={sortedWstatsByKills()}>
        {(wstats) => (
          <div class={styles.weaponStat}>
            <div classList={{ [styles.cell]: true, [styles.weapon]: true }}>
              <img
                class={styles.weaponImage}
                src={WeaponImagesSvg[wstats.weapon]}
              />
              <span>{wstats.weapon}</span>
            </div>
            <div classList={{ [styles.cell]: true, [styles.accuracy]: true }}>
              {getAccuracy(wstats.shots, wstats.hits).toFixed(1)}
              <span class={styles.separator}>%</span>
            </div>
            <div classList={{ [styles.cell]: true, [styles.hits]: true }}>
              {wstats.hits}
              <span class={styles.separator}>/</span>
              {wstats.shots}
            </div>
            <div classList={{ [styles.cell]: true, [styles.kills]: true }}>
              {wstats.kills}
            </div>
            <div classList={{ [styles.cell]: true, [styles.deaths]: true }}>
              {wstats.deaths}
            </div>
            <div classList={{ [styles.cell]: true, [styles.headshots]: true }}>
              {wstats.headshots}
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

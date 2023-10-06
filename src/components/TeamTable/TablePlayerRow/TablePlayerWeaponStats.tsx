import { WStats } from "~/api/types";
import styles from "./TablePlayerWeaponStats.module.css";
import { For } from "solid-js";
import { WeaponImages } from "~/assets/weapons";
import { getWeaponAccuracy } from "~/utils/utils";

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

  return (
    <div classList={{ [styles.container]: true, [styles.odd]: props.isOdd }}>
      <For each={sortedWstatsByKills()}>
        {(wstats) => (
          <div class={styles.weaponStat}>
            <div class={styles.imageWrapper}>
              <img
                src={WeaponImages[wstats.weapon]}
                class={styles.weaponImage}
              />
            </div>
            <div>
              <h4 class={styles.title}>Kills</h4>
              <p class={styles.value}>{wstats.kills}</p>
            </div>
            <div>
              <h4 class={styles.title}>Accuracy</h4>
              <p class={styles.value}>
                {getWeaponAccuracy(wstats).toFixed(1)}%
              </p>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

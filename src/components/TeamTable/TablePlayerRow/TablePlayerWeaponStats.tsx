import { WStats } from "~/api/types";
import styles from "./TablePlayerWeaponStats.module.css";
import { For, createEffect } from "solid-js";
import { WeaponImagesSvg } from "~/assets/weapons/svg";
import { WeaponsSortOrder } from "~/utils/weapons";

export type TablePlayerWeaponStatsProps = {
  isOdd: boolean;
  weaponStats: WStats[];
};

export const TablePlayerWeaponStats = (props: TablePlayerWeaponStatsProps) => {
  const sortedWstatsByKills = () => {
    return [...props.weaponStats].sort((a, b) => {
      return WeaponsSortOrder[a.weapon] - WeaponsSortOrder[b.weapon];
    });
  };

  const getAccuracy = (shots: number, hits: number) => {
    const acc = (hits / shots) * 100;
    if (!isNaN(acc)) {
      return (
        <>
          <span>{acc.toFixed(1)}</span>
          <span class={styles.separator}>%</span>
        </>
      );
    }

    return "N/A";
  };

  createEffect(() => {
    console.log(props.weaponStats);
  });

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
              {getAccuracy(wstats.shots, wstats.hits)}
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

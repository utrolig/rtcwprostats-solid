import { createEffect, For, Show } from "solid-js";
import { A, useMatch } from "solid-start";
import { GroupsResponse } from "~/api/types";
import { useTranslation } from "~/i18n/context";
import styles from "./MatchSelector.module.css";

export type MatchSelectorProps = {
  groups: GroupsResponse;
};

export const MatchSelector = (props: MatchSelectorProps) => {
  const match = useMatch(() => "/groups/:groupId/:matchId");
  const t = useTranslation();

  const getIsMatchId = () => {
    const pathMatch = match();

    if (pathMatch?.params.matchId) {
      return true;
    }

    return false;
  };

  return (
    <ul class={styles.tabs}>
      <li>
        <A
          classList={{
            [styles.link]: true,
            [styles.active]: !getIsMatchId(),
          }}
          href=""
        >
          <h6>{t("match")}</h6>
        </A>
      </li>

      <For each={Object.entries(props.groups.match_summary.results)}>
        {([matchId, result], idx) => (
          <li>
            <A
              activeClass={styles.active}
              class={styles.link}
              href={`${matchId}`}
            >
              <h6> {t("round", { round: idx() + 1 })}</h6>
              <div class={styles.map}>
                <p>{result.map}</p>
                <div class={styles.mapTimes}>
                  <p>{result.round1.duration_nice}</p>
                  <Show when={result.round2}>
                    <span>/</span>
                    <p>{result.round2.duration_nice}</p>
                  </Show>
                </div>
              </div>
            </A>
          </li>
        )}
      </For>
    </ul>
  );
};

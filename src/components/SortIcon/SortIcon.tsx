import { Match, Switch } from "solid-js";
import { CaretDown } from "~/assets/icons/CaretDown";
import { CaretUp } from "~/assets/icons/CaretUp";
import { SortDir } from "~/utils/utils";
import styles from "./SortIcon.module.css";

export type SortIconProps<T> = {
  sortDir: SortDir;
  sortKey: T;
  activeSortKey: T;
};

export const SortIcon = <T,>(props: SortIconProps<T>) => {
  return (
    <Switch>
      <Match
        when={props.sortDir === "asc" && props.sortKey === props.activeSortKey}
      >
        <CaretUp class={styles.sortIcon} />
      </Match>
      <Match
        when={props.sortDir === "desc" && props.sortKey === props.activeSortKey}
      >
        <CaretDown class={styles.sortIcon} />
      </Match>
    </Switch>
  );
};

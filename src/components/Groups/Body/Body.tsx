import { GroupsResponse } from "~/api/types";
import styles from "./Body.module.css";
import { For } from "solid-js";

export type BodyProps = {
  data: GroupsResponse;
};

export default function Body(props: BodyProps) {
  return (
    <div class={styles.body}>
      <ul class={styles.tabs}>
        <li class={styles.active}>
          <h6>Match</h6>
        </li>
        <For each={Object.entries(props.data.match_summary.results)}>
          {([map, result], idx) => (
            <li>
              <h6>Round {idx() + 1}</h6>
              <p>{result.map}</p>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}

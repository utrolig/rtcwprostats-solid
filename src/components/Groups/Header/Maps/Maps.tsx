import { Component, Show, createEffect, createMemo } from "solid-js";
import { getMapImage } from "~/assets/maps";
import styles from "./Maps.module.css";

type MapsProps = {
  maps: string[];
};

export const Maps: Component<MapsProps> = (props) => {
  const mapImages = createMemo(() => {
    const [firstMap, secondMap] = props.maps;

    return {
      first: getMapImage(firstMap),
      second: getMapImage(secondMap),
    };
  });

  return (
    <div
      classList={{
        [styles.container]: true,
        [styles.twoMaps]: !!(mapImages().first && mapImages().second),
      }}
    >
      <img class={styles.firstMap} src={mapImages().first} />
      <Show when={mapImages().second}>
        <img class={styles.secondMap} src={mapImages().second} />
      </Show>
      <div class={styles.overlay} />
    </div>
  );
};

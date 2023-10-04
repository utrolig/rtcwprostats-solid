import { Component, createMemo } from "solid-js";
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
    <div class={styles.container}>
      <img class={styles.firstMap} src={mapImages().first} />
      <img class={styles.secondMap} src={mapImages().second} />
      <div class={styles.overlay} />
    </div>
  );
};

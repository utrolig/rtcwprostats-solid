import styles from "./GroupsOutletBody.module.css";
import { JSX } from "solid-js";

export type GroupsOutletBodyProps = {
  children: JSX.Element;
};

export const GroupsOutletBody = (props: GroupsOutletBodyProps) => {
  return <div class={styles.body}>{props.children}</div>;
};

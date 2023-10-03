import { Component, JSX } from 'solid-js';
import styles from './Group.module.css';

export type GroupsLayoutProps = {
  children: JSX.Element;
}

export const GroupsLayout: Component<GroupsLayoutProps> = (props) => {
  return (
    <div class={styles.container}>
      {props.children}
    </div>
  )
}
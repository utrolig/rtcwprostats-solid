import { Switch } from "@kobalte/core";
import styles from "./Toggle.module.css";

export type ToggleProps = {
  class?: string;
  isToggled?: boolean;
  onToggle?: (toggled: boolean) => void;
  label?: string;
};

export const Toggle = (props: ToggleProps) => {
  const getClassList = () => {
    const classList = { [styles.toggle]: true };

    if (props.class) {
      classList[props.class] = true;
    }

    return classList;
  };

  return (
    <Switch.Root
      checked={props.isToggled}
      onChange={props.onToggle}
      classList={getClassList()}
    >
      <Switch.Label class={styles.toggleLabel}>{props.label}</Switch.Label>
      <Switch.Input class={styles.toggleInput} />
      <Switch.Control class={styles.toggleControl}>
        <Switch.Thumb class={styles.toggleThumb} />
      </Switch.Control>
    </Switch.Root>
  );
};

import { GroupsResponse } from "~/api/types";
import styles from "./Awards.module.css";
import { For } from "solid-js";
import { getAwards } from "~/utils/awards";
import { Collapsible } from "@kobalte/core";

export type AwardsProps = {
  groupsResponse: GroupsResponse;
};

export const Awards = (props: AwardsProps) => {
  const awards = () => getAwards(props.groupsResponse);

  return (
    <div class={styles.awards}>
      <section class={styles.awardsSection}>
        <h1 class={styles.title}>Main awards</h1>
        <div class={styles.body}>
          <div class={styles.mainAwards}>
            <For each={awards().mainAwards}>
              {(award) => (
                <Collapsible.Root>
                  <Collapsible.Trigger class={styles.awardCollapsible}>
                    <div class={styles.award}>
                      <p class={styles.awardText}>
                        The <span class={styles.awardTitle}>{award.name}</span>{" "}
                        award goes to{" "}
                        <span class={styles.awardName}>
                          {award.winner.name}
                        </span>{" "}
                        for {award.description}{" "}
                        <span class={styles.awardValue}>
                          {award.winner.value}
                        </span>
                      </p>
                    </div>
                  </Collapsible.Trigger>
                  <Collapsible.Content class={styles.collapsibleContent}>
                    <div class={styles.awardDetails}>
                      <For each={award.all}>
                        {(item) => (
                          <div class={styles.awardDetailItem}>
                            <p class={styles.awardDetailName}>{item.name}</p>
                            <p class={styles.awardDetailCount}>{item.value}</p>
                          </div>
                        )}
                      </For>
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              )}
            </For>
          </div>
        </div>
      </section>
      <section class={styles.awardsSection}>
        <h1 class={styles.title}>Weapon awards</h1>
        <div class={styles.body}>
          <div class={styles.mainAwards}>
            <For each={awards().weaponAwards}>
              {(award) => (
                <Collapsible.Root>
                  <Collapsible.Trigger class={styles.awardCollapsible}>
                    <div class={styles.award}>
                      <p class={styles.awardText}>
                        The <span class={styles.awardTitle}>{award.name}</span>{" "}
                        award goes to{" "}
                        <span class={styles.awardName}>
                          {award.winner.name}
                        </span>{" "}
                        for{" "}
                        <span class={styles.awardValue}>
                          {award.winner.value}
                        </span>{" "}
                        {award.description}
                      </p>
                    </div>
                  </Collapsible.Trigger>
                  <Collapsible.Content class={styles.collapsibleContent}>
                    <div class={styles.awardDetails}>
                      <For each={award.all}>
                        {(item) => (
                          <div class={styles.awardDetailItem}>
                            <p class={styles.awardDetailName}>{item.name}</p>
                            <p class={styles.awardDetailCount}>{item.value}</p>
                          </div>
                        )}
                      </For>
                    </div>
                  </Collapsible.Content>
                </Collapsible.Root>
              )}
            </For>
          </div>
        </div>
      </section>
    </div>
  );
};

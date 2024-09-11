import { MatchStatsResponse } from "~/api/types";
import styles from "./Awards.module.css";
import { For } from "solid-js";
import { GameAwards, getAwards } from "~/utils/awards";
import { Collapsible } from "@kobalte/core";
import { useTranslation } from "~/i18n/context";
import { getColoredNameParts } from "~/utils/colors";

export type AwardsProps = {
  data: MatchStatsResponse;
};

export const Awards = (props: AwardsProps) => {
  const awards = () => getAwards(props.data);
  const t = useTranslation();

  const getAwardName = (
    awardName: (typeof GameAwards)[keyof typeof GameAwards],
  ) => {
    switch (awardName) {
      case "Aimbot":
        return t("aimbotAwardName");
      case "Baiter":
        return t("baiterAwardName");
      case "Best smoker":
        return t("smokerAwardName");
      case "Crosshair Connoisseur":
        return t("crosshairconnoisseurAwardName");
      case "Desecrator of corpses":
        return t("desecratorAwardName");
      case "God of war":
        return t("godOfWarAwardName");
      case "Harakiri":
        return t("harakiriAwardName");
      case "John Wayne is Lama":
        return t("pistolAwardName");
      case "King of Thompson":
        return t("thompsonAwardName");
      case "Master of MP-40":
        return t("mp40AwardName");
      case "Master of grenade":
        return t("grenadeAwardName");
      case "Panzer-Lama":
        return t("panzerAwardName");
      case "Sharp-Shooter":
        return t("sharpshooterAwardName");
      case "Slaughterhouse":
        return t("slaughterhouseAwardName");
      case "Slaughterhouse Lama":
        return t("slaughterhouselamaAwardName");
      case "Sly Fox":
        return t("slyfoxAwardName");
      case "Terminator":
        return t("terminatorAwardName");
      case "Silent killer":
        return t("silentKillerAwardName");
    }
  };

  const getAwardDescription = (
    awardName: (typeof GameAwards)[keyof typeof GameAwards],
  ) => {
    switch (awardName) {
      case "Aimbot":
        return t("aimbotAwardDescription");
      case "Baiter":
        return t("baiterAwardDescription");
      case "Crosshair Connoisseur":
        return t("crosshairconnoisseurAwardDescription");
      case "Desecrator of corpses":
        return t("desecratorAwardDescription");
      case "Harakiri":
        return t("harakiriAwardDescription");
      case "Slaughterhouse":
        return t("slaguhterhouseAwardDescription");
      case "Slaughterhouse Lama":
        return t("slaughterhouselamaAwardDescription");
      case "Sly Fox":
        return t("slyfoxAwardDescription");
      case "Terminator":
        return t("terminatorAwardDescription");
      case "Silent killer":
        return t("silentKillerAwardDescription");
    }
  };

  return (
    <div class={styles.awards}>
      <section class={styles.awardsSection}>
        <h1 class={styles.title}>{t("mainAwards")}</h1>
        <div class={styles.body}>
          <div class={styles.mainAwards}>
            <For each={awards().mainAwards}>
              {(award) => (
                <Collapsible.Root>
                  <Collapsible.Trigger class={styles.awardCollapsible}>
                    <div class={styles.award}>
                      <p class={styles.awardText}>
                        {t("awardPrefix")}{" "}
                        <span class={styles.awardTitle}>
                          {getAwardName(award.name)}
                        </span>{" "}
                        {t("awardedTo")}{" "}
                        <span class={styles.awardName}>
                          <For
                            each={getColoredNameParts(award.winner.coloredName)}
                          >
                            {(part) => (
                              <span style={{ color: part.color }}>
                                {part.text}
                              </span>
                            )}
                          </For>
                        </span>{" "}
                        {getAwardDescription(award.name)}{" "}
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
                            <p class={styles.awardDetailName}>
                              <For each={getColoredNameParts(item.coloredName)}>
                                {(part) => (
                                  <span style={{ color: part.color }}>
                                    {part.text}
                                  </span>
                                )}
                              </For>
                            </p>
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
        <h1 class={styles.title}>{t("weaponAwards")}</h1>
        <div class={styles.body}>
          <div class={styles.mainAwards}>
            <For each={awards().weaponAwards}>
              {(award) => (
                <Collapsible.Root>
                  <Collapsible.Trigger class={styles.awardCollapsible}>
                    <div class={styles.award}>
                      <p class={styles.awardText}>
                        {t("awardPrefix")}{" "}
                        <span class={styles.awardTitle}>
                          {getAwardName(award.name)}
                        </span>{" "}
                        {t("awardedTo")}{" "}
                        <span class={styles.awardName}>
                          <For
                            each={getColoredNameParts(award.winner.coloredName)}
                          >
                            {(part) => (
                              <span style={{ color: part.color }}>
                                {part.text}
                              </span>
                            )}
                          </For>
                        </span>{" "}
                        {t("for") + " "}
                        <span class={styles.awardValue}>
                          {award.winner.value}
                        </span>{" "}
                        {t("frags")}
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

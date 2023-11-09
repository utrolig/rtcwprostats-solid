import { createMemo } from "solid-js";
import { GroupsResponse } from "~/api/types";
import { getMaps, getMatchResult, groupsResponseToTeams } from "~/utils/teams";
import styles from "./Header.module.css";
import { Team } from "./Team/Team";
import { MatchResult } from "./MatchResult/MatchResult";
import { Maps } from "./Maps/Maps";
import { LanguageSelector } from "~/components/LanguageSelector/LanguageSelector";

export type HeaderProps = {
  groups: GroupsResponse;
};

export default function Header(props: HeaderProps) {
  const formattedData = createMemo(() => {
    const teams = groupsResponseToTeams(props.groups);
    const result = getMatchResult(props.groups.match_summary);
    const maps = getMaps(props.groups.match_summary);
    return { teams, result, maps };
  });

  return (
    <div class={styles.container}>
      <Team
        faction={formattedData().teams.factions.TeamA}
        players={formattedData().teams.teamA}
      />
      <MatchResult
        factions={formattedData().teams.factions}
        result={formattedData().result}
        maps={formattedData().maps}
      />
      <Team
        faction={formattedData().teams.factions.TeamB}
        players={formattedData().teams.teamB}
      />
      <Maps maps={formattedData().maps} />
      <LanguageSelector />
    </div>
  );
}

import { createMemo } from "solid-js";
import { GroupsResponse } from "~/api/types";
import { getMaps, getMatchResult, groupsResponseToTeams } from "~/utils/teams";
import styles from "./Teams.module.css";
import { Team } from "../Team/Team";
import { MatchResult } from "../MatchResult/MatchResult";
import { Maps } from "../Maps/Maps";

export type TeamsProps = {
  data: GroupsResponse;
};

export default function Teams(props: TeamsProps) {
  const formattedData = createMemo(() => {
    const teams = groupsResponseToTeams(props.data);
    const result = getMatchResult(props.data.match_summary);
    const maps = getMaps(props.data.match_summary);
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
    </div>
  );
}

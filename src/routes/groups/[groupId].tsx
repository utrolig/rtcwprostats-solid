import { Show, createResource } from "solid-js";
import { Meta, Outlet, Title, useParams, useRouteData } from "solid-start";
import { api } from "~/api";
import { GroupsLayout } from "~/components/Layouts/Group";
import GroupsHeader from "~/components/Groups/Header";
import { GroupsResponseContext } from "~/utils/groupsContext";
import { GroupsOutletBody } from "~/components/Groups/Body/GroupOutletBody/GroupsOutletBody";
import { MatchSelector } from "~/components/Groups/Body/MatchSelector/MatchSelector";
import rtcwProLogoUrl from "../../assets/rtcwpro-logo.png?w=256&h=145&imagetools";
import { GroupsResponse } from "~/api/types";
import { getMaps, groupsResponseToTeams } from "~/utils/teams";
import { getSmallMapImage } from "~/assets/maps/small";

export function routeData() {
  const { groupId } = useParams<{ groupId: string }>();

  const [data] = createResource(async () => {
    const groupsResponse = await api.fetchGroup(groupId);
    return groupsResponse;
  });

  return { data };
}

const BASE_URL = `https://rtcwprostats.deno.dev`;

const getOgDescription = (data: GroupsResponse) => {
  const maps = getMaps(data.match_summary);
  const teams = groupsResponseToTeams(data);
  const teamAString = teams.teamA.map((player) => player.alias).join(", ");
  const teamBString = teams.teamB.map((player) => player.alias).join(", ");
  const teamsString =
    "Team A: " + teamAString + "\n" + "Team B: " + teamBString;
  const mapsString = "Maps: " + maps.join(", ");
  return `${mapsString}\n\n${teamsString}`;
};

const getOgUrl = (groupId: string) => {
  return `${BASE_URL}/groups/${groupId}`;
};

const getImageMetaTags = (data: GroupsResponse) => {
  const [firstMap, secondMap] = getMaps(data.match_summary);

  const firstMapImage = BASE_URL + getSmallMapImage(firstMap);
  const secondMapImage = BASE_URL + getSmallMapImage(secondMap);

  return (
    <>
      {firstMap && (
        <>
          <Meta name="twitter:image" content={firstMapImage} />
          <Meta name="og:image" content={firstMapImage} />
        </>
      )}

      {secondMap && (
        <>
          <Meta name="twitter:image" content={secondMapImage} />
          <Meta name="og:image" content={secondMapImage} />
        </>
      )}
    </>
  );
};

export default function Group() {
  const { groupId } = useParams<{ groupId: string }>();
  const { data } = useRouteData<typeof routeData>();
  return (
    <Show when={data()} keyed>
      {(data) => (
        <GroupsResponseContext.Provider value={data}>
          <Title>{data.match_id}</Title>

          <Meta name="og:title" content={data.match_id} />
          <Meta name="og:site_name" content="RtCWPro Stats" />
          <Meta name="og:url" content={getOgUrl(groupId)} />
          <Meta name="og:description" content={getOgDescription(data)} />
          <Meta name="og:type" content="website" />
          {getImageMetaTags(data)}

          <Meta name="twitter:card" content="summary_large_image" />
          <Meta name="twitter:url" content={getOgUrl(groupId)} />
          <Meta name="twitter:title" content={data.match_id} />
          <Meta name="twitter:description" content={getOgDescription(data)} />

          <GroupsLayout>
            <Show when={data}>
              {(data) => (
                <>
                  <GroupsHeader groups={data()} />
                  <GroupsOutletBody>
                    <MatchSelector groups={data()} />
                    <Outlet />
                  </GroupsOutletBody>
                </>
              )}
            </Show>
          </GroupsLayout>
        </GroupsResponseContext.Provider>
      )}
    </Show>
  );
}

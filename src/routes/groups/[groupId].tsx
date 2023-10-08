import { Show, createResource } from "solid-js";
import { Outlet, Title, useParams, useRouteData } from "solid-start";
import { api } from "~/api";
import { GroupsLayout } from "~/components/Layouts/Group";
import GroupsHeader from "~/components/Groups/Header";
import { GroupsResponseContext } from "~/utils/groupsContext";
import { GroupsOutletBody } from "~/components/Groups/Body/GroupOutletBody/GroupsOutletBody";
import { MatchSelector } from "~/components/Groups/Body/MatchSelector/MatchSelector";

export function routeData() {
  const { groupId } = useParams<{ groupId: string }>();

  const [data] = createResource(async () => {
    const groupsResponse = await api.fetchGroup(groupId);
    return groupsResponse;
  });

  return { data };
}

export default function Group() {
  const { data } = useRouteData<typeof routeData>();
  return (
    <Show when={data()} keyed>
      {(data) => (
        <GroupsResponseContext.Provider value={data}>
          <Title>{data.match_id}</Title>
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

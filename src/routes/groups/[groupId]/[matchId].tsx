import { createResource, Show, useContext } from "solid-js";
import { useParams, useRouteData } from "solid-start";
import { api } from "~/api";
import { MatchBody } from "~/components/Groups/Body/MatchBody/MatchBody";
import { GroupsResponseContext } from "~/utils/groupsContext";

export function routeData() {
  const params = useParams<{ matchId: string }>();

  const [data] = createResource(() => params.matchId, api.fetchMatch);

  return { data };
}

export default function MatchDetailsBody() {
  const { data } = useRouteData<typeof routeData>();
  const groupsResponse = useContext(GroupsResponseContext);

  return (
    <Show when={data()} keyed>
      {(data) => (
        <MatchBody
          classes={groupsResponse?.classes}
          elos={groupsResponse?.elos}
          data={data}
        />
      )}
    </Show>
  );
}

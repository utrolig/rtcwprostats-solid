import { createResource, Show } from "solid-js";
import { useParams, useRouteData } from "solid-start";
import { api } from "~/api";
import { MatchBody } from "~/components/Groups/Body/MatchBody/MatchBody";

export function routeData() {
  const params = useParams<{ matchId: string }>();

  const [data] = createResource(() => params.matchId, api.fetchMatch);

  return { data };
}

export default function MatchDetailsBody() {
  const { data } = useRouteData<typeof routeData>();

  return (
    <Show when={data()} keyed>
      {(data) => <MatchBody data={data} />}
    </Show>
  );
}

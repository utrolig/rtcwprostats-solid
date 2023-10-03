import { Show, createResource } from "solid-js";
import { useParams, useRouteData } from "solid-start";
import { api } from "~/api";
import { GroupsLayout } from "~/components/Layouts/Group";
import Teams from "~/components/Teams/Teams";

export function routeData() {
  const { groupId } = useParams<{ groupId: string }>();

  const [data] = createResource(async () => {
    const response = await api.fetchGroup(groupId);
    return response;
  });

  return { data };
}

export default function Group() {
  const { data } = useRouteData<typeof routeData>();
  return (
    <GroupsLayout>
      <Show when={data()}>
        {(data) => (
          <>
            <Teams data={data()} />
          </>
        )}
      </Show>
    </GroupsLayout>
  );
}

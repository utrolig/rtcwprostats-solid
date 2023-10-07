import { Show, createResource } from "solid-js";
import { Title, useParams, useRouteData } from "solid-start";
import { api } from "~/api";
import { GroupsLayout } from "~/components/Layouts/Group";
import GroupsHeader from "~/components/Groups/Header";
import GroupsBody from "~/components/Groups/Body";

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
    <>
      <Title>{data()?.match_id}</Title>
      <GroupsLayout>
        <Show when={data()}>
          {(data) => (
            <>
              <GroupsHeader data={data()} />
              <GroupsBody data={data()} />
            </>
          )}
        </Show>
      </GroupsLayout>
    </>
  );
}

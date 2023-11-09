import { Show, useContext } from "solid-js";
import { GroupBody } from "~/components/Groups/Body/GroupBody/GroupBody";
import { GroupsResponseContext } from "~/utils/groupsContext";

export default function Group() {
  const groupsResponse = useContext(GroupsResponseContext);
  return (
    <Show when={groupsResponse} keyed>
      {(data) => <GroupBody data={data} />}
    </Show>
  );
}

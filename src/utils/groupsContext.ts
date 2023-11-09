import { createContext } from "solid-js";
import { GroupsResponse } from "~/api/types";

export const GroupsResponseContext = createContext<GroupsResponse>();

import urljoin from "url-join";
import { GroupsResponse, MatchStatsResponse } from "./types";

const BASE_URL = "https://rtcwproapi.donkanator.com";
const buildUrl = (path: string) => {
  return urljoin(BASE_URL, path);
};

export const api = {
  async fetchGroup(groupId: string): Promise<GroupsResponse> {
    const url = buildUrl(`/stats/group/${groupId}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error while fetching.");
    }

    const data = (await response.json()) as GroupsResponse;
    return data;
  },
  async fetchMatch(matchId: string): Promise<MatchStatsResponse> {
    const url = buildUrl(`/stats/${matchId}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error while fetching.");
    }

    const data = (await response.json()) as MatchStatsResponse;
    return data;
  },
};

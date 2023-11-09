import { Guid } from "~/api/types";
import { MatchStatPlayerStat } from "./teams";

const BAITERS: Guid[] = [
  "5d32515d033583c3cc2527744b1ad557", // chry
  "ddd3378ee7deb6f93ed2e170c2f4c654", // lasher
  "fbddd71c8b73794c818c4a7956dc210d", // nova
  "f8e8ae804becc55b321a043e5a2896e8", // syl
];

const BAITER_NAMES = ["chry", "lasher", "nova", "syl"];

export const isBaiter = (player: MatchStatPlayerStat) => {
  if (BAITERS.includes(player.id)) {
    return true;
  }

  if (BAITER_NAMES.some((name) => player.alias.includes(name))) {
    return true;
  }
};

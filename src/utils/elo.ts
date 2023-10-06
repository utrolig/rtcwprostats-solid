const Rank = {
  Iron: "Iron",
  Bronze: "Bronze",
  Silver: "Silver",
  Gold: "Gold",
  Platinum: "Platinum",
  Diamond: "Diamond",
  Master: "Master",
  Grandmaster: "Grandmaster",
} as const;

type Rank = keyof typeof Rank;

export const rankColors: Record<Rank, string> = {
  Iron: "#4B4B4B",
  Bronze: "#8C5D3A",
  Silver: "#B2B2B2",
  Gold: "#FFD700",
  Platinum: "#D4AF37",
  Diamond: "#B9F2FF",
  Master: "#922d32",
  Grandmaster: "#FF0000",
};

export const eloToRank = (elo: number): Rank => {
  if (elo > 1800) {
    return Rank.Grandmaster;
  }

  if (elo > 1700) {
    return Rank.Master;
  }

  if (elo > 1650) {
    return Rank.Diamond;
  }

  if (elo > 1600) {
    return Rank.Platinum;
  }

  if (elo > 1550) {
    return Rank.Gold;
  }

  if (elo > 1500) {
    return Rank.Silver;
  }

  if (elo > 1400) {
    return Rank.Bronze;
  }

  return Rank.Iron;
};

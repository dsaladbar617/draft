const getVsTeamsStats = async (playerId: string, season: string) => {
  const res = await fetch(
    `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=vsTeam&season=${season}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json() as Promise<VsTeamStats>;
};

export default getVsTeamsStats;

// import useSWR from 'swr';
import { useQuery } from "@tanstack/react-query";

const useGetVsTeamStats = (playerId: string, season: string) => {
  const { data, isLoading } = useQuery([season, playerId], async () => {
    return await fetch(
      `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=vsTeam&season=${season}`
    ).then((res) => res.json() as Promise<VsTeamStats>);
  });

  return { data, isLoading };
};

export default useGetVsTeamStats;

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchPlayer = (id: string) => {
  return useQuery({
    queryKey: ["player", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://statsapi.web.nhl.com/api/v1/draft/prospects/${id}`
      );

      return data as Drafts;
    },
  });
};

export default useFetchPlayer;

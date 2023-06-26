import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFetchDraft = (year: string) => {
  return useQuery({
    queryKey: ["drafts", year],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://statsapi.web.nhl.com/api/v1/draft/${year}`
      );

      return data as Drafts;
    },
  });
};

export default useFetchDraft;

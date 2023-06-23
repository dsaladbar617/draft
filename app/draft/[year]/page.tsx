"use client";

import YearSelect from "@/components/YearSelect";
import { useState } from "react";
import useFetchDraft from "@/lib/fetchDraft";
import DraftTable from "../../../components/DraftTable";
import TeamSelect from "@/components/TeamSelect";

export default function Home({ params }: { params: { year: string } }) {
  const getCurrentYear = () => {
    return new Date().getFullYear() - 1;
  };

  const currentYear = getCurrentYear().toString();

  const [draftYear, setDraftYear] = useState(params.year);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const { data, isLoading } = useFetchDraft(draftYear);

  return (
    <>
      <div className="flex flex-row justify-between w-2/3 mx-auto mt-4">
        <YearSelect currentYear={+currentYear} setDraftYear={setDraftYear} />
        <TeamSelect setSelectedTeam={setSelectedTeam} />
      </div>
      {isLoading ? <div>Loading...</div> : null}
      <DraftTable data={data!} selectedTeam={selectedTeam} />
    </>
  );
}

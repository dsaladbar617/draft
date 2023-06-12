'use client';

import { useQuery } from '@tanstack/react-query';
import DraftYearSelect from './components/DraftYearSelect';
import axios from 'axios';
import { useState } from "react";
import useFetchDraft from "@/fetchDraft";
import { uuid } from "uuidv4";

export default function Home() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const currentYear = getCurrentYear().toString();

  const [draftYear, setDraftYear] = useState(currentYear);

  const { data, isLoading } = useFetchDraft(draftYear);

  return (
    <>
      <DraftYearSelect currentYear={+currentYear} setDraftYear={setDraftYear} />
      {isLoading ? <div>Loading...</div> : null}

      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data?.drafts[0].rounds?.map((round) => (
            <>
              <tr key={round.round}>
                <td>{round.round}</td>
              </tr>
              {round.picks.map((pick) => (
                <tr key={pick.prospect.id}>
                  <td>{pick.team.name}</td>
                  <td>{pick.prospect.fullName}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </>
  );
}

'use client';
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type TableProps = {
  data: Drafts;
  selectedTeam: string | null;
};

const headers = ["Pick", "Team", "Name"];

const DraftTable = ({ data, selectedTeam }: TableProps) => {
	const router = useRouter();

  let draft: Round[] = [];
  draft = selectedTeam
    ? data?.drafts[0].rounds.map((round) => ({
        ...round,
        picks: round.picks.filter((pick) => {
          return pick.team.id.toString() === selectedTeam;
        }),
      }))
    : data?.drafts[0].rounds;

  if (selectedTeam === "0") draft = data?.drafts[0].rounds;

  return (
    <table className='table mx-auto mt-10 table-responsive rounded-md text-center p-4 w-2/3 border-collapse'>
			<thead className='table-header-group bg-neutral-950 rounded-lg p-4'>
				<tr className=' hidden md:table-row rounded'>
					{headers.map((header: string, index: number) => (
						<th
							key={header}
							className={`table-cell p-4 ${
								index === headers.length - 1 ? 'rounded-tr-lg' : null
							} ${index === 0 ? 'rounded-tl-lg' : null}`}>
							{header}
						</th>
					))}
				</tr>
			</thead>
			<tbody className='table-row-group divide-y divide-gray-300'>
				{draft?.map((round, index) => (
					<Fragment key={uuidv4()}>
						<tr className='table-row '>
							<td data-cell='round' colSpan={3} className={`table-cell ${index === 0 &&'rounded-t-lg'} text-center  md:rounded-none font-bold text-xl p-[14.25px] bg-neutral-900`}>
								Round {round.round}
							</td>
						</tr>
						{round.picks.map((pick) => (
									<tr key={uuidv4()} className='hover:bg-neutral-400  bg-neutral-700 odd:bg-primary hover:text-black hover:cursor-pointer grid  md:table-row' onClick={() => router.push(`/player/${pick.prospect.fullName}?id=${pick.prospect.id?.toString()}`)}>
										<td data-cell='pick' className='grid-cols-[15ch_auto] pt-2 md:p-4 before:content-["Pick:_"] md:before:content-none'>{pick.pickOverall}</td>
										<td data-cell='team' className='grid-cols-[15ch_auto] pt-2 md:p-4 before:content-["Team:_"] md:before:content-none'>{pick.team.name}</td>
										<td data-cell='name' className='grid-cols-[15ch_auto] pt-2 pb-2 md:p-4 before:content-["Name:_"] md:before:content-none'>{pick.prospect.fullName}</td>
									</tr>
						))}
					</Fragment>
				))}
			</tbody>
		</table>
  );
};

export default DraftTable;
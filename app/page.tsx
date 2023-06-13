'use client';

import DraftYearSelect from './components/DraftYearSelect';
import { Fragment, useState } from 'react';
import useFetchDraft from '@/fetchDraft';

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
						<th>Pick</th>
						<th>Team</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{data?.drafts[0].rounds?.map((round) => (
						<Fragment key={round.roundNumber}>
							<tr>
								<td className='text-center col-span-3'>{round.round}</td>
							</tr>
							{round.picks.map((pick) => (
								<tr key={pick.prospect.id}>
									<td>{pick.pickOverall}</td>
									<td>{pick.team.name}</td>
									<td>{pick.prospect.fullName}</td>
								</tr>
							))}
						</Fragment>
					))}
				</tbody>
			</table>
		</>
	);
}

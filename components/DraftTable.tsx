import Link from 'next/link';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

type TableProps = {
	data: Drafts;
	selectedTeam: string | null;
};

const headers = ['Pick', 'Team', 'Name'];

const DraftTable = ({ data, selectedTeam }: TableProps) => {
	let draft: Round[] = [];
	draft = selectedTeam
		? data?.drafts[0].rounds.map((round) => ({
				...round,
				picks: round.picks.filter((pick) => {
					return pick.team.id.toString() === selectedTeam;
				})
		  }))
		: data?.drafts[0].rounds;

	if (selectedTeam === '0') draft = data?.drafts[0].rounds;

	return (
		<div className='table mx-auto mt-10 table-responsive rounded-md text-center p-4 w-2/3 border-collapse'>
			<div className='table-header-group bg-slate-500 rounded-lg p-4'>
				<div className='table-row rounded'>
					{headers.map((header: string, index: number) => (
						<div
							key={header}
							className={`table-cell p-4 ${
								index === headers.length - 1 ? 'rounded-tr-lg' : null
							} ${index === 0 ? 'rounded-tl-lg' : null}`}>
							{header}
						</div>
					))}
				</div>
			</div>
			<div className='table-row-group divide-y divide-gray-300'>
				{draft?.map((round) => (
					<Fragment key={uuidv4()}>
						<div className='table-row'>
							<div className='table-cell text-center font-bold text-xl p-4 bg-slate-950 col-span-3'>
								Round {round.round}
							</div>
							<div className='col-span-3'> </div>
							<div className='col-span-3'> </div>
						</div>
						{round.picks.map((pick) => (
							<Link
								href={{
									pathname: `/player/${pick.prospect.fullName}`,
									query: { id: pick.prospect.id?.toString() }
								}}
								key={uuidv4()}
								className='hover:bg-slate-400 hover:text-black table-row'>
								<div className='table-cell p-4'>{pick.pickOverall}</div>
								<div className='table-cell p-4'>{pick.team.name}</div>
								<div className='table-cell p-4'>{pick.prospect.fullName}</div>
							</Link>
						))}
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default DraftTable;

{
	/* <div className='table mx-auto mt-10 table-responsive rounded-md text-center p-4 w-2/3 border-collapse'>
	<div className='table-header-group bg-slate-500 rounded-lg p-4'>
		<div className='table-row rounded'>
			{headers.map((header: string, index: number) => (
				<div
					key={header}
					className={`table-cell p-4 ${
						index === headers.length - 1 ? 'rounded-tr-lg' : null
					} ${index === 0 ? 'rounded-tl-lg' : null}`}>
					{header}
				</div>
			))}
		</div>
	</div>
	<div className='table-row-group divide-y divide-gray-300'>
		{draft?.map((round) => (
			<Fragment key={uuidv4()}>
				<div className='table-row'>
					<div className='table-cell text-center font-bold text-xl p-4 bg-slate-950 col-span-3'>
						Round {round.round}
					</div>
					<div className='col-span-3'> </div>
					<div className='col-span-3'> </div>
				</div>
				{round.picks.map((pick) => (
					<Link
						href={{
							pathname: `/player/${pick.prospect.fullName}`,
							query: { id: pick.prospect.id?.toString() }
						}}
						key={uuidv4()}
						className='hover:bg-slate-400 hover:text-black table-row'>
						<div className='table-cell p-4'>{pick.pickOverall}</div>
						<div className='table-cell p-4'>{pick.team.name}</div>
						<div className='table-cell p-4'>{pick.prospect.fullName}</div>
					</Link>
				))}
			</Fragment>
		))}
	</div>
</div>; */
}

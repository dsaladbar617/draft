'use client';
import useDebounce from '@/lib/useDebounce';
import * as _ from 'lodash';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
	const [search, setSearch] = useState('');

	const router = useRouter();

	// const debounced = _.debounce(search, 250);
	const debounced = useDebounce(search, 250);

	const { data } = useQuery({
		queryKey: ['players', debounced],
		queryFn: async () => {
			const { data } = await axios.get(
				`https://suggest.svc.nhl.com/svc/suggest/v1/minplayers/${search}/99999`
			);

			return data as SuggestionType;
		},
		enabled: debounced !== ''
	});

	const options = data?.suggestions.map((item) => {
		const elem = item.split('|');

		return {
			name: `${elem[2]} ${elem[1]}`,
			id: elem[0],
			position: elem[12],
			jerseyNumber: elem[13],
			team: elem[11],
			height: elem[5],
			weight: elem[6],
			birthPlace: `${elem[7]}, ${elem[8]}`,
			country: elem[9]
		};
	});

	const headers = [
		'Player',
		'Pos',
		'Team',
		'#',
		'Ht',
		'Wt',
		'Birthplace',
		'Country'
	];

	return (
		<div>
			<input
				className='text-black m-10 w-1/3 h-10s rounded p-3'
				type='text'
				placeholder='Search Players...'
				onChange={(e) => {
					setSearch(e.currentTarget.value);
				}}
			/>
			{data ? (
				<div className='mx-auto table-responsive rounded-md text-center p-4 border-collapse'>
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
						{options?.map((elem, index) => (
							<div
								key={index}
								className='hover:bg-slate-400 hover:text-black table-row'
								onClick={() => {
									router.push(`/player/${elem.name}?id=${elem.id}`);
								}}>
								<div className='table-cell p-4'>{elem.name}</div>
								<div className='table-cell p-4'>{elem.position}</div>
								<div className='table-cell p-4'>{elem.team}</div>
								<div className='table-cell p-4'>{elem.jerseyNumber}</div>
								<div className='table-cell p-4'>{elem.height}</div>
								<div className='table-cell p-4'>{elem.weight}</div>
								<div className='table-cell p-4'>{elem.birthPlace}</div>
								<div className='table-cell p-4'>{elem.country}</div>
							</div>
						))}
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Page;

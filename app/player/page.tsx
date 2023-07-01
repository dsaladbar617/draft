'use client';
import useDebounce from '@/lib/useDebounce';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface pageProps {}

const Page = () => {
	const [search, setSearch] = useState('');
	const [player, setPlayer] = useState('');

	const router = useRouter();

	const debounced = useDebounce(search, 600);

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

		return { name: `${elem[2]} ${elem[1]}`, id: elem[0] };
	});

	const handleClick = () => {
		router.push(`/player/${player}`);
	};

	return (
		<div>
			<input
				className='text-black m-10 w-1/3 h-10s rounded p-3'
				type='text'
				list='autocomplete-data'
				placeholder='Search Players...'
				onChange={(e) => {
					setSearch(e.currentTarget.value);
				}}
			/>
			<datalist id='autocomplete-data'>
				{options?.map((item, index) => (
					<option
						onClick={() => {
							// console.log(item);
						}}
						key={index}
						value={item.name}
					/>
				))}
			</datalist>
			<button className='bg-slate-300 rounded p-3' onClick={handleClick}>
				Search
			</button>
		</div>
	);
};

export default Page;

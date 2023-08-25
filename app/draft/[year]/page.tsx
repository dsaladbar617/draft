'use client';

import { Suspense, useState } from 'react';
import DraftTable from '../../../components/DraftTable';
import useGetDraft from '@/lib/useGetDraft';
import DraftSelectGroup from '@/components/group/DraftSelect/DraftSelectGroup';

export default function Home({ params }: { params: { year: string } }) {
	const getCurrentYear = () => {
		return new Date().getFullYear();
	};

	const currentYear = params.year ? params.year : getCurrentYear().toString();

	const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

	const { data, isLoading } = useGetDraft(params.year);

	return (
		<div>
			<DraftSelectGroup currentYear={currentYear} setter={setSelectedTeam} />
			<Suspense fallback={<div>Loading...</div>}>
				<DraftTable data={data!} selectedTeam={selectedTeam} />
			</Suspense>
		</div>
	);
}

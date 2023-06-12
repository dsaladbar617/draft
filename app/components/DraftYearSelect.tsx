import Select from 'react-select';

const DraftYearSelect = () => {
	const getCurrentYear = () => {
		return new Date().getFullYear();
	};

	const currentYear = getCurrentYear();

	const draftDates = [];

	for (let i = currentYear; i > 1962; i--) {
		draftDates.push(i.toString());
	}

	const options = draftDates.map((elem) => ({ value: elem, label: elem }));

	return <Select className='text-black' options={options} />;
};

export default DraftYearSelect;

const getNHLYears = () => {
	const dates = [];
	const getCurrentYear = () => {
		return new Date().getFullYear();
	};

	const currentYear = getCurrentYear();

	for (let i = currentYear; i > 1962; i--) {
		dates.push(`${i}-${i + 1}`);
	}

	return dates;
};
export default getNHLYears;

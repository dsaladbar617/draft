const getNHLYears = (singleYearFlag: Boolean) => {
	const dates = [];
	const getCurrentYear = () => {
		return new Date().getFullYear();
	};

	const currentYear = getCurrentYear();

	for (let i = currentYear; i > 1962; i--) {
		if (!singleYearFlag) {
			dates.push(`${i}-${i + 1}`);
		} else {
			dates.push(i.toString());
		}
	}

	return dates;
};
export default getNHLYears;

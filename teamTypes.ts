type TeamType = {
	copyright: string;
	teams: Team[];
};

// type Team = {
// 	id: number;
// 	name: string;
// 	link: string;
// 	venue: Venue;
// 	abbreviation: string;
// 	teamName: string;
// 	locationName: string;
// 	firstYearOfPlay: string;
// 	division: Division;
// 	conference: Conference;
// 	franchise: Franchise;
// 	roster: TeamRoster;
// 	shortName: string;
// 	officialSiteUrl: string;
// 	franchiseId: number;
// 	active: boolean;
// };

type Conference = {
	id: number;
	name: ConferenceName;
	link: ConferenceLink;
};

enum ConferenceLink {
	APIV1Conferences5 = '/api/v1/conferences/5',
	APIV1Conferences6 = '/api/v1/conferences/6'
}

enum ConferenceName {
	Eastern = 'Eastern',
	Western = 'Western'
}

type Division = {
	id: number;
	name: DivisionName;
	nameShort: NameShort;
	link: DivisionLink;
	abbreviation: DivisionAbbreviation;
};

enum DivisionAbbreviation {
	A = 'A',
	C = 'C',
	M = 'M',
	P = 'P'
}

enum DivisionLink {
	APIV1Divisions15 = '/api/v1/divisions/15',
	APIV1Divisions16 = '/api/v1/divisions/16',
	APIV1Divisions17 = '/api/v1/divisions/17',
	APIV1Divisions18 = '/api/v1/divisions/18'
}

enum DivisionName {
	Atlantic = 'Atlantic',
	Central = 'Central',
	Metropolitan = 'Metropolitan',
	Pacific = 'Pacific'
}

enum NameShort {
	Atl = 'ATL',
	Cen = 'CEN',
	Metro = 'Metro',
	Pac = 'PAC'
}

type Franchise = {
	franchiseId: number;
	teamName: string;
	link: string;
};

type TeamRoster = {
	roster: RosterElement[];
	link: string;
};

type RosterElement = {
	person: Person;
	jerseyNumber?: string;
	position: Position;
};

type Person = {
	id: number;
	fullName: string;
	link: string;
};

type Position = {
	code: Code;
	name: PositionName;
	type: Type;
	abbreviation: PositionAbbreviation;
};

enum PositionAbbreviation {
	C = 'C',
	D = 'D',
	G = 'G',
	Lw = 'LW',
	Rw = 'RW'
}

enum Code {
	C = 'C',
	D = 'D',
	G = 'G',
	L = 'L',
	R = 'R'
}

enum PositionName {
	Center = 'Center',
	Defenseman = 'Defenseman',
	Goalie = 'Goalie',
	LeftWing = 'Left Wing',
	RightWing = 'Right Wing'
}

enum Type {
	Defenseman = 'Defenseman',
	Forward = 'Forward',
	Goalie = 'Goalie'
}

type Venue = {
	name: string;
	link: string;
	city: string;
	timeZone: TimeZone;
	id?: number;
};

type TimeZone = {
	id: string;
	offset: number;
	tz: Tz;
};

enum Tz {
	Cdt = 'CDT',
	Edt = 'EDT',
	Mdt = 'MDT',
	Mst = 'MST',
	Pdt = 'PDT'
}

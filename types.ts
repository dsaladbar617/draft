type Drafts = {
  copyright: string;
  drafts: Draft[];
};

type Draft = {
  draftYear: number;
  rounds: Round[];
};

type Round = {
  roundNumber: number;
  round: string;
  picks: DraftPick[];
};

type DraftPick = {
  year: number;
  round: string;
  pickOverall: number;
  pickInRound: number;
  team: Team;
  prospect: Prospect;
};

type Team = {
	id: number;
	name: string;
	link: string;
};

type Prospect = {
	id: number;
	fullName: string;
	link: string;
};

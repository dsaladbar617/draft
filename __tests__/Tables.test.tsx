import { render, screen } from "@testing-library/react";
import DraftTable from "@/components/DraftTable";
import CareerStatTable from "@/components/CareerStatTable";
import DetailedStatTable from "@/components/DetailedStatTable";
import { mockDraft } from "@/__mocks__/mockDraft";
import { mockPlayer, mockGoalie } from "@/__mocks__/mockPlayer";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    isFallback: false,
  }),
}));

describe("DraftTable", () => {
  it("should render a table", () => {
    const drafts = mockDraft as Drafts;

    render(<DraftTable data={drafts} selectedTeam={null} />);
    const tableRows = screen.getAllByRole("row");

    expect(tableRows).toHaveLength(219);
  });

  it("should render a table with a selected team", () => {
    const drafts = mockDraft as Drafts;

    render(<DraftTable data={drafts} selectedTeam={"1"} />);
    const tableRows = screen.getAllByRole("row");

    expect(tableRows).toHaveLength(13);
  });

  it("should render a table with a selected team of 0", () => {
    const drafts = mockDraft as Drafts;

    render(<DraftTable data={drafts} selectedTeam={"0"} />);
    const tableRows = screen.getAllByRole("row");

    expect(tableRows).toHaveLength(219);
  });
});

describe("CareerStatTable", () => {
  it("should render the careerStatTable with correct data for players", () => {
    const player = mockPlayer as NHLPlayer;

    render(<CareerStatTable player={player} />);

    const tableRows = screen.getAllByRole("row");

    const tableCells = screen.getAllByRole("cell");

    expect(tableRows).toHaveLength(3);

    expect(tableCells[1]).toHaveTextContent('1714');
  });

  it("should render the careerStatTable with correct data for goalies", () => {
    const goalie = mockGoalie as NHLPlayer;

    render(<CareerStatTable player={goalie} />);

    const tableRows = screen.getAllByRole("row");

    const tableCells = screen.getAllByRole("cell");

    expect(tableRows).toHaveLength(3);

    expect(tableCells[2]).toHaveTextContent('683');
  });
});

describe("DetailedStatTable", () => {



  it("should render the detailedStatTable with correct data for players", () => {
    const player = mockPlayer as NHLPlayer;
    render(<DetailedStatTable player={player} />);

    const tableRows = screen.getAllByRole("row");

    const tableCells = screen.getAllByRole("cell");

    expect(tableRows).toHaveLength(27);

    expect(tableCells[2]).toHaveTextContent('55');

  })

  it("should render the careerStatTable with correct data for goalies", () => {
    const goalie = mockGoalie as NHLPlayer;

    render(<DetailedStatTable player={goalie} />);

    const tableRows = screen.getAllByRole("row");

    const tableCells = screen.getAllByRole("cell");

    expect(tableRows).toHaveLength(16);

    expect(tableCells[2]).toHaveTextContent('11');
  });

});


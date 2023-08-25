import { render, screen } from "@testing-library/react";
import DraftTable from "@/components/DraftTable";
import { mockDraft } from "@/__mocks__/mockDraft";

jest.mock('next/navigation', () => ({
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

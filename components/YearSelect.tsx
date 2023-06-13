import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  currentYear: number;
  setDraftYear: Dispatch<SetStateAction<string>>;
};

const YearSelect = ({ currentYear, setDraftYear }: Props) => {
  const draftDates = [];

  for (let i = currentYear; i > 1962; i--) {
    draftDates.push(i.toString());
  }

  return (
    <Select
      onValueChange={(e) => {
        if (e) setDraftYear(e);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Pick a Draft Year..." />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className=" h-64">
          {draftDates.map((elem) => (
            <SelectItem className="hover:bg-slate-500" key={elem} value={elem}>
              {elem}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};

export default YearSelect;

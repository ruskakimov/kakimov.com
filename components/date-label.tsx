import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateLabel = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="text-sm text-gray-400">
      {format(date, "LLLL	d, yyyy")}
    </time>
  );
};

export default DateLabel;

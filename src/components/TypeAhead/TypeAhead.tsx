import { useThrottle } from "@/helpers/use-throttle";
import { useState, type ChangeEvent } from "react";

const THROTTLE_TIME = 500;

type TypeAheadProps = {
  initialQuery?: string;
  onQueryChange: (query: string) => void;
};

export default function TypeAhead({
  initialQuery,
  onQueryChange,
}: TypeAheadProps) {
  const [value, setValue] = useState(initialQuery);

  const throttledOnChange = useThrottle(onQueryChange, THROTTLE_TIME);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    throttledOnChange(value);
  };

  return <input value={value} onChange={onChange} />;
}

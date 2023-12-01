import { useThrottle } from "@/helpers/useThrottle";
import styles from "./Pagination.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, type ChangeEvent, useEffect } from "react";

const THROTTLE_TIME = 500;

type TypeaheadProps = {
  initialQuery: string;
  onQueryChange: (query: string) => void;
};

export default function Typeahead({
  initialQuery,
  onQueryChange,
}: TypeaheadProps) {
  const [value, setValue] = useState(initialQuery);

  const throttledOnChange = useThrottle(onQueryChange, THROTTLE_TIME);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    throttledOnChange(value);
  };

  return <input value={value} onChange={onChange} />;
}

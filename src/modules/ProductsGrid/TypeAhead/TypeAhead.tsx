import { useThrottle } from "@/helpers/use-throttle";
import type { FormEvent } from "react";

const THROTTLE_TIME = 500;
const SEARCH_FIELD_NAME = "query";

const getQueryValue = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  return (formData.get(SEARCH_FIELD_NAME) as string) || "";
};

type TypeAheadProps = {
  initialQuery?: string;
  onQueryChange: (query: string) => void;
};

export const TypeAhead = ({ initialQuery, onQueryChange }: TypeAheadProps) => {
  const throttledOnChange = useThrottle(onQueryChange, THROTTLE_TIME);

  const onChange = (event: FormEvent<HTMLFormElement>) => {
    throttledOnChange(getQueryValue(event.currentTarget));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onQueryChange(getQueryValue(event.currentTarget));
  };

  return (
    <form onChange={onChange} onSubmit={onSubmit}>
      <label>
        Search
        <input
          defaultValue={initialQuery}
          name={SEARCH_FIELD_NAME}
          type="search"
        />
      </label>
    </form>
  );
};

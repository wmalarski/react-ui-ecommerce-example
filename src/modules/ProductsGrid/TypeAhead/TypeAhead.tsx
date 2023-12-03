import { paths } from "@/helpers/paths";
import { useThrottle } from "@/helpers/use-throttle";
import { useRouter } from "next/router";
import type { FormEvent } from "react";

const THROTTLE_TIME = 500;
const SEARCH_FIELD_NAME = "query";

const getQueryValue = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  return (formData.get(SEARCH_FIELD_NAME) as string) || "";
};

type TypeAheadProps = {
  defaultValue?: string;
};

export function TypeAhead({ defaultValue }: TypeAheadProps) {
  const router = useRouter();

  const onQueryChange = (query: string) => {
    if (router.query.query === query) {
      return;
    }

    router.replace(paths.home(query.length > 0 ? { query } : {}));
  };

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
          defaultValue={defaultValue}
          name={SEARCH_FIELD_NAME}
          type="search"
        />
      </label>
    </form>
  );
}

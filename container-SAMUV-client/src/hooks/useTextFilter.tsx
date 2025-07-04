import { useState, useMemo, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

import { useStatus } from "../components/contexts/StatusContext";

export default function useTextFilter<T>(
  items = new Array<T>(),
  debounceMs = 700
): [T[], (e: React.ChangeEvent<HTMLInputElement>) => void, string, () => void] {
  const [filterText, setFilterText] = useState("");
  const [debouncedFilterText, setDebouncedFilterText] = useState<string>("");
  const { setLoading } = useStatus();

  const debouncedSetFilter = useCallback(
    debounce((value: string) => setDebouncedFilterText(value), debounceMs),
    [debounceMs]
  );

  const handleFilterChange = useCallback(
    (event: any) => {
      setLoading(true);
      const value = event.target.value;
      setFilterText(value);
      debouncedSetFilter(value);
    },
    [debouncedSetFilter, setLoading]
  );

  useEffect(() => {
    setLoading(false);
  }, [debouncedFilterText, setLoading]);

  const filteredItems = useMemo((): Array<T> => {
    return items.filter((item) =>
      JSON.stringify(item)
        .toLowerCase()
        .includes(debouncedFilterText.toLowerCase())
    );
  }, [items, debouncedFilterText]);

  const clearFilter = useCallback(() => {
    setFilterText("");
  }, []);

  return [filteredItems, handleFilterChange, filterText, clearFilter] as const;
}

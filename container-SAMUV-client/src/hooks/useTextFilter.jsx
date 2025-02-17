import { useState, useMemo, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

import { useStatus } from "../components/contexts/StatusContext";

export default function useTextFilter(items = [], debounceMs = 700) {
  const [filterText, setFilterText] = useState("");
  const [debouncedFilterText, setDebouncedFilterText] = useState("");
  const { setLoading } = useStatus();

  const debouncedSetFilter = useCallback(
    debounce((value) => setDebouncedFilterText(value), debounceMs),
    [debounceMs]
  );

  const handleFilterChange = useCallback(
    (event) => {
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

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      JSON.stringify(item)
        .toLowerCase()
        .includes(debouncedFilterText.toLowerCase())
    );
  }, [items, debouncedFilterText]);

  const clearFilter = useCallback(() => {
    setFilterText("");
  }, []);

  return [filteredItems, handleFilterChange, filterText, clearFilter];
}

import React, { useState, useRef } from "react";
import { Search, CircleX } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { useSearchParams } from "react-router-dom";

interface ISearchInputProps {
  placeholder?: string;
  onSubmit?: (query: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}
export default function SearchInput({
  placeholder,
  onSubmit,
  onChange,
  onClear,
}: ISearchInputProps) {
  const [searchParams] = useSearchParams();
  const baseQuery = searchParams.get("query");
  const [query, setQuery] = useState(baseQuery || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(query);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const getButton = () => {
    if (onSubmit) {
      return (
        <Button
          className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/6"
          variant={"secondary"}
          size={"sm"}
          type="submit"
        >
          <Search></Search>
        </Button>
      );
    }

    if (onChange && onClear && query) {
      return (
        <Button
          className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/6"
          variant={"destructive"}
          size={"sm"}
          type="submit"
          onClick={onClear}
        >
          <CircleX></CircleX>
        </Button>
      );
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="min-w-0!">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600 color-inherit opacity-50" />
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-11 pt-5 pb-5"
        />
        {getButton()}
      </form>
    </div>
  );
}

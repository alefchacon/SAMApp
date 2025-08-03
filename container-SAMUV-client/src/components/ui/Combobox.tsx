import React, { useState } from "react";
import { Button } from "./button";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  ChevronRight,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Specie } from "@/features/specie/domain/Specie";

interface IComboboxProps {
  options: Specie[];
  onChange: (newSpecie: Specie) => void;
}

export function Combobox({ options = [], onChange }: IComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  const handleChange = (selectedOption: Specie) => {
    onChange(selectedOption);
    toggleIsOpen();
  };

  return (
    <>
      <DropdownMenu open={isOpen}>
        <DropdownMenuTrigger onClick={toggleIsOpen}>
          <Button variant={"outline"} size={"sm"}>
            <Search /> Seleccionar especie...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border shadow-md">
          <Command className="rounded-lg md:min-w-[450px] p-2">
            <CommandInput placeholder={`"Desmodus rotundus"`} className="p-2" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>

              {options.map((option, index) => (
                <CommandItem
                  className="p-0"
                  key={index}
                  onClick={() => alert(option.id)}
                >
                  <span
                    className="flex flex-row gap-2 w-full p-2"
                    onClick={() => handleChange(option)}
                  >
                    {option.epithet}
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

import React, { useRef, useEffect, useState } from "react";

import getContributors from "../businessLogic/getContributors";
import StaticCell from "@/components/ui/table/StaticCell";
import Contributor, { defaultContributor } from "../domain/Contributor";
import { Column, Row, Table } from "@tanstack/react-table";
import Specimen from "@/features/specimens/domain/model/Specimen";
// DEV ONLY: see if we can refactor to have a single prop interface for all editable columns
interface IEditableSelectCellProps {
  path: string;
  initialValue: any;
  row: Row<any>;
  column: Column<Specimen, any>;
  table: Table<Specimen>;
  onUpdate: (values: any) => void;
  databaseTableId?: number;
  // validationSchema,
}
export default function EditableContributorCell({
  path,
  initialValue,
  row,
  column,
  table,
  onUpdate,
}: IEditableSelectCellProps) {
  const [editing, setEditing] = useState(false);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const canDisableEditing =
      divRef.current &&
      event.target instanceof Node &&
      !divRef.current.contains(event.target);

    if (canDisableEditing) {
      setEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (values: any) => {
    try {
      table?.options.meta?.updateData(row.index, path, values[column.id]);
      onUpdate(values[column.id]);
    } catch (error) {
      //
    } finally {
      setEditing(false);
    }
  };

  let selected: Contributor = defaultContributor;
  if (contributors.length > 0) {
    const matchingContributor = contributors.find(
      (contributor) => contributor.id === initialValue.contributor_id
    );
    selected = matchingContributor ? matchingContributor : defaultContributor;
  }

  const handleContributorChange = (newContributor: Contributor) => {
    const originalContributorSpecimen = row.original[column.id];

    let newContributorSpecimen = {
      id: originalContributorSpecimen.id,
      contributor_id: newContributor.id,
      contributor_role_id: originalContributorSpecimen.contributor_role_id,
      name: newContributor.name,
      code: newContributor.code,
    };
    handleSubmit({ [column.id]: newContributorSpecimen });
  };

  const findSelectedContributor = (contributorId: string) => {
    const contributorIdNumber = Number(contributorId);
    return contributors.find(
      (contributor: Contributor) => contributor.id == contributorIdNumber
    );
  };

  if (editing) {
    return (
      <div ref={divRef} className="flex-row align-items-center w-100">
        <select
          value={initialValue.contributor_id}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedContributor = findSelectedContributor(
              event.target.value
            );
            handleContributorChange(selectedContributor ?? defaultContributor);
          }}
        >
          {contributors.map((contributor, index) => (
            <option value={contributor.id} key={index}>
              {contributor.code}
            </option>
          ))}
        </select>
      </div>
    );
  }

  const enableEditing = () => {
    getContributors().then((response) => {
      setContributors(response);
      setEditing(true);
    });
  };

  return (
    <StaticCell onDoubleClick={enableEditing}>{initialValue?.code}</StaticCell>
  );
}

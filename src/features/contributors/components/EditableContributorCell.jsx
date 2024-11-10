import { useRef, useEffect, useState } from "react";

import getContributors from "../businessLogic/getContributors";
import StaticCell from "../../../components/ui/table/StaticCell,";
import CONTRIBUTOR_ROLE_NAMES from "../../../stores/contributorRoleNames";
export default function EditableContributorCell({
  path,
  initialValue,
  row,
  column,
  table,
  onUpdate,
}) {
  const [editing, setEditing] = useState(false);
  const [contributors, setContributors] = useState(false);
  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (values) => {
    try {
      table?.options.meta?.updateData(row.index, path, values[column.id]);
      onUpdate(values[column.id]);
    } catch (error) {
      //
    } finally {
      setEditing(false);
    }
  };

  let selected = "";
  if (contributors.length > 0) {
    selected = contributors.find(
      (contributor) => contributor.id === initialValue.contributor_id
    );
  }

  const handleContributorChange = (newContributor) => {
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

  const findSelectedContributor = (contributorId) => {
    return contributors.find((contributor) => contributor.id == contributorId);
  };

  if (editing) {
    return (
      <div
        ref={divRef}
        className="flex-row align-items-center w-100"
        autoComplete="off"
      >
        <select
          value={initialValue.contributor_id}
          type="select"
          onChange={(e) => {
            const selectedContributor = findSelectedContributor(e.target.value);
            handleContributorChange(selectedContributor);
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

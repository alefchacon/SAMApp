import { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import ROUTES from "../../stores/routes";
import { Field } from "formik";
import TextField from "./TextField";

export default function SearchField({
  label = "label",
  helperText = " ",
  required = true,
  errorMessage = "",
  name = ``,
  id = `${name}`,
  hasError = false,
  value = ``,
  options = ["option 1", "option 2", "option 3"],
  className = "",
}) {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    searchParams.set("q", searchQuery);
    setSearchParams(searchParams);
  };

  return (
    <TextField
      className={className}
      placeholder={"Buscar especies"}
      iconType={"search"}
      onEnter={handleSearch}
      value={searchQuery}
      onChange={handleSearchQueryChange}
      onKeydown={handleSearch}
    ></TextField>
  );
}

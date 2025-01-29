import { useState, useRef } from "react";
import ButtonIcon from "./ButtonIcon";
import Button from "./Button";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ROUTES from "../../routing/frontendRoutes";
export default function Searchbar(){
    const [focused, setFocused] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] =  useState(searchParams.get("q") || "");
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (location.pathname.includes(ROUTES.SEARCH)){
            setSearchParams({ q: query });
        } else {
            navigate(`${ROUTES.SEARCH}?q=${query}`)
        }
    };

    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);
  
    const handleChange = (event) => {
        setQuery(event.target.value);
    };



    return (
        <form className="flex-col justify-content-center gap-1rem shadow-all"  onSubmit={handleSubmit}>
            <div className={`searchbar-wrapper rounded-5 bg-white flex-row gap-1rem align-items-center ${focused ? "focused" : ""}`}>
                <input 
                    className="h-100 w-100 bg-transparent unstyled" 
                    value={query} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Buscar especies por nombre, género, familia u órden"
                >
                    
                </input>
                <ButtonIcon type={"submit"} iconType={"search"}></ButtonIcon>
            </div>
        </form>
    )
}
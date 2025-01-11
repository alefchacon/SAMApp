import { useState, useRef } from "react";
import ButtonIcon from "./ButtonIcon";
import Button from "./Button";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ROUTES from "../../stores/routes";
export default function Searchbar(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] =  useState(searchParams.get("q") || "");
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log(location.pathname.includes(ROUTES.SEARCH))
        if (location.pathname.includes(ROUTES.SEARCH)){
            setSearchParams({ q: query });
        } else {
            console.log('Form submitted with value:', query);
            navigate(`${ROUTES.SEARCH}?q=${query}`)
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <form className="flex-col justify-content-center gap-1rem shadow-all"  onSubmit={handleSubmit}>
            <div className="rounded-5 bg-white flex-row gap-1rem align-items-center">
                <input 
                    className="h-100 w-100 bg-transparent unstyled" 
                    value={query} 
                    onChange={handleChange}
                    placeholder="Buscar especies por nombre, género, familia u órden"
                >
                    
                </input>
                <ButtonIcon type={"submit"} iconType={"search"}></ButtonIcon>
            </div>
        </form>
    )
}
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {geoUrl, geoApiOptions} from '../../api';


const Search=({onSearchChange})=>{
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) =>{
       /* try {
            const response = fetch(
                `${geoUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions
            );
            const response_1 = response.json();
            return {
                options: response_1.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        } catch (err) {
            return console.log(err);
        } */

        try {
            const response = await fetch(
                `${geoUrl}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions
            );
            const response_1 = await response.json();
            return {
                options: response_1.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        } catch (err) {
            return console.log(err);
        }
    };

    const handleOnChange = (searchData) =>{
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return (
        <AsyncPaginate
            placeholder="Search for City"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;
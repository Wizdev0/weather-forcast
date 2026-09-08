import { useState, useRef } from 'react';
import './SubHeader.css';
import LoadingIcon from '../assets/images/icon-loading.svg';


export function SubHeader({ onSelectLocation, onNoResult }) {
    const [isSearch, setIsSearch] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [find, setFind] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [warning, setWarning] = useState('');
    const timerRef = useRef(null);

    const hanldeSearch = (e) => {


        const value = e.target.value;

        setFind(value);
        setIsLoading(true);
        setIsSearch(true);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            async function search() {
                const cityUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=5`
                const response = await fetch(cityUrl);
                const cityName = await response.json();

                setResults(cityName.results || []);
                setActiveIndex(0);
                setIsLoading(false);
            }

            search();
        }, 500);


    };

    

    const handlePick = (city) => {
        setFind(`${city.name}, ${city.country}`);
        setIsSearch(false);
        setSelectedCity(city);

    }

    function handleSearchClick() {
        if (selectedCity) {
            onNoResult(false);
            onSelectLocation({
                name: selectedCity.name,
                latitude: selectedCity.latitude,
                longitude: selectedCity.longitude,
                country: selectedCity.country
            });
            setWarning('');
        } else if(results.length === 0) {
            onNoResult(true);
        } else {
            setWarning('Please pick a city from the list first');
        }

    }


    return (
        <>
            <div className="sub-header">
                <h1 className="head-h1">How's the Sky looking today?</h1>
                <div className="search-bar">
                    <div className='input-div'>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for a place..."
                            onFocus={() => {
                                setIsSearch(false);
                                setWarning('');
                            }}
                            onChange={hanldeSearch}
                            value={find}

                        />

                        {warning && <p className='warning-para'>{warning}</p>}


                        {isLoading ? (
                            <div className="loading">
                                <img src={LoadingIcon} alt="loading Icon" className="loading-img" />
                                <p className="loading-p">Search in progress</p>
                            </div>
                        ) : (

                            isSearch && (
                                <ul className='search-menu'>
                                    {results.map((city) => (
                                        <li
                                            key={`${city.name}-${city.latitude}-${city.longitude}`}
                                            className={city === results[activeIndex] ? 'search-item active' : 'search-item'}
                                            onClick={() => {
                                                handlePick(city);
                                            }}
                                        >
                                            {[city.name, city.admin2, city.admin1, city.country].filter(Boolean).join(", ")}
                                        </li>
                                    ))}
                                </ul>
                            )

                        )

                        }

                    </div>



                    <button className="search-btn"
                        onClick={handleSearchClick}
                    >Search</button>
                </div>
            </div>

        </>
    );
}
import { Header } from "../Components/Header";
import { MainPage } from "../Components/MainPage";
import { SubHeader } from "../Components/SubHeader";
import { useEffect, useState } from "react";
import ErrorIcon from '../assets/images/icon-error.svg';
import RetryIcon from '../assets/images/icon-retry.svg';
import './HomePage.css';
import { buildDailyList, buildHourlyList } from "./weatherUtils";

export function Homepage() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [location, setLocation] = useState({
        name: "Berlin",
        latitude: 52.52,
        longitude: 13.405,
        country: "Germany"
    });

    const [units, setUnits] = useState({
        temperature: "celsius",
        windSpeed: "kmh",
        precipitation: "mm"
    });


    const [weather, setWeather] = useState(null);
    const [hourlyList, setHourlyList] = useState([]);
    const [dailyList, setDailyList] = useState([]);


    useEffect(() => {
        async function getWeather() {
            setIsLoading(true);
            setHasError(false);

            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${units.temperature}&windspeed_unit=${units.windSpeed}&precipitation_unit=${units.precipitation}`);
                const data = await response.json();
                setWeather(data);
                const hourlyData = buildHourlyList(data.hourly);
                setHourlyList(hourlyData);
                const dailyData = buildDailyList(data.daily);
                setDailyList(dailyData);
            } catch {
                setHasError(true);
            }


            setIsLoading(false);
        }

        getWeather();


    }, [location, units, retryCount]);

    function handleRetry() {
        setRetryCount(prev => prev + 1);
    }


    function handleUnitChange(key, value) {
        setUnits(prev => ({ ...prev, [key]: value }));
    }

    if(noResult) {
        return(

            <>
                <Header units={units} onUnitChange={handleUnitChange} />
                <SubHeader onSelectLocation={setLocation} onNoResult={setNoResult} />
                <p className="search-error">No search result found!</p>
            </>
            
            
        );
    }

    if(hasError) {
        return(
            <>
                <Header units={units} onUnitChange={handleUnitChange} />
                <div className="api-error-div">
                    <img src={ErrorIcon} alt="Cancel Image" className="api-error-img" />
                    <h2 className="api-error-h2">Something went wrong</h2>
                    <p className="api-error-message">We couldn't connect to the server(API error). Please try again in a few moments</p>
                    <button 
                        className="retry-btn"
                        onClick={handleRetry}
                    >
                        <img src={RetryIcon} alt="Retry Icon" className="retry-icon" />
                        <span className="retry-wrd">Retry</span>
                    </button>
                </div>
            </>
        );
    }


    return (
        <>
            <Header units={units} onUnitChange={handleUnitChange} />
            <SubHeader onSelectLocation={setLocation} onNoResult={setNoResult} />
            <MainPage weather={weather} hourlyList={hourlyList} location={location} units={units} dailyList={dailyList} isLoading={isLoading} hasError={hasError} />
        </>
    );
}
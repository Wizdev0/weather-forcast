import './MainPage.css';
import { useState } from 'react';
import DropIcon from '../assets/images/icon-dropdown.svg'
import CloudIcon from '../assets/images/icon-overcast.webp'
import RainIcon from '../assets/images/icon-rain.webp';
import PartlyCloudIcon from '../assets/images/icon-partly-cloudy.webp';
import SunnyIcon from '../assets/images/icon-sunny.webp';
import FogIcon from '../assets/images/icon-fog.webp';
import DrizzleIcon from '../assets/images/icon-drizzle.webp';
import StormIcon from '../assets/images/icon-storm.webp';
import SnowIcon from '../assets/images/icon-snow.webp';
import LoadingIcon from '../assets/images/icon-loading.svg'


export function MainPage({ weather, location, units, hourlyList, dailyList, isLoading, hasError }) {

    const [isDrop, setIsDrop] = useState(false);
    const [selected, setSelected] = useState("Monday");


    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    const weatherIcons = {
        0: SunnyIcon,
        1: PartlyCloudIcon,
        2: PartlyCloudIcon,
        3: CloudIcon,
        61: RainIcon,
        63: RainIcon,
        65: RainIcon,
        45: FogIcon,
        48: FogIcon,
        51: DrizzleIcon,
        53: DrizzleIcon,
        55: DrizzleIcon,
        71: SnowIcon,
        73: SnowIcon,
        75: SnowIcon,
        95: StormIcon,
        96: StormIcon,
        99: StormIcon
    }

    const handleSelect = (day) => {
        setSelected(day);
        setIsDrop(false);
    }




    const filteredHours = hourlyList.filter(hour => hour.date === selected);


    if (isLoading) {
        return (
            <div className="main-page">
                <div className="real-time-view-loading">
                    <div className="real-time-info-loading">
                        <div className="place-and-date">
                            <img src={LoadingIcon} alt="Loading Icon" className="loading-img-load" />
                            <p className="loading-p-load">Loading....</p>
                        </div>
                    </div>


                </div>

                <div className="hourly-forcast-div">
                    <div className="hourly-forcast-div-head">
                        <h3 className="hourly-fcast-h3">Hourly forcast</h3>
                        <button className="weeks-dropdown-loading" onClick={() => setIsDrop(!isDrop)}>
                            <span className='hourly-forcast-dropdown-options'></span>
                            <span><img src={DropIcon} alt="Dropdown Icon" /></span>
                        </button>
                    </div>

                    <div className="hourly-forcast-div-body-loading">
                        {Array.from({ length: 24 }).map((_, index) => (
                            <div key={index} className="hourly-forcast-time-date-image"></div>
                        ))}
                    </div>
                </div>

                {/* Weather Properties */}
                <div className="weather-properties">
                    <div className="boxes-for-weather">

                        <div className="weather-properties-box">
                            <p className="prop-writeup">
                                Feels Like
                            </p>
                            <p className="prop-fig-loading"></p>
                        </div>
                        <div className="weather-properties-box">
                            <p className="prop-writeup">
                                Humidity
                            </p>
                            <p className="prop-fig-loading"></p>
                        </div>
                        <div className="weather-properties-box">
                            <p className="prop-writeup">
                                Wind
                            </p>
                            <p className="prop-fig-loading"></p>
                        </div>
                        <div className="weather-properties-box">
                            <p className="prop-writeup">
                                Precipitation
                            </p>
                            <p className="prop-fig-loading"></p>
                        </div>
                    </div>

                </div>

                {/* DAILY FORCAST */}
                <div className="daily-forcast-div">

                    <div className="daily-forcast-box-and-header">

                        <h2 className="daily-forcast-header">
                            Daily Forcast
                        </h2>

                        <div className="daily-forcast-boxes">

                            {Array.from({ length: 7}).map((_, index) => (
                                <div className="daily-forecast-box" key={index}></div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        );
    }


    return (
        <>
            <div className="main-page">
                {/* Real time view wallpaper */}
                <div className="real-time-view">
                    {/* Real time view information */}
                    <div className="real-time-info">
                        <div className="place-and-date">
                            <h2 className="city-country">
                                {location?.name}, {location?.country}
                            </h2>
                            <p className="date">
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className="temp-and-temp-img">
                            <img src={weatherIcons[weather?.current?.weather_code] || PartlyCloudIcon} alt="Picture of the weather" className="temp-img" />
                            <h2 className="temp">{weather?.current?.temperature_2m}°</h2>
                        </div>
                    </div>

                </div>


                {/* Hourly Forcast */}
                <div className="hourly-forcast-div">
                    <div className="hourly-forcast-div-head">
                        <h3 className="hourly-fcast-h3">
                            Hourly forcast
                        </h3>
                        <button className="weeks-dropdown" onClick={() => setIsDrop(!isDrop)}>
                            <span>{selected}</span>
                            <span><img src={DropIcon} alt="Dropdown Icon" /></span>
                        </button>

                        {
                            isDrop && (
                                <ul className="days-of-the-week">
                                    {days.map((day) => (
                                        <li
                                            key={day}
                                            onClick={() => handleSelect(day)}
                                        >
                                            {day}
                                        </li>
                                    ))}
                                </ul>
                            )
                        }


                    </div>

                    <div className="hourly-forcast-div-body">
                        {filteredHours.map((time) => (
                            <div
                                key={time.id}
                                className="hourly-forcast-time-date-image"
                            >
                                <div className="time-and-image">
                                    <img
                                        src={weatherIcons[time.code] || PartlyCloudIcon}
                                        alt="weather condition"
                                        className="weather-images"
                                    />

                                    <p className="time-frame">
                                        {time.time}
                                    </p>
                                </div>

                                <p className="degree-intervals">
                                    {time.degree}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Weather Properties */}
                <div className="weather-properties">
                    <div className="boxes-for-weather">

                        <div className="weather-properties-box">
                            <p className="prop-writeup">
                                Feels Like
                            </p>
                            <p className="prop-fig">
                                {weather?.current?.apparent_temperature}°
                            </p>
                        </div>
                        <div className="weather-properties-box">
                            <p className="prop-writeup">
                                Humidity
                            </p>
                            <p className="prop-fig">
                                {weather?.current?.relative_humidity_2m}%
                            </p>
                        </div>
                        <div className="weather-properties-box">
                            <p className="prop-writeup">
                                Wind
                            </p>
                            <p className="prop-fig">
                                {weather?.current?.wind_speed_10m} {units?.windSpeed}
                            </p>
                        </div>
                        <div className="weather-properties-box">
                            <p className="prop-writeup">
                                Precipitation
                            </p>
                            <p className="prop-fig">
                                {weather?.current?.precipitation} {units?.precipitation}
                            </p>
                        </div>
                    </div>

                </div>

                {/* DAILY FORCAST */}
                <div className="daily-forcast-div">

                    <div className="daily-forcast-box-and-header">

                        <h2 className="daily-forcast-header">
                            Daily Forcast
                        </h2>

                        <div className="daily-forcast-boxes">

                            {dailyList.map((day) => (
                                <div className="daily-forecast-box" key={day.id}>
                                    <p className='daily-fcast-days'>{day.day}</p>

                                    <img
                                        src={weatherIcons[day.code] || PartlyCloudIcon}
                                        alt="Weather condition"
                                        className='daily-fcast-image'
                                    />

                                    <div className="daily-temperatures">
                                        <span>{day.high}</span>
                                        <span>{day.low}</span>
                                    </div>
                                </div>
                            ))}



                        </div>
                    </div>

                </div>



            </div>


        </>
    );
}
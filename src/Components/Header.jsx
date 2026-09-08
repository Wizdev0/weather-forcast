import './Header.css';
import { useState } from 'react';
import PageLogo from '../assets/images/logo.svg';
import GearIcon from '../assets/images/icon-units.svg';
import DropIcon from '../assets/images/icon-dropdown.svg'
import CheckMark from '../assets/images/icon-checkmark.svg'

export function Header({ units, onUnitChange }) {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('');

    const menuGroups = [
        {
            header: "Temperature",
            key: "temperature",
            items: [
                { label: "Celcius(°C)", value: "celsius" },
                { label: "Fahrenheit(°F)", value: "fahrenheit" }
            ]
        },
        {
            header: "Wind Speed",
            key:"windSpeed",
            items: [
                
                    {label: "Km/h", value: "kmh"},
                    {label: "mph", value: "mph"}
                
            ]
        },
        {
            header: "Precipitation",
            key: "precipitation",
            items: [
               
                {label: "Millimeters(mm)", value:"mm"},
                {label: "inches(in)", value:"inch"}
               
        

            ]
        }
    ];



    return (
        <>
            <div className='header'>
                <img src={PageLogo} alt="The Page logo" className='page-logo' />
                <div className='dropdown'>
                    <button className="unit-btn" onClick={() => setIsOpen(!isOpen)}>
                        <span><img src={GearIcon} alt="A gear Icon" className="gear-icon-img" /></span>
                        <span>Units</span>
                        <span><img src={DropIcon} alt="" className="drop-icon" /></span>
                    </button>

                    {
                        isOpen && (
                            <ul className="dropdown-menu">
                                {menuGroups.map((group) => (
                                    <div key={group.header} className='item-list'>
                                        <h4 className="dropdown-header">
                                            {group.header}
                                        </h4>

                                        {group.items.map((item) => (
                                            <li
                                                key={item.value}
                                                onClick={() => onUnitChange(group.key, item.value)}
                                            >
                                                {item.label}

                                                {units[group.key] === item.value &&
                                                    <img src={CheckMark} alt="selected" />
                                                }

                                            </li>
                                        ))}
                                    </div>
                                ))}
                            </ul>
                        )
                    }
                </div>
            </div>
        </>
    );
}
import React, { useEffect, useRef, useState } from 'react';
import { FaSearch, FaCloudRain, FaWind, FaTemperatureHigh } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";

const Home = () => {
    const inputRef = useRef();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [emptyFieldError, setEmptyFieldError] = useState(false); // New state for empty field error
    const api_key = "2a99811c6db1cf4500664ef6ac01cfe1";

    const search = async (city) => {
        if (!city) { 
            setEmptyFieldError(true);
            setLoading(false);
            return;
        }
        
        setEmptyFieldError(false);
        try {
            const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
            const res = await fetch(api);
            const data = await res.json();
            setData(data);
            setError(false);
            setLoading(false);
            inputRef.current.value = '';
        } 
        catch (error) {
            console.error("Error while fetching the data from API");
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        search("Delhi");
    }, []);

    return (
        <>
            <div className="row">
                <h1 className='mt-4 px-5 '>Weather Forecast : </h1>
                <div className="col-sm-5 mx-auto">
                    <div className="weather-card p-4">
                        <input type="text" ref={inputRef} placeholder="search" className="form-control w-75 d-inline px-4 mb-3" />
                        <button onClick={() => { search(inputRef.current.value); setLoading(true); }} className="btn btn-light rounded-5 mx-2">
                            <FaSearch />
                        </button>
                        {loading ? (
                            <p className='text-dark'>Loading weather data, please wait...</p>
                        ) : error ? (
                            <p className='text-danger'>City not found, please try again.</p>
                        ) : emptyFieldError ? (
                            <p className='text-danger'>Enter a city name first</p>
                        ) : (
                            <>
                                <p>
                                    <img src={`https://openweathermap.org/img/wn/${data.weather?.[0]?.icon}@2x.png`} alt={data.weather?.[0]?.description} className="weather-icon" />
                                </p>
                                <h3>{data.name}</h3>
                                <p>
                                    <span className="fs-6 mx-2">
                                        <FaTemperatureHigh />
                                    </span>
                                    {data.main?.temp} &#8451;
                                </p>
                                <p>
                                    <span className="fs-5 mx-2">
                                        <TiWeatherPartlySunny />
                                    </span> 
                                    Weather Details: {data.weather?.[0]?.main}
                                </p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p>
                                            <span className="fs-5 mx-2">
                                                <FaCloudRain />
                                            </span> 
                                            Humidity: {data.main?.humidity}%
                                        </p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p>
                                            <span className="fs-5 mx-2">
                                                <FaWind />
                                            </span> 
                                            Wind: {data.wind?.speed} m/s
                                        </p>
                                    </div>
                                </div>
                                <p>
                                    <span className="mx-1">
                                        <img src="https://static.thenounproject.com/png/2136174-200.png" alt="" className="atm-icon" />
                                    </span>
                                    Air pressure: {data.main?.pressure} hPa
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

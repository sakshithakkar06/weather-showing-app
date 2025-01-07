import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_icon from '../images/search.png'
import clear_icon from '../images/clear.png'
import cloud_icon from '../images/cloud.png'
import drizzle_icon from '../images/drizzle.png'
import humidity_icon from '../images/humidity.png'
import rain_icon from '../images/rain.png'
import snow_icon from '../images/snow.png'
import wind_icon from '../images/wind.png'
const Weather = () => {

    const inputRef = useRef()
    const[weatherdata, setWeatherdata]= useState(false);

    const allIcons = {
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "010d":rain_icon,
        "010n":rain_icon,
        "013d":snow_icon,
        "013n":snow_icon,

    }
    const search= async(city)=>{

        if(city === ""){
            alert("Enter A Location In The Search Bar");
            return;
        }
        try {
           const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
           
           const response = await fetch(url);
           const data = await response.json();

           if(!response.ok){
            alert(data.message);
            return;
           }
           console.log(data);
           const icon = allIcons[data.weather[0].icon] || clear_icon;
           setWeatherdata({
            humidity:data.main.humidity,
            windSpeed:data.wind.speed,
            temperature:Math.floor(data.main.temp),
            location:data.name,
            icon: icon
           })
        } catch (error) {
            setWeatherdata(false);
            console.error("error in fetching weather data");
        }
    }

useEffect(()=>{
    search("London");
},[])

  return (
    <div className='weather'>
    <div className="searchbar">
        <input ref={inputRef} type="text" name="search" id="search" placeholder='search' />
        <img src={search_icon} alt="searchbar" onClick={()=>search(inputRef.current.value)} />
    </div>
    {weatherdata?<>
        <img src={weatherdata.icon} alt="clear" className='weathericon'/>
    <p className='temperature'>{weatherdata.temperature}°c</p>
    <p className='location'>{weatherdata.location}</p>
    <div className="weatherdata">
        <div className="col">
            <img src={humidity_icon} alt="humidity" />
            <p> {weatherdata.humidity} % </p><br />
            <span>Humidity</span>
        </div>
        <div className="col">
            <img src={wind_icon} alt="wind" />
            <p> {weatherdata.windSpeed} Km/h </p><br />
            <span>Wind Speed</span>
        </div>
    </div>
    </>:<></>}
    
    </div>
  )
}

export default Weather

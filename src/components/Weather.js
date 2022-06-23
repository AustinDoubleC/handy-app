import React from "react"
import {Link} from "react-router-dom"
const Weather =({weather, tomorrow, twoDays})=>{
  
    
    
    return (
        
        <div className="weather">
          <h2>Weather forecast</h2>
        <div className='weather-today'>
          <img src={weather.iconUrl} alt="weather icon"/>
          <div className="weather-main">
            <div className="today-info">
              <h3>{weather.city}</h3>
              <h3>{weather.date}</h3>  
            </div>
            <h2>{weather.temp}º</h2>
            <div className="today-minmax">
              <p>Low {weather.min}º</p>
              <p>High {weather.max}º</p>
            </div>
          </div>
        </div>
        <div className="weather-tomorrow">
          <h3>{tomorrow.date}</h3>
          <img src={tomorrow.iconUrl} alt="weather icon"/>
          <h3>low {tomorrow.min}º</h3>
          <h3>high {tomorrow.max}º</h3>
        </div>
        <div className="weather-twoDays">
          <h3>{twoDays.date}</h3>
          <img src={twoDays.iconUrl} alt="weather icon"/>
          <h3>low {twoDays.min}º</h3>
          <h3>high {twoDays.max}º</h3>
        </div>
        <Link to="/handy-app" id="link-forecast"><p >return to Home</p></Link>
    </div>

    )
}

export default Weather